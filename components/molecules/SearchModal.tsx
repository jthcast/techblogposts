import { css } from '@emotion/css';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import globalCss, { rem } from '../../styles/global-css';
import { IconSearch } from '../atoms/Icons';
import Modal from '../atoms/Modal';
import { icons, iconsCtx } from '../../lib/utils/icons';
import Image from 'next/image';
import { gtagOutboundEvent } from '../../lib/utils/googleAnalytics';

interface SearchModalProps {
  isOpen?: boolean;
  openHandler?: () => void;
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
  openHandler
}: SearchModalProps): React.ReactElement => {
  const inputEl = useRef<HTMLInputElement>();
  const [posts, setPosts] = useState<SearchSource[]>(undefined);
  const [inputValue, setInputValue] = useState<string>('');

  const search = async (query: string) => {
    if (query) {
      const fetchData = await fetch(`/api/search?query=${query}`);
      const result = await fetchData.json();
      setPosts([...result]);
    } else {
      setPosts(undefined);
    }
  }

  const keyDownHandling = (event: KeyboardEvent) => {
    if (event.code === 'Space' && event.ctrlKey) {
      setTimeout(() => {
        openHandler(); //TODO bug: when input value is Korean function run twice
      }, 0);
    }
    if (event.code === 'Tab' && isOpen) {
      event.preventDefault();
    }
    if (event.code === 'Enter' && isOpen) {
      search(inputValue);
    }
    if (event.code === 'Escape' && isOpen) {
      if (inputValue) {
        setInputValue('');
        setPosts(undefined);
        return;
      }
      openHandler();
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', keyDownHandling);

    return () => {
      window.removeEventListener('keydown', keyDownHandling);
    };
  }, [keyDownHandling]);

  const inputChangeHandling = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  }

  useEffect(() => {
    if (!inputValue) {
      setPosts(undefined);
    }
  }, [inputValue]);

  useEffect(() => {
    if (isOpen) {
      inputEl.current.select();
    }
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} openHandler={openHandler} escClose={false}>
      <div className={cssSearchWrapper}>
        <div className={cssInputWrapper}>
          <IconSearch />
          <input ref={inputEl} className={cssInput} placeholder='검색' onChange={inputChangeHandling} value={inputValue} />
        </div>
        {posts && posts.length > 0 && (
          <ul className={cssList}>
            {posts.map((post) => {
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
                <li key={`${id}`} className={cssListItem}>
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
                </li>
              )
            })}
          </ul>
        )}
        {posts && !posts.length && inputValue &&
          <div className={cssNoResults}>
            <span>검색 결과가 없습니다. 😅</span>
          </div>
        }
      </div>
    </Modal>
  );
};

export default SearchModal;

const cssSearchWrapper = css`
  width: 100%;
  height: 100%;
  max-width: 75%;
`;

const cssInputWrapper = css`
  width: 100%;
  margin-top: 10rem;
  display: flex;
  align-items: center;
  border: ${globalCss.color.borderColor} 0.15rem solid;
  border-radius: 0.7rem;
  padding: 0.7rem;
  background-color: ${globalCss.color.groupColor};

  svg{
    font-size: 1.5rem;
    margin-right: 0.5rem;
  }
`;

const cssInput = css`
  background-color: transparent;
  color: ${globalCss.color.color};
  border: none;
  outline: none;
  width: 100%;

  &::placeholder{
    color: ${globalCss.color.borderColor};
  }
`;

const cssList = css`
  list-style: none;
  overflow-y: scroll;
  max-height: 50%;
`;
const cssListItem = css`
  padding: 1rem 0;
  border-bottom: ${rem(2)} solid ${globalCss.color.groupColor};
  max-width: 98%;
  margin: auto;

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
  padding: 1rem 0;
  max-width: 98%;
  margin: auto;
  font-size: 1rem;
`;