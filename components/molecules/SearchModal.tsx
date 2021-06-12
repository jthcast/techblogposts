import { css, cx } from '@emotion/css';
import React, { useEffect, useRef, useState } from 'react';
import globalCss, { rem } from '../../styles/global-css';
import Icon from '../atoms/Icon';
import Modal from '../atoms/Modal';
import { icons, iconsCtx } from '../../lib/utils/icons';
import Image from 'next/image';
import { gtagOutboundEvent } from '../../lib/utils/googleAnalytics';
import useDebounce from '../../customHooks/useDebounce';
import SearchListItem from '../atoms/SearchListItem';
import { useRouter } from 'next/router'
import Bookmark from '../atoms/Bookmark';

interface SearchModalProps {
  isOpen?: boolean;
  openHandler?: () => void;
  children?: React.ReactElement;
  valueState?: [string, React.Dispatch<React.SetStateAction<string>>];
  inputEl?: React.MutableRefObject<HTMLInputElement>
}

interface SearchSource {
  inner_hits: {
    bookmark: {
      hits: {
        total: {
          value: number;
        }
      }
    }
  };
  _source: {
    dataType?: string;
    publishDate?: number;
    company?: string;
    id?: string;
    viewCount?: number;
    title?: string;
  };
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
  const [error, setError] = useState<[number, string]>(undefined);
  const router = useRouter();

  const searchHandling = async () => {
    if (!inputValue.trim()) {
      setPosts(undefined);
      return;
    }
    setLoading(true);
    const fetchData = await fetch(`/api/search?query=${inputValue}`);
    const result = await fetchData.json();
    const { isError, statusCode, message, data } = result;
    setLoading(false);
    if (isError) {
      setError([statusCode, message]);
      return;
    }
    setPosts([...data]);
    setMaxIndexValue(data.length);
    setIndexValue(0);
  };

  const openHandling = () => {
    if (openHandler) {
      openHandler();
    }
    router.push('', undefined, { shallow: true });
  }

  const keyDownHandling = (event: KeyboardEvent) => {
    //TODO bug: when input value is Korean function run twice. setTimeout makes it okay but I donw know why 🤷‍♂️
    if (event.code === 'Space' && event.ctrlKey) {
      setTimeout(() => {
        openHandling();
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
        openHandling();
      }, 0);
    }
  }

  const clickHandling = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    const button = event.button;
    console.log('??', button)
    if(button === 0 || button === 1){
      const target = event.currentTarget;
      const id = target.getAttribute('href');
      const title = target.getAttribute('aria-label');
      gtagOutboundEvent(id, title);
    }
  };

  const mouseWheelHandling = (event: Event) => {
    if(movePosition){
      setMovePosition(undefined);
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandling);
    window.addEventListener('mousewheel', mouseWheelHandling);

    return () => {
      window.removeEventListener('keydown', keyDownHandling);
      window.removeEventListener('mousewheel', mouseWheelHandling);
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

  const removeHandling = () => {
    setInputValue('');
    if (inputEl) {
      inputEl.current.focus();
    }
  }

  useEffect(() => {
    if (isOpen) {
      router.push('?search', undefined, { shallow: true });
      window.addEventListener('popstate', openHandling);
      inputEl.current.focus();
      if (inputValue) {
        inputEl.current.select();
      }
    }
    return () => {
      window.removeEventListener('popstate', openHandling);
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} openHandler={openHandling} escClose={false}>
      <div className={cssSearchWrapper}>
        <div className={cssInputWrapper(posts)}>
          {isLoading ? <Icon iconName='spinner' spin className={cssLoadingIcon} /> : <Icon iconName='search' />}
          {children}
          {inputValue && <Icon iconName='timesCircle' onClick={removeHandling} className={cssIcon} /> }
        </div>
        {!error && posts && posts.length > 0 && (
          <ul className={cssList} ref={resultsList}>
            {posts.map((post, index) => {
              const { publishDate, company, id, title, viewCount } = post._source;
              const bookmarkCount = post.inner_hits.bookmark.hits.total.value;
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
                <SearchListItem className={cx(
                  { [cssListItem]: true },
                  { [cssListItemFocused]: index === indexValue },
                )}
                  isFocused={index === indexValue}
                  onFocus={focusHandling}
                  key={id}
                  movePosition={movePosition}
                >
                  <>
                    <a
                      href={id}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={title}
                      onClick={clickHandling}
                      onAuxClick={clickHandling}
                      title={title}
                    >
                      <p className={cssPostTitle}>{title}</p>
                    </a>
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
                      <li>
                        <time dateTime={postDate.toISOString()}>{dateDiffer < 8 ? dateDifferString : postDateString}</time>
                      </li>
                      <li>
                        <div className={cssItemDetailItem}>
                          <Icon iconName='eye' />
                          {viewCount}
                        </div>
                      </li>
                      <li>
                        <Bookmark count={bookmarkCount} parent={id} />
                      </li>
                    </ul>
                  </>
                </SearchListItem>
              )
            })}
          </ul>
        )}
        {!error && posts && !posts.length && inputValue &&
          <ul className={cssList} ref={resultsList}>
            <SearchListItem className={cx(
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
            </SearchListItem>
          </ul>
        }
        {error &&
          <ul className={cssList} ref={resultsList}>
            <SearchListItem className={cx(
              { [cssNoResults]: true },
              { [cssListItemFocused]: true },
            )}
              onFocus={focusHandling}
            >
              <div className={cssNoResults}>{error[1]} 😥</div>
            </SearchListItem>
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
  max-width: 70vw;
  transform: translateY(15vh);

  @media ${globalCss.breakpoint.mobileQuery} {
    max-width: 85vw;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    max-width: 80vw;
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

const cssItemDetailItem = css`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border: none;
  background: none;
  color: ${globalCss.color.colorDown};
  height: 100%;

  svg {
    height: 100%;
    margin-right: 0.25rem;
    margin-top: 0.1rem;
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

const cssIcon = css`
  cursor: pointer;
`;