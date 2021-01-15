import React from 'react';
import ScrollButton from './../molecules/ScrollButton';
import {
  IconArrowToTop,
  IconEnvelope,
  IconGithub,
  IconLogoColored,
} from './../atoms/Icons';
import config from '../../config';
import { css, cx } from '@emotion/css';
import globalCss from '../../styles/global-css';

const Footer = (): React.ReactElement => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <footer
      className={cx(
        { [cssFooter]: true },
        // { [cssFooter]: true },//container
      )}
    >
      <nav className={cssFooterContainer}>
        <ul className={cssItemsLeft}>
          <li>
            <a
              href={config.copyrightHomepage}
              target="_blank"
              rel="noopener noreferrer"
              className={cssExternalLink}
            >
              © {new Date().getFullYear()} {config.copyright}.
            </a>
          </li>
          <li>
            <a
              href={config.copyrightHomepage}
              target="_blank"
              rel="noopener noreferrer"
              className={cssExternalLink}
            >
              <IconLogoColored className={cssLogo} />
            </a>
          </li>
          {/* <li> */}
          {/* <Link aria-label={`Terms of use`} to="/"> */}
          {/* <span>Terms of use</span> */}
          {/* </Link> */}
          {/* </li> */}
          {/* <li> */}
          {/* <Link aria-label={`Privacy notice`} to="/404/"> */}
          {/* <span>Privacy notice</span> */}
          {/* </Link> */}
          {/* </li> */}
        </ul>
        {/* <ul className="jth-footer-items-center">
          <li>
            <span>Center</span>
          </li>
        </ul> */}
        <ul className={cssItemsRight}>
          <li className={cssIcon}>
            <a href={`mailto:${config.author.email}`} aria-label="mail">
              <IconEnvelope />
            </a>
          </li>
          <li className={cssIcon}>
            <a
              href={`${config.githubUrl}`}
              target="_blank"
              rel="noreferrer"
              aria-label="github"
            >
              <IconGithub />
            </a>
          </li>
        </ul>
      </nav>
      <ScrollButton
        ariaLabel="ScrollTop"
        tabIndex={-1}
        onClick={scrollToTop}
        showType="notTopAndUp"
        className={cssScrollTopButton}
      >
        <IconArrowToTop />
      </ScrollButton>
    </footer>
  );
};

export default Footer;

const cssFooter = css`
  margin: auto auto 0;
  width: 100%;
  z-index: 1;
  max-width: ${globalCss.common.maxWidth};
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 5rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    padding: 0 1.25rem;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
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
  height: 100%;
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
  height: 100%;
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
    font-size: 3rem;
    margin-right: 2rem;
    margin-top: 0.5rem;
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