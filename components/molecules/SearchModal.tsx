import { css, cx } from '@emotion/css';
import React, { useEffect, useRef, useState } from 'react';
import globalCss, { rem } from '../../styles/global-css';
import { IconSearch, IconSpinner } from '../atoms/Icons';
import Modal from '../atoms/Modal';
import { icons, iconsCtx } from '../../lib/utils/icons';
import Image from 'next/image';
import { gtagOutboundEvent } from '../../lib/utils/googleAnalytics';
import useDebounce from '../../customHooks/useDebounce';
import ListItem from '../atoms/ListItem';

interface SearchModalProps {
  isOpen?: boolean;
  openHandler?: () => void;
  children?: React.ReactElement;
  valueState?: [string, React.Dispatch<React.SetStateAction<string>>];
  inputEl?: React.MutableRefObject<HTMLInputElement>
}

interface SearchSource {
  _source: {
    dataType?: string;
    publishDate?: number;
    company?: string;
    id?: string;
    viewCount?: number;
    title?: string;
  }
}

const SearchModal = ({
  isOpen = false,
  openHandler,
  children,
  valueState,
  inputEl
}: SearchModalProps): React.ReactElement => {
  const [posts, setPosts] = useState<SearchSource[]>(undefined);
  const [inputValue, setInputValue] = valueState;
  const [isLoading, setLoading] = useState(false);
  const debounceValue = useDebounce(inputValue, 500);
  const resultsList = useRef<HTMLUListElement>();
  const [movePosition, setMovePosition] = useState('');
  const [indexValue, setIndexValue] = useState<number>(0);
  const [maxIndexValue, setMaxIndexValue] = useState<number>(undefined);
  const [errorMessage, setErrorMessage] = useState('');

  const searchHandling = async () => {
    try {
      if (!inputValue.trim()) {
        setPosts(undefined);
        return;
      }
      setLoading(true);
      const fetchData = await fetch(`/api/search?query=${inputValue}`);
      const result = await fetchData.json();
      setPosts([...result]);
      setMaxIndexValue(result.length);
      setIndexValue(0);
    } catch (event) {
      setErrorMessage('DB로 부터 데이터를 가져오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }

  };

  const keyDownHandling = (event: KeyboardEvent) => {
    //TODO bug: when input value is Korean function run twice. setTimeout makes it okay but I donw know why 🤷‍♂️
    if (event.code === 'Space' && event.ctrlKey) {
      setTimeout(() => {
        openHandler();
      }, 0);
    }
    if (event.code === 'Tab' && isOpen) {
      event.preventDefault();
    }
    if (event.code === 'ArrowUp' && isOpen) {
      event.preventDefault();
      setMovePosition(event.code);
      setTimeout(() => {
        let nextValue = indexValue - 1;
        if (nextValue < 0) {
          nextValue = maxIndexValue - 1;
        }
        setIndexValue(nextValue);
      }, 0);
    }
    if (event.code === 'ArrowDown' && isOpen) {
      event.preventDefault();
      setMovePosition(event.code);
      setTimeout(() => {
        let nextValue = indexValue + 1;
        if (nextValue === maxIndexValue) {
          nextValue = 0;
        }
        setIndexValue(nextValue);
      }, 0);
    }
    if (event.code === 'Enter' && isOpen) {
      event.preventDefault();
      setTimeout(() => {
        if (!posts) {
          return;
        }
        if (!posts.length) {
          window.open(`https://www.google.com/search?q=${inputValue}`, '_blank');
          return;
        }
        const { id, title } = posts[indexValue]._source;
        gtagOutboundEvent(id, title);
        window.open(id, '_blank');
      }, 0);
    }
    if (event.code === 'Escape' && isOpen) {
      setTimeout(() => {
        if (inputValue) {
          setInputValue('');
          setPosts(undefined);
          return;
        }
        openHandler();
      }, 0);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandling);

    return () => {
      window.removeEventListener('keydown', keyDownHandling);
    };
  }, [keyDownHandling]);

  useEffect(() => {
    if (!inputValue.trim()) {
      setPosts(undefined);
    }
  }, [inputValue]);

  useEffect(() => {
    searchHandling();
  }, [debounceValue]);

  const focusHandling = () => {
    if (inputEl) {
      inputEl.current.focus();
    }
  }

  useEffect(() => {
    if (isOpen) {
      inputEl.current.focus();
      if (inputValue) {
        inputEl.current.select();
      }
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} openHandler={openHandler} escClose={false}>
      <div className={cssSearchWrapper}>
        <div className={cssInputWrapper(posts)}>
          {isLoading ? <IconSpinner spin className={cssLoadingIcon} /> : <IconSearch />}
          {children}
        </div>
        {!errorMessage && posts && posts.length > 0 && (
          <ul className={cssList} ref={resultsList}>
            {posts.map((post, index) => {
              const { publishDate, company, id, title } = post._source;
              const nowDate = new Date();
              const postDate = new Date(publishDate);
              const todayMonth = (nowDate.getMonth() + 1).toString().length === 1 ? `0${nowDate.getMonth() + 1}` : nowDate.getMonth() + 1;
              const todayDate = nowDate.getDate().toString().length === 1 ? `0${nowDate.getDate()}` : nowDate.getDate();
              const todayString = `${nowDate.getFullYear()}-${todayMonth}-${todayDate}`;
              const today = new Date(todayString);
              const postDateMonth = (postDate.getMonth() + 1).toString().length === 1 ? `0${postDate.getMonth() + 1}` : postDate.getMonth() + 1;
              const postDateDate = postDate.getDate().toString().length === 1 ? `0${postDate.getDate()}` : postDate.getDate();
              const postDateString = `${postDate.getFullYear()}-${postDateMonth}-${postDateDate}`;
              const postDay = new Date(postDateString);
              const dateDiffer = Math.floor((today.getTime() - postDay.getTime()) / 60 / 1000 / 60 / 24);
              const dateDifferString = dateDiffer === 0 ? `오늘` : `${dateDiffer}일 전`;

              return (
                <ListItem className={cx(
                  { [cssListItem]: true },
                  { [cssListItemFocused]: index === indexValue },
                )}
                  isFocused={index === indexValue}
                  onFocus={focusHandling}
                  key={id}
                  movePosition={movePosition}
                >
                  <a
                    href={id}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={title}
                    onClick={() => gtagOutboundEvent(id, title)}
                  >
                    <p className={cssPostTitle}>{title}</p>
                    <ul className={cssItemDetail}>
                      <li className={cssItemDetailLeft}>
                        {icons[company] &&
                          <div className={cssCompanyIcon}>
                            <Image
                              src={`${iconsCtx}${icons[company]}`}
                              alt={company}
                              width='fill'
                              height='fill'
                              layout='responsive'
                            />
                          </div>
                        }
                        {company}
                      </li>
                      {/* <li>
                        <span role="img" aria-label="viewCount">👀</span>{' '}
                        {post.viewCount.N}
                      </li> */}
                      <li>
                        <time dateTime={postDate.toISOString()}>{dateDiffer < 8 ? dateDifferString : postDateString}</time>
                      </li>
                    </ul>
                  </a>
                </ListItem>
              )
            })}
          </ul>
        )}
        {!errorMessage && posts && !posts.length && inputValue &&
          <ul className={cssList} ref={resultsList}>
            <ListItem className={cx(
              { [cssNoResults]: true },
              { [cssListItemFocused]: true },
            )}
              onFocus={focusHandling}
            >
              <a
                href={`https://www.google.com/search?q=${inputValue}`}
                target="_blank"
                rel="noreferrer"
                aria-label="구글로 검색 바로가기"
              >
                <div className={cssNoResults}>검색 결과가 없습니다. 구글로 검색할까요? 👉</div>
              </a>
            </ListItem>
          </ul>
        }
        {errorMessage &&
          <ul className={cssList} ref={resultsList}>
            <ListItem className={cx(
              { [cssNoResults]: true },
              { [cssListItemFocused]: true },
            )}
              onFocus={focusHandling}
            >
              <div className={cssNoResults}>{errorMessage} 😥</div>
            </ListItem>
          </ul>
        }
      </div>
    </Modal>
  );
};

export default SearchModal;

const cssLoadingIcon = css`
  color: ${globalCss.color.secondaryBrandColor};
`;

const cssSearchWrapper = css`
  width: 100%;
  max-width: ${globalCss.common.maxWidth};
  transform: translateY(15vh);
  padding: 0 5rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    padding: 0 1.25rem;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    padding: 0 3rem;
  }
`;

const cssInputWrapper = (posts: SearchSource[]) => css`
  width: 100%;
  display: flex;
  align-items: center;
  border: ${globalCss.color.borderColor} 0.15rem solid;
  border-radius: ${posts ? '0.7rem 0.7rem 0 0' : '0.7rem'};
  padding: 0.7rem;
  background-color: ${globalCss.color.groupColorOpacity};
  font-size: 1.5rem;

  svg{
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
`;

const cssList = css`
  list-style: none;
  overflow-y: overlay;
  max-height: 60vh;
  border: 0.15rem solid ${globalCss.color.borderColor};
  border-top: none;
  border-radius: 0 0 0.7rem 0.7rem;
  background-color: ${globalCss.color.groupColorOpacity};

  a {
    text-decoration: none;
  }
`;
const cssListItem = css`
  padding: 1rem 1rem 1rem 0.5rem;
  border-bottom: ${rem(2)} solid ${globalCss.color.groupColor};

  &:nth-last-child(1) {
    border-bottom: none;
  }
  
  a{
    display: flex;
    flex-direction: column;
    text-decoration: none;
    color: ${globalCss.color.color};

    p:first-child {
      margin-bottom: 0.25rem;
    }

    &:visited {
      color: ${globalCss.color.colorDown};
    }

    &:active {
      color: ${globalCss.color.color};
    }
  }
`;
const cssListItemFocused = css`
  background-color: ${globalCss.color.secondaryBrandColorOpacity};
`;
const cssPostTitle = css`
  font-size: 1rem;
  font-weight: ${globalCss.common.fontNormal};
`;

const cssItemDetail = css`
  font-size: 0.9rem;
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  justify-content: flex-start;
  color: ${globalCss.color.colorDown};

  li {
    margin-right: 0.5rem;

    &:nth-child(1) {
      margin-right: auto;
    }
  
    &:nth-last-child(1) {
      margin-right: 0;
    }
  }
`;

const cssItemDetailLeft = css`
  display: flex;
  align-items: center;
`;
const cssCompanyIcon = css`
  width: 1rem;
  height: 1rem;
  display: inline-block;
  margin-right: 0.25rem;
  margin-top: 0.15rem;
`;

const cssNoResults = css`
  padding: 0.5rem 0.5rem;
  font-size: 1rem;
`;