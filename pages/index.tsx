import Layout from '../components/atoms/Layout';
import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { css, keyframes } from '@emotion/css';
import globalCss, { rem } from '../styles/global-css';
import { IconSpinner } from '../components/atoms/Icons';
import { InfiniteScrollContext } from '../context/InfiniteScrollContext';
import useObserver from '../customHooks/useObserver';

interface PostItems {
  Items?: {
    link?: {
      S: string;
    };
    title?: {
      S: string;
    };
    company?: {
      S: string;
    };
    viewCount?: {
      N: string;
    };
    publishDate?: {
      N: string;
    };
  }[];
  LastEvaluatedKey?: {
    test: string;
  };
}

interface PostItem {
  link?: { S: string },
  title?: { S: string },
  company?: { S: string },
  viewCount?: { N: string },
  publishDate?: { N: string }
}

export default function Home() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [isInit, setInit] = useState(true);
  const [isMorePostLoading, setMorePostLoading] = useState(false);
  const [isInfiniteLoad, setInfiniteLoad] = useContext(InfiniteScrollContext);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(undefined);

  const fakeFetch = (delay = 1000) => new Promise(res => setTimeout(res, delay));//TODO to real
  const getPosts = async () => {//TODO to real
    isInit ? setLoading(true) : setMorePostLoading(true);
    await fakeFetch();
    const result: PostItems = {
      Items: [
        {
          link: { S: `https://jthcast.dev/posts/how-to-make-dark-mode-with-css-variables/` },
          title: { S: `CSS변수를 활용하여 다크 모드 구현하기` },
          company: { S: `jthcast` },
          viewCount: { N: `123` },
          publishDate: { N: `1610647831303` }
        },
        {
          link: { S: `https://jthcast.dev/posts/start-blog-development-with-atomic-design/` },
          title: { S: `Atomic Design으로 블로그 개발 시작하기` },
          company: { S: `jthcast` },
          viewCount: { N: `12` },
          publishDate: { N: `1610447831303` }
        },
        {
          link: { S: `https://jthcast.dev/posts/why-efforts-to-preserve-web-standards-and-web-accessibility-are-required/` },
          title: { S: `웹 표준과 웹 접근성을 지키기 위한 노력이 필요한 이유` },
          company: { S: `jthcast` },
          viewCount: { N: `1` },
          publishDate: { N: `1608336000000` }
        },
        {
          link: { S: `https://jthcast.dev/posts/why-react-still-needs-class-type-(feat.errorboundary)/` },
          title: { S: `React에 아직은 Class 형식이 필요한 이유(feat. Errorboundary)` },
          company: { S: `jthcast` },
          viewCount: { N: `0` },
          publishDate: { N: `1608595200000` }
        },
        {
          link: { S: `https://jthcast.dev/posts/why-react-still-needs-class-type-(feat.errorboundary)/1` },
          title: { S: `React에 아직은 Class 형식이 필요한 이유(feat. Errorboundary)` },
          company: { S: `jthcast` },
          viewCount: { N: `0` },
          publishDate: { N: `1608595200000` }
        }
      ],
      LastEvaluatedKey: { test: 'a' }
    }
    setPosts([...posts, ...result.Items]);
    setLastEvaluatedKey(result.LastEvaluatedKey);
    isInit ? setLoading(false) : setMorePostLoading(false);
  };

  // const getPosts = useCallback(async () => {
  //   isInit ? setLoading(true) : setMorePostLoading(true);
  //   const fetchData = await fetch(`/api/get-posts${lastEvaluatedKey ? `?lastEvaluatedKey=${JSON.stringify(lastEvaluatedKey)}` : ''}`, {
  //     method: 'GET',
  //   });
  //   const result = await fetchData.json();
  //   setPosts([...posts, ...result.Items]);
  //   setLastEvaluatedKey(result.LastEvaluatedKey);
  //   isInit ? setLoading(false) : setMorePostLoading(false);
  // }, [lastEvaluatedKey]);

  useEffect(() => {
    getPosts();
    setInit(false);
  }, []);

  // const rssUpdate = async () => {//TODO Schedule
  //   const fetchData = await fetch(`/api/parse-rss`);
  //   const result = await fetchData.json();
  //   console.log(result);
  // };

  const infiniteScrollHandling = () => {
    setInfiniteLoad(isInfiniteLoad === 'on' ? 'off' : 'on');
  }

  const morePostsButtonRef = useRef();

  const observer = useObserver({
    callback: (entry) => {
      if (!isMorePostLoading && isInfiniteLoad === 'on' && entry.isIntersecting) {
        getPosts();
      }
    }, root: null, rootMargin: '50%', threshold: 0
  });

  useEffect(() => {
    if (morePostsButtonRef.current) {
      observer([morePostsButtonRef.current]);
    }
  }, [morePostsButtonRef.current])

  const gtagOutboundEvent = (title: string) => {
    gtag('event', 'click', {
      'event_category': 'outbound',
      'event_label': title,
      'transport_type': 'beacon',
    });

    return null;
  }

  return (
    <Layout>
      <section className={cssPosts}>
        {isLoading &&
          <div className={cssLoading}>
            <IconSpinner spin />
          </div>
        }
        {!isLoading && posts && posts.length > 0 && (
          <ul className={cssList}>
            {posts.map((post, index) => {
              const nowDate = new Date();
              const postDate = new Date(parseInt(post.publishDate.N));
              const dateDiffer = Math.floor((nowDate.getTime() - postDate.getTime()) / 60 / 1000 / 60 / 24);
              const dateDifferString = dateDiffer === 0 ? `오늘` : `${dateDiffer}일 전`;
              const postDateString = `${postDate.getUTCFullYear()}-${postDate.getMonth() + 1}-${postDate.getDate()}`;

              return (
                <li key={`${post.link.S}${index}`} className={cssListItem}>
                  <a
                    href={post.link.S}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={post.title.S}
                    onClick={gtagOutboundEvent(post.title.S)}
                  >
                    <p className={cssPostTitle}>{post.title.S}</p>
                    <ul className={cssItemDetailLeft}>
                      <li>
                        {post.company.S}
                      </li>
                      {/* <li>
                        <span role="img" aria-label="viewCount">👀</span>{' '}
                        {post.viewCount.N}
                      </li> */}
                    </ul>
                    <ul className={cssItemDetailRight}>
                      <li>
                        <span role="img" aria-label="date">📅</span>{' '}
                        <time dateTime={postDate.toISOString()}>{dateDiffer < 8 ? dateDifferString : postDateString}</time>
                      </li>
                    </ul>
                  </a>
                </li>
              )
            })}
          </ul>
        )}
        {lastEvaluatedKey &&
          <button className={cssMorePostsButton} onClick={infiniteScrollHandling} ref={morePostsButtonRef}>
            {isMorePostLoading ?
              <IconSpinner spin /> :
              <p>More{' '}
                <span role="img" aria-label="More posts" className={cssBounce}>👇</span>
              </p>
            }
          </button>
        }
        {/* <button onClick={rssUpdate}>RSS UPDATE</button> */}
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
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.25rem;
    text-decoration: none;
    color: ${globalCss.color.color};

    p:first-child {
      grid-area: 1/1/2/3;
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
  font-weight: bold;
`;

const cssItemDetailLeft = css`
  font-size: 0.9rem;
  display: flex;
  list-style: none;
  justify-content: flex-start;
  color: ${globalCss.color.colorDown};

  li{
    margin-right: 1rem;

    &:nth-last-child(1) {
      margin-right: 0;
    }
  }
`;

const cssItemDetailRight = css`
  font-size: 0.9rem;
  display: flex;
  list-style: none;
  justify-content: flex-end;
  color: ${globalCss.color.colorDown};

  li{
    margin-left: 1rem;

    &:nth-child(1) {
      margin-left: 0;
    }
  }
`;

const cssMorePostsButton = css`
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
  display: inline-block;
  animation: ${keyFramesBounce} 1s ease infinite;
`;