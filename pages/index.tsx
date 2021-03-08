import Layout from '../components/atoms/Layout';
import { useContext, useEffect, useRef, useState } from 'react';
import { css, keyframes } from '@emotion/css';
import globalCss, { rem } from '../styles/global-css';
import { IconMagnetColored, IconSpinner } from '../components/atoms/Icons';
import { InfiniteScrollContext } from '../context/InfiniteScrollContext';
import useObserver from '../customHooks/useObserver';
import { icons, iconsCtx } from '../lib/utils/icons';
import Image from 'next/image';
import { InferGetServerSidePropsType } from 'next';
import config from '../config';

interface PostItem {
  link?: { S: string };
  title?: { S: string };
  company?: { S: string };
  viewCount?: { N: string };
  publishDate?: { N: string };
  isShow?: { BOOL: boolean };
}

export async function getServerSideProps() {
  const res = await fetch(`${config.siteUrl}/api/posts`);
  const data = await res.json();

  return { props: { data } }
}

export default function Home({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const [posts, setPosts] = useState<PostItem[]>([...data.Items]);
  const [postLinks] = useState(data.Items.map((post: PostItem) => post.link.S));
  const [isLoading, setLoading] = useState(false);
  const [isInfiniteLoad, setInfiniteLoad] = useContext(InfiniteScrollContext);
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(data.LastEvaluatedKey);
  const root = typeof window !== 'undefined' ? document.querySelector('#__next') : null;

  async function getPosts() {
    setLoading(true);
    const fetchData = await fetch(`/api/posts${lastEvaluatedKey ? `?lastEvaluatedKey=${JSON.stringify(lastEvaluatedKey)}` : ''}`, {
      method: 'GET',
    });
    const result = await fetchData.json();
    // setPosts([...posts, ...result.Items]);
    const postsArray = [...posts];
    result.Items.forEach((post: PostItem) => {
      const link = post.link.S;
      if (!postLinks.includes(link)) {
        postLinks.push(link);
        postsArray.push(post);
      }
    });
    setPosts(postsArray);
    setLastEvaluatedKey(result.LastEvaluatedKey);
    setLoading(false);
  };

  function infiniteScrollHandling() {
    setInfiniteLoad(isInfiniteLoad === 'on' ? 'off' : 'on');
  }

  const morePostsButtonRef = useRef();

  const observer = useObserver({
    callback: (entry) => {
      if (!isLoading && isInfiniteLoad === 'on' && entry.isIntersecting) {
        getPosts();
      }
    }, root: root, rootMargin: '50%', threshold: 0
  });

  useEffect(() => {
    if (morePostsButtonRef.current) {
      observer([morePostsButtonRef.current]);
    }
  }, [morePostsButtonRef.current])

  async function gtagOutboundEvent(link: string, title: string) {
    await fetch('/api/view-count', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        link,
      })
    });
    gtag('event', 'click', {
      'event_category': 'outbound',
      'event_label': title,
      'transport_type': 'beacon',
    });
  }

  return (
    <Layout title={'기술 블로그 모음'}>
      <section className={cssPosts}>
        {posts && posts.length > 0 && (
          <ul className={cssList}>
            {posts.map((post, index) => {
              if (post.isShow?.BOOL === false) {
                return null;
              }
              const nowDate = new Date();
              const postDate = new Date(parseInt(post.publishDate.N));
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
                <li key={`${post.link.S}${index}`} className={cssListItem}>
                  <a
                    href={post.link.S}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={post.title.S}
                    onClick={() => gtagOutboundEvent(post.link.S, post.title.S)}
                  >
                    <p className={cssPostTitle}>{post.title.S}</p>
                    <ul className={cssItemDetail}>
                      <li className={cssItemDetailLeft}>
                        {icons[post.company.S] &&
                          <div className={cssCompanyIcon}>
                            <Image
                              src={`${iconsCtx}${icons[post.company.S]}`}
                              alt={post.company.S}
                              width='fill'
                              height='fill'
                              layout='responsive'
                            />
                          </div>
                        }
                        {post.company.S}
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
        {lastEvaluatedKey &&
          <button className={cssMorePostsButton} onClick={infiniteScrollHandling} ref={morePostsButtonRef}>
            {isLoading ?
              <IconSpinner spin /> :
              <>
                <span>More</span>
                <div role="img" aria-label="More posts" className={cssBounce}><IconMagnetColored /></div>
              </>
            }
          </button>
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