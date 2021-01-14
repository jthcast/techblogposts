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
          <li>© {new Date().getFullYear()} {config.copyright}.</li>
          <li>
            <IconLogoColored className={cssLogo} />
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
  margin: auto auto 0 auto;
  width: 100%;
  z-index: 1;
`;

const cssFooterContainer = css`
  max-width: $maxWidth;
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
    color: $color;
    border-bottom: none;

    &:hover {
      color: $color;
    }

    &:focus {
      color: $color;
    }

    &:active {
      color: $color;
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
`;

const cssItemsRight = css`
  height: 100%;
  align-items: flex-end;
  justify-content: flex-end;

  li {
    margin: 0 0 0 1.5rem;
  }
`;

const cssLogo = css`
  display: none;
`;

const cssIcon = css`
  font-size: 1.5rem;
`;

const cssScrollTopButton = css`
  position: fixed;
  left: 1.5rem;
  bottom: 1.5rem;
  z-index: 1;
`;