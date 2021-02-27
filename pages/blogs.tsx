import Layout from '../components/atoms/Layout';
import { css } from '@emotion/css';
import globalCss from '../styles/global-css';
import { useEffect, useState } from 'react';
import { IconSpinner } from '../components/atoms/Icons';
import { icons, iconsCtx } from '../lib/utils/icons';
import Image from 'next/image';
import config from '../config';

interface BlogItem {
  company?: { S: string },
  blogURL?: { S: string }
}

export default function Blogs() {
  const [isLoading, setLoading] = useState(false);
  const [blogs, setBlogs] = useState<BlogItem[]>([]);

  const getBlogs = async () => {
    setLoading(true);
    const fetchData = await fetch(`/api/blogs`, {
      method: 'GET',
    });
    const result = await fetchData.json();
    setBlogs([...result.Items]);
    setLoading(false);
  };

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <Layout title={'기술 블로그 목록'}>
      <section className={cssBlogs}>
        {isLoading &&
          <div className={cssLoading}>
            <IconSpinner spin />
          </div>
        }
        {!isLoading && blogs && blogs.length > 0 && (
          <ul className={cssList}>
            {blogs.map((blog) => {
              return (
                <li key={`${blog.company.S}`}>
                  <a
                    href={blog.blogURL.S}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={blog.company.S}
                  >
                    <div className={cssListItem}>
                      {icons[blog.company.S] &&
                        <div className={cssCompanyIcon}>
                          <Image
                            src={`${iconsCtx}${icons[blog.company.S]}`}
                            alt={blog.company.S}
                            width='fill'
                            height='fill'
                            layout='responsive'
                          />
                        </div>
                      }
                      <span>{blog.company.S}</span>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
        )}
        {!isLoading &&
          <div className={cssReport}>
            <h3>원하시는 기업의 기술 블로그가 목록에 없나요?</h3>
            <p>저에게 알려주세요. 추가하겠습니다. 🙌</p>
            <a
              href={`mailto:${config.author.email}`} aria-label="mail"
            >
              제보 하기 📧
            </a>
          </div>
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

  a {
    background-color: ${globalCss.color.color};
    color: ${globalCss.color.backgroundCode};
    text-decoration: none;
    padding: 0.25rem 0.5rem;
    border-radius: 0.2rem;
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    margin: 3rem 0;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    margin: 4rem 0;
  }
`;