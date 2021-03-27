import Layout from '../components/atoms/Layout';
import { useContext, useEffect, useRef, useState } from 'react';
import { css, keyframes } from '@emotion/css';
import globalCss, { rem } from '../styles/global-css';
import { IconMagnetColored, IconSpinner, IconTemplate } from '../components/atoms/Icons';
import { InfiniteScrollContext } from '../context/InfiniteScrollContext';
import useObserver from '../customHooks/useObserver';
import { icons, iconsCtx } from '../lib/utils/icons';
import Image from 'next/image';
import { gtagOutboundEvent } from '../lib/utils/googleAnalytics';
import ErrorSection from '../components/atoms/ErrorSection';
import Button from '../components/atoms/Button';
import { API } from '../lib/utils/api';

interface PostItem {
  sort: Array<any>;
  _source: {
    company: string;
    dataType: string;
    id: string;
    isShow: boolean;
    publishDate: number;
    title: string;
    viewCount: number;
  }
}

export default function Home() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isInit, setInit] = useState(true);
  const [isMorePostLoading, setMorePostLoading] = useState(false);
  const [isInfiniteLoad, setInfiniteLoad] = useContext(InfiniteScrollContext);
  const [sort, setSort] = useState(undefined);
  const root = typeof window !== 'undefined' ? document.querySelector('#__next') : null;
  const [error, setError] = useState<[number, string]>(undefined);

  const getPosts = async () => {
    isInit ? setLoading(true) : setMorePostLoading(true);
    setError(undefined);
    const fetchData = await fetch(`/api/posts${sort ? `?sort=${JSON.stringify(sort)}` : ''}`);
    const result: API = await fetchData.json();
    const { isError, statusCode, message, data } = result;
    if (isError) {
      setInit(true);
      setError([statusCode, message]);
      return;
    }
    setPosts([...posts, ...data]);
    setSort(data[data.length - 1].sort);
    isInit ? setLoading(false) : setMorePostLoading(false);
  };

  useEffect(() => {
    getPosts();
    setInit(false);
  }, []);

  function infiniteScrollHandling() {
    setInfiniteLoad(isInfiniteLoad === 'on' ? 'off' : 'on');
  }

  const morePostsButtonRef = useRef();

  const observer = useObserver({
    callback: (entry) => {
      if (!isMorePostLoading && isInfiniteLoad === 'on' && entry.isIntersecting) {
        getPosts();
      }
    }, root: root, rootMargin: '50%', threshold: 0
  });

  useEffect(() => {
    if (morePostsButtonRef.current) {
      observer([morePostsButtonRef.current]);
    }
  }, [morePostsButtonRef.current])

  return (
    <Layout title={'기술 블로그 모음'}>
      <section className={cssPosts}>
        {isLoading &&
          <div className={cssLoading}>
            <IconSpinner spin />
          </div>
        }
        {!isLoading && !error && posts && posts.length > 0 && (
          <ul className={cssList}>
            {posts.map((post) => {
              const { company, id, publishDate, title } = post._source;
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
                <li key={id} className={cssListItem}>
                  <a
                    href={id}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={title}
                    onClick={() => gtagOutboundEvent(id, title)}
                    title={title}
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
        {!error && sort &&
          <button className={cssMorePostsButton} onClick={infiniteScrollHandling} ref={morePostsButtonRef}>
            {isMorePostLoading ?
              <IconSpinner spin /> :
              <>
                <span>More</span>
                <div role="img" aria-label="More posts" className={cssBounce}><IconMagnetColored /></div>
              </>
            }
          </button>
        }
        {error &&
          <ErrorSection message={error[1]} statusCode={error[0]}>
            <Button ariaLabel="Retry" className={cssButton} onClick={getPosts}><IconTemplate iconName="IconReDo" /></Button>
          </ErrorSection>
        }
      </section>
    </Layout>
  );
}

const cssPosts = css`
  max-width: ${globalCss.common.maxWidth};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5rem;
  margin: auto;
  margin-top: 1rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    margin-top: 0;
    padding: 0 1.25rem;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    padding: 0 3rem;
  }
`;

const cssLoading = css`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  color: ${globalCss.color.secondaryBrandColor};
  margin: 5rem 0;
`;

const cssList = css`
  list-style: none;
`;

const cssListItem = css`
  padding: 1rem 0;
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

const cssMorePostsButton = css`
  display: flex;
  margin: 1rem auto;
  padding: 0.5rem 2rem;
  border: none;
  border-radius: 0.25rem;
  color: ${globalCss.color.white};
  background-color: ${globalCss.color.secondaryBrandColor};
  cursor: pointer;
`;

const keyFramesBounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, ${rem(-7)}, 0);
  }

  70% {
    transform: translate3d(0, ${rem(-3)}, 0);
  }

  90% {
    transform: translate3d(0,-${rem(-1)},0);
  }
`;

const cssBounce = css`
  margin-left: 0.25rem;
  margin-top: 0.1rem;
  animation: ${keyFramesBounce} 1s ease infinite;
`;

const cssCompanyIcon = css`
  width: 1rem;
  height: 1rem;
  display: inline-block;
  margin-right: 0.25rem;
  margin-top: 0.15rem;
`;

const cssButton = css`
  background-color: ${globalCss.color.secondaryBrandColor};
  border: none;
  color: ${globalCss.color.white};

  &:hover {
    opacity: 1;
    border: none;
    color: ${globalCss.color.color};
  }
  
  &:focus {
    opacity: 1;
    border: none;
    color: ${globalCss.color.color};
  }
  
  &:active {
    border: none;
    color: ${globalCss.color.color};
  }
`;