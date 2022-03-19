import React from 'react';
import ScrollButton from './../molecules/ScrollButton';
import Icon from '../atoms/Icon';
import config from '../../config';
import { css, cx } from '@emotion/css';
import globalCss from '../../styles/global-css';
import Link from 'next/link';

const Footer = (): React.ReactElement => {
  const { copyrightHomepage, copyright, author, siteUrl, githubUrl} = config

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer
      className={cx(
        { [cssFooter]: true },
      )}
    >
      <nav className={cssFooterContainer}>
        <ul className={cssItemsLeft}>
          <li>
            <a
              href={copyrightHomepage}
              target="_blank"
              rel="noopener noreferrer"
              className={cssExternalLink}
            >
              © {new Date().getFullYear()} {copyright}.
            </a>
          </li>
          <li className={cssImportantLink}>
            <Link href={`/privacy`}>
              <a>
                개인정보처리방침
              </a>
            </Link>
          </li>
          <li>
            <Link href={`/terms`}>
              <a
                className={cssExternalLink}
              >
                약관
              </a>
            </Link>
          </li>
        </ul>
        {/* <ul className="jth-footer-items-center">
          <li>
            <span>Center</span>
          </li>
        </ul> */}
        <ul className={cssItemsRight}>
          <li className={cssIcon}>
            <a href={`mailto:${author.email}`} aria-label="mail">
              <Icon iconName='envelope' />
            </a>
          </li>
          <li className={cssIcon}>
            <a
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              aria-label="github"
            >
              <Icon iconName='github' />
            </a>
          </li>
          <li className={cssIcon}>
              <a
                href={`${siteUrl}/rss.xml`}
                target="_blank"
                rel="noreferrer"
                aria-label="rss"
              >
                <Icon iconName='rss' />
              </a>
            </li>
        </ul>
      </nav>
      <ScrollButton
        title="위로"
        ariaLabel="위로"
        tabIndex={-1}
        onClick={scrollToTop}
        showType="notTopAndUp"
        className={cssScrollTopButton}
      >
        <Icon iconName='arrowToTop' />
      </ScrollButton>
    </footer>
  );
};

export default Footer;

const cssFooter = css`
  margin: auto auto 0 auto;
  width: 100%;
  z-index: 0;
  max-width: ${globalCss.common.maxWidth};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    padding: 0 1.25rem;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    max-width: 90%;
    padding: 0 3rem;
  }
`;

const cssFooterContainer = css`
  max-width: ${globalCss.common.maxWidth};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10%, auto));
  align-items: center;
  margin: auto;
  font-size: 0.7rem;
  text-transform: uppercase;
  width: 100%;
  padding: 1.5rem 0;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: row;
    flex: 1 1 33.3%;

    li {
      &:before {
        content: none;
      }
    }
  }

  a {
    color: ${globalCss.color.color};
    border-bottom: none;

    &:hover {
      color: ${globalCss.color.color};
    }

    &:focus {
      color: ${globalCss.color.color};
    }

    &:active {
      color: ${globalCss.color.color};
    }
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    ul {
      flex-direction: column;
      line-height: 160%;
      letter-spacing: 0.1rem;
    }
  }
`;

const cssItemsLeft = css`
  align-items: center;
  justify-content: flex-start;

  li {
    margin: 0 1.5rem 0 0;
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    align-items: flex-end;
    justify-content: flex-start;

    li {
      margin: 0.5rem;
    }
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    li {
      margin: 0 1.5rem 0 0;
    }
  }
`;

const cssItemsRight = css`
  align-items: flex-end;
  justify-content: flex-end;

  li {
    margin: 0 0 0 1.5rem;
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    align-items: flex-start;
    justify-content: space-between;

    li {
      margin: 0.5rem;
    }
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    li {
      margin: 0 0 0 1.5rem;
    }
  }
`;

const cssLogo = css`
display: none;

@media ${globalCss.breakpoint.mobileQuery} {
  display: block;
  
  svg{
    font-size: 3rem;
    margin-right: 2rem;
    margin-top: 0.5rem;
  }
}
`;

const cssIcon = css`
  font-size: 1.5rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    font-size: 2rem;
  }
`;

const cssScrollTopButton = css`
  position: fixed;
  left: 1.5rem;
  bottom: 1.5rem;
  z-index: 1;
`;

const cssExternalLink = css`
  text-decoration: none;
`;

const cssImportantLink = css`
  a {
    text-decoration: none;
    color: ${globalCss.color.secondaryBrandColor};

    &:hover {
      color: ${globalCss.color.secondaryBrandColor};
    }

    &:focus {
      color: ${globalCss.color.secondaryBrandColor};
    }

    &:active {
      color: ${globalCss.color.secondaryBrandColor};
    }
  }
`;