import Layout from '../components/atoms/Layout';
import { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/css';
import globalCss, { rem } from '../styles/global-css';
import { IconSpinner, IconTemplate } from '../components/atoms/Icons';
import { icons, iconsCtx } from '../lib/utils/icons';
import Image from 'next/image';
import { gtagOutboundEvent } from '../lib/utils/googleAnalytics';
import ErrorSection from '../components/atoms/ErrorSection';
import Button from '../components/atoms/Button';
import { API } from '../lib/utils/api';
import Bookmark from '../components/atoms/Bookmark';
import { LoginContext } from '../context/LoginContext';

export interface BookmarkItem {
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

export default function Bookmarks() {
  const [posts, setPosts] = useState<BookmarkItem[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<[number, string]>(undefined);
  const [loginInfo, setLogin] = useContext(LoginContext);

  const getPosts = async () => {
    setLoading(true);
    setError(undefined);
    const fetchData = await fetch(`/api/bookmark?uid=${loginInfo.uid}&getType=parent`, {
      method: 'GET',
    });
    const result: API = await fetchData.json();
    const { isError, statusCode, message, data } = result;
    const bookmarks: BookmarkItem[] = data;
    if (isError) {
      setError([statusCode, message]);
      setLoading(false);
      return;
    }
    const sortedData = bookmarks.sort((a, b) => b._source.publishDate - a._source.publishDate);
    setPosts([...sortedData]);
    setLoading(false);
  };

  useEffect(() => {
    if(!loginInfo){
      setLoading(false);
      return;
    }
    getPosts();
  }, [loginInfo]);

  return (
    <Layout title={'즐겨찾기'}>
      <section className={cssPosts}>
        {isLoading &&
          <div className={cssLoading}>
            <IconSpinner spin />
          </div>
        }
        {!loginInfo && !isLoading && (
          <h1 className={cssTitle}>로그인이 필요합니다 😅</h1>
        )}
        {loginInfo && !isLoading && !error && posts && posts.length === 0 && (
          <h1 className={cssTitle}>아직 즐겨찾기에 추가한 포스트가 없어요 😅</h1>
        )}
        {loginInfo && !isLoading && !error && posts && posts.length > 0 && (
          <ul className={cssList}>
            {posts.map((post) => {
              const { company, id, publishDate, title, viewCount } = post._source;
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
                        <IconTemplate iconName="IconEye" />
                        {viewCount}
                      </div>
                    </li>
                    <li>
                      <Bookmark parent={id} />
                    </li>
                  </ul>
                </li>
              )
            })}
          </ul>
        )}
        {error &&
          <ErrorSection message={error[1]} statusCode={error[0]}>
            <Button ariaLabel="Retry" onClick={getPosts}><IconTemplate iconName="IconReDo" /></Button>
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
  color: ${globalCss.color.colorDown};

  li {
    margin-right: 0.5rem;
    display: flex;
    align-items: center;

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

const cssTitle = css`
  font-size: 1.25rem;
  text-align: center;
  margin-bottom: 5rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    margin-bottom: 1rem;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    margin-bottom: 3rem 0;
  }
`;