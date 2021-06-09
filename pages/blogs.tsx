import Layout from '../components/atoms/Layout';
import { css } from '@emotion/css';
import globalCss from '../styles/global-css';
import { useEffect, useState } from 'react';
import Icon from '../components/atoms/Icon';
import { icons, iconsCtx } from '../lib/utils/icons';
import Image from 'next/image';
import config from '../config';
import ErrorSection from '../components/atoms/ErrorSection';
import Button from '../components/atoms/Button';
import { API } from '../lib/utils/api';

interface BlogItem {
  _source: {
    id: string;
    title: string;
  }
}

export default function Blogs() {
  const [isLoading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [error, setError] = useState<[number, string]>(undefined);

  async function getBlogs() {
    setLoading(true);
    setError(undefined);
    const fetchData = await fetch(`/api/blogs`, {
      method: 'GET',
    });
    const result: API = await fetchData.json();
    const { isError, statusCode, message, data } = result;
    if (isError) {
      setLoading(false);
      setError([statusCode, message]);
      return;
    }
    setBlogs([...data]);
    setLoading(false);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <Layout title={'기술 블로그 목록'}>
      <section className={cssBlogs}>
        {isLoading && !error &&
          <div className={cssLoading}>
            <Icon iconName='spinner' spin />
          </div>
        }
        {!isLoading && !error && blogs && blogs.length > 0 && (
          <>
            <h1 className={cssTitle}>현재 <span className={cssBlogsCount}>{blogs.length}</span>개의 기술 블로그를 구독중입니다 ✨</h1>
            <ul className={cssList}>
              {blogs.map((blog) => {
                const { id, title } = blog._source;
                return (
                  <li key={id}>
                    <a
                      href={id}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={title}
                      title={title}
                    >
                      <div className={cssListItem}>
                        {icons[title] &&
                          <div className={cssCompanyIcon}>
                            <Image
                              src={`${iconsCtx}${icons[title]}`}
                              alt={title}
                              width='fill'
                              height='fill'
                              layout='responsive'
                            />
                          </div>
                        }
                        <span>{title}</span>
                      </div>
                    </a>
                  </li>
                )
              })}
            </ul>
          </>
        )}
        {!isLoading && !error &&
          <div className={cssReport}>
            <h3>원하시는 기업의 기술 블로그가 목록에 없나요?</h3>
            <p>저에게 알려주세요. 추가하겠습니다. 🙌</p>
            <a
              href={`mailto:${config.author.email}`}
              aria-label="mail"
              className={cssAnchorButton}
            >
              제보 하기 📧
            </a>
          </div>
        }
        {error &&
          <ErrorSection message={error[1]} statusCode={error[0]}>
            <Button ariaLabel="Retry" onClick={getBlogs}><Icon iconName="redo" /></Button>
          </ErrorSection>
        }
      </section>
    </Layout>
  );
}

const cssBlogs = css`
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
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  justify-items: center;
  align-items: center;
  list-style: none;

  li {

    a{
      text-decoration: none;
      color: ${globalCss.color.color};
    }
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    gap: 0.9rem;
    grid-template-columns: 1fr 1fr;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const cssListItem = css`
  margin: 1rem 0;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  text-align: center;
  gap: 0.5rem;

  div {
    margin-right: 0;
    margin-top: 0;
  }
`;

const cssCompanyIcon = css`
  width: 1rem;
  height: 1rem;
  margin-right: 0.25rem;
  margin-top: 0.15rem;
`;

const cssReport = css`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  align-items: center;
  justify-items: center;
  text-align: center;
  margin: 5rem 0;

  @media ${globalCss.breakpoint.mobileQuery} {
    margin: 3rem 0;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    margin: 4rem 0;
  }
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

const cssBlogsCount = css`
  color: ${globalCss.color.primaryBrandColor};
`;

const cssAnchorButton = css`
  background-color: ${globalCss.color.secondaryBrandColor};
  color: ${globalCss.color.white};
  text-decoration: none;
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
  line-height: 1.55;
`;