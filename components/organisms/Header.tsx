import { cx, css } from '@emotion/css';
import globalCss from '../../styles/global-css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import HeaderMessage from '../atoms/HeaderMessage';
import { IconLogoColored } from '../atoms/Icons';
import DarkModeSwitch from '../molecules/DarkModeSwitch';
import InfiniteScrollSwitch from '../molecules/InfiniteScrollSwitch';
import config from '../../config';
import Link from 'next/link';

interface HeaderProps {
  ghost?: boolean;
  showType?: 'fixed' | 'top' | 'sticky' | 'up';
  subTitle?: string;
  title?: string;
}

const Header = ({
  ghost = false,
  showType = 'top',
  subTitle,
  title,
}: HeaderProps): React.ReactElement => {
  const [scrollState, setScrollState] = useState(false);
  const prevScrollRef = useRef(0);
  const showTypeRef = useRef(showType);
  const hideRef = useRef(false);

  const scrollHandling = useCallback(() => {
    const scrollValue = window.scrollY;

    if (showTypeRef.current === 'up') {
      hideRef.current = true;
    }
    if (prevScrollRef.current >= scrollValue) {
      setScrollState(true);
    } else {
      setScrollState(false);
    }
    prevScrollRef.current = scrollValue;
  }, []);

  useEffect(() => {
    scrollHandling();
    window.addEventListener('scroll', scrollHandling);

    return () => {
      window.removeEventListener('scroll', scrollHandling);
    };
  }, [scrollHandling]);

  return (
    <>
      <HeaderMessage allowClose>
        <a href={`mailto:${config.author.email}`} aria-label="mail">
          건의 하기 📧
        </a>
      </HeaderMessage>
      <header
        className={cx(
          { [cssHeader]: true },
          { [cssSticky]: showTypeRef.current === 'sticky' },
          { [cssFixed]: showTypeRef.current === 'fixed' },
          { [cssHeaderHide]: hideRef.current },
          { [cssHeaderShow]: scrollState },
          { [cssGhost]: ghost },
        )}
      >
        {/* <div className="jth-header-mobile">
          <Link to="/" aria-label="home">
            <IconLogo />
          </Link>
        </div> */}
        <nav className={cssHeaderItems}>
          {title || subTitle ? (
            <ul className={cssHeaderItemsLeft}>
              <li>
                <Link href="/">
                  <a className={cssHeaderTitle}>
                    <IconLogoColored />
                    {title}
                    {subTitle && <span>{subTitle}</span>}
                  </a>
                </Link>
              </li>
            </ul>
          ) : null}
          {/* {title ||
            (subTitle && (
              <ul className="jth-header-items-center">
                <li>
                  <Link aria-label="home" tabIndex={-1} to="/">
                    <span className="jth-header-title">{title}</span>
                    <span className="jth-header-subTitle">{subTitle}</span>
                  </Link>
                </li>
              </ul>
            ))} */}
          <ul className={cssHeaderItemsRight}>
            <li>
              <InfiniteScrollSwitch ariaLabel="자동 글 불러오기" title="자동 글 불러오기" />
            </li>
            <li>
              <DarkModeSwitch ariaLabel="테마" title="테마" />
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};

export default Header;

const cssHeader = css`
  padding: 1.5rem 3rem;
  z-index: 2;
  width: 100%;
  background-color: ${globalCss.color.backgroundColorOpacity};
  font-weight: ${globalCss.common.fontNormal};
  // text-transform: uppercase;
  max-width: ${globalCss.common.maxWidthHeader};

  a {
    color: ${globalCss.color.color};
    border-bottom: none;
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    padding: 1rem 1.25rem;
  }

  @media ${globalCss.breakpoint.tabletQuery} {
    padding: 1.5rem 2rem;
  }
`;

const cssSticky = css`
  position: sticky;
  top: 0;
  z-index: 2;
  background-color: ${globalCss.color.backgroundColorOpacity};
`;

const cssFixed = css`
  position: fixed;
  top: 0;
  z-index: 2;
`;

const cssHeaderHide = css`
  opacity: 0;
  transition: 0.2s linear;
  visibility: hidden;
  position: sticky;
  top: 0;
  transform: translateY(-100%);
`;

const cssHeaderShow = css`
  opacity: 1;
  visibility: visible;
  transform: translateY(0%);
  background-color: ${globalCss.color.backgroundColorOpacity};
`;

const cssGhost = css`
  background-color: transparent;
`;

const cssHeaderItems = css`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10%, auto));
  align-items: center;
  margin: auto;
  max-width: ${globalCss.common.maxWidthHeader};
`;

const cssHeaderItemsLeft = css`
  list-style: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  li {
    margin-right: 1.5rem;
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    li {
      width: 100%;
      margin-right: 0;
    }
  }
`;

const cssHeaderItemsRight = css`
  list-style: none;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  li {
    margin-left: 1rem;

    &:nth-child(1) {
      margin-left: 0;
    }
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    display: none;
  }
`;

const cssHeaderTitle = css`
  display: inline-flex;
  align-items: center;
  margin: 0 0.25rem;
  font-size: 1.25rem;
  text-decoration: none;

  svg {
    margin-right: 0.25rem;
    margin-top: 0.2rem;
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    width: 100%;
    justify-content: center;
    font-size: 1rem;
    margin: 0;
  }
`;

const cssHeaderSubTitle = css`
  margin: 0 0.25rem;
  font-size: 0.75rem;
`;