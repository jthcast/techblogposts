import Layout from '../components/atoms/Layout';
import { useCallback, useEffect, useState } from 'react';
import { css } from '@emotion/css';
import globalCss, { rem } from '../styles/global-css';
import { IconSpinner } from '../components/atoms/Icons';

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
  const [lastEvaluatedKey, setLastEvaluatedKey] = useState(undefined);

  const getPosts = () => {
    setLoading(true);
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
        },
        {
          link: { S: `https://jthcast.dev/posts/why-react-still-needs-class-type-(feat.errorboundary)/2` },
          title: { S: `React에 아직은 Class 형식이 필요한 이유(feat. Errorboundary)` },
          company: { S: `jthcast` },
          viewCount: { N: `0` },
          publishDate: { N: `1608595200000` }
        },
        {
          link: { S: `https://jthcast.dev/posts/why-react-still-needs-class-type-(feat.errorboundary)/3` },
          title: { S: `React에 아직은 Class 형식이 필요한 이유(feat. Errorboundary)` },
          company: { S: `jthcast` },
          viewCount: { N: `0` },
          publishDate: { N: `1608595200000` }
        },
        {
          link: { S: `https://jthcast.dev/posts/why-react-still-needs-class-type-(feat.errorboundary)/4` },
          title: { S: `React에 아직은 Class 형식이 필요한 이유(feat. Errorboundary)` },
          company: { S: `jthcast` },
          viewCount: { N: `0` },
          publishDate: { N: `1608595200000` }
        },
        {
          link: { S: `https://jthcast.dev/posts/why-react-still-needs-class-type-(feat.errorboundary)/5` },
          title: { S: `React에 아직은 Class 형식이 필요한 이유(feat. Errorboundary)` },
          company: { S: `jthcast` },
          viewCount: { N: `0` },
          publishDate: { N: `1608595200000` }
        },
        {
          link: { S: `https://jthcast.dev/posts/why-react-still-needs-class-type-(feat.errorboundary)/6` },
          title: { S: `React에 아직은 Class 형식이 필요한 이유(feat. Errorboundary)` },
          company: { S: `jthcast` },
          viewCount: { N: `0` },
          publishDate: { N: `1608595200000` }
        },
      ],
      LastEvaluatedKey: { test: 'a' }
    }
    setPosts([...posts, ...result.Items]);
    setLastEvaluatedKey(result.LastEvaluatedKey);
    setLoading(false);
    console.log('done')
  };
  // const getPosts = useCallback(async () => {
  //   setLoading(true);
  //   const fetchData = await fetch(`/api/get-posts${lastEvaluatedKey ? `?lastEvaluatedKey=${JSON.stringify(lastEvaluatedKey)}` : ''}`, {
  //     method: 'GET',
  //   });
  //   const result = await fetchData.json();
  //   setPosts([...posts, ...result.Items]);
  //   setLastEvaluatedKey(result.LastEvaluatedKey);
  //   setLoading(false);
  // }, [lastEvaluatedKey]);

  const rssUpdate = async () => {
    const fetchData = await fetch(`/api/parse-rss`);
    const result = await fetchData.json();
    console.log(result);
  };

  useEffect(() => {
    getPosts();
  }, []);

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
            {posts.map((post) => {
              const nowDate = new Date();
              const postDate = new Date(parseInt(post.publishDate.N));
              const dateDiffer = Math.floor((nowDate.getTime() - postDate.getTime()) / 60 / 1000 / 60 / 24);
              const dateDifferString = dateDiffer === 0 ? `오늘` : `${dateDiffer}일 전`;
              const postDateString = `${postDate.getUTCFullYear()}-${postDate.getMonth() + 1}-${postDate.getDate()}`;

              return (
                <li key={post.link.S} className={cssListItem}>
                  <a
                    href={post.link.S}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={post.title.S}
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
          <button className={cssMorePostsButton} onClick={getPosts}>
            {isLoading ?
              <IconSpinner spin /> :
              <p>More Posts{' '}
                <span role="img" aria-label="More posts">👇</span>
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
  margin-top: 5rem;

  @media ${globalCss.breakpoint.mobileQuery} {
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