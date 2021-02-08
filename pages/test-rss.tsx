import Layout from '../components/atoms/Layout';
import { FormEvent, useRef, useState } from 'react';
import { css, keyframes } from '@emotion/css';
import globalCss, { rem } from '../styles/global-css';
import { IconSpinner } from '../components/atoms/Icons';

export default function RssTest() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [isLoading, setLoading] = useState(false);
  const inputURLRef = useRef<HTMLInputElement>();
  const inputCompanyRef = useRef<HTMLInputElement>();

  async function getRSS(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      const url = inputURLRef.current.value;
      const company = inputCompanyRef.current.value;
      const feedResponse = await fetch(`/api/test-rss?url=${url}&company=${company}`);
      const feed = await feedResponse.json();
      const items = feed.rssItems;
      setPosts(items);
      setError(undefined);
      setLoading(false);
      return null;
    } catch (err) {
      console.log(err);
      setPosts([]);
      setError(err.toString());
      setLoading(false);
    }
  }

  return (
    <Layout title={`RSS 테스트`}>
      <section className={cssPosts}>
        <form onSubmit={getRSS} className={cssForm}>
          <input placeholder='URL' ref={inputURLRef} className={cssInput} />
          <input placeholder='Company' ref={inputCompanyRef} className={cssInput} />
          <button type='submit' className={cssMorePostsButton}>
            {isLoading ?
              <IconSpinner spin /> :
              <p>Test{' '}
                <span role="img" aria-label="Test" className={cssBounce}>✨</span>
              </p>
            }
          </button>
        </form>
        {!isLoading && posts && posts.length > 0 && (
          <ul className={cssList}>
            {posts.map((post, index) => {
              const nowDate = new Date();
              const today = new Date(`${nowDate.getFullYear()}-${nowDate.getMonth() + 1}-${nowDate.getDate()}`);
              const postDate = new Date(parseInt(post.publishDate));
              const postDay = new Date(`${postDate.getFullYear()}-${postDate.getMonth() + 1}-${postDate.getDate()}`);
              const dateDiffer = Math.floor((today.getTime() - postDay.getTime()) / 60 / 1000 / 60 / 24);
              const dateDifferString = dateDiffer === 0 ? `오늘` : `${dateDiffer}일 전`;
              const postDateMonth = (postDate.getMonth() + 1).toString().length === 1 ? `0${postDate.getMonth() + 1}` : postDate.getMonth() + 1;
              const postDateDate = postDate.getDate().toString().length === 1 ? `0${postDate.getDate()}` : postDate.getDate();
              const postDateString = `${postDate.getFullYear()}-${postDateMonth}-${postDateDate}`;

              return (
                <li key={`${post.link}${index}`} className={cssListItem}>
                  <a
                    href={post.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={post.title}
                  >
                    <p className={cssPostTitle}>{post.title}</p>
                    <ul className={cssItemDetail}>
                      <li className={cssItemDetailLeft}>
                        {post.company}
                      </li>
                      {/* <li>
                        <span role="img" aria-label="viewCount">👀</span>{' '}
                        {post.viewCount}
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
        {!isLoading && error && (
          <section className={cssError}>
            {error}
          </section>
        )}
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
  margin: 0 auto;
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

const cssForm = css`
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr;

  @media ${globalCss.breakpoint.mobileQuery} {
    grid-template-columns: 1fr;
  }
`;

const cssInput = css`
  padding: 0.5rem;
  background-color: transparent;
  border: none;
  border-bottom: ${rem(1)} solid ${globalCss.color.secondaryBrandColor};
  color: ${globalCss.color.color};
  outline: none;

  &:focus {
    border-bottom: ${rem(1)} solid ${globalCss.color.primaryBrandColor};
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    margin-bottom: 1rem;
  }
`;

const cssError = css`
  margin-top: 3rem;
`;