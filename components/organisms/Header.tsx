import { cx, css } from '@emotion/css';
import globalCss from '../../styles/global-css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import HeaderMessage from '../atoms/HeaderMessage';
import { IconLogoColored } from '../atoms/Icons';
import DarkModeSwitch from '../molecules/DarkModeSwitch';
import InfiniteScrollSwitch from '../molecules/InfiniteScrollSwitch';

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
        <a href="mailto:jthcast@gmail.com" aria-label="mail">
          연락 하기 📧
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
                <span className={cssHeaderTitle}>
                  <IconLogoColored />
                  {title}
                </span>
                <span className={cssHeaderSubTitle}>{subTitle}</span>
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
              <InfiniteScrollSwitch />
            </li>
            <li>
              <DarkModeSwitch />
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
  // font-size: 0.7rem;
  font-weight: ${globalCss.common.fontBold};
  text-transform: uppercase;

  a {
    color: ${globalCss.color.color};
    border-bottom: none;
  }

  ul {
    list-style: none;
    display: flex;

    li {
      &:before {
        content: none;
      }

      a {
        &:before {
          transition: none;
        }
      }

      button {
        transition: none;
      }
    }
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
  justify-content: flex-start;
  align-items: center;

  li {
    margin-right: 1.5rem;
  }
`;

const cssHeaderItemsRight = css`
  justify-content: flex-end;
  align-items: center;

  li {
    margin-left: 1.5rem;
  }
`;

const cssHeaderTitle = css`
  display: inline-flex;
  align-items: center;
  margin: 0 0.25rem;
  font-size: 1.25rem;

  svg {
    margin-right: 0.25rem;
  }
`;

const cssHeaderSubTitle = css`
  margin: 0 0.25rem;
  font-size: 0.75rem;
`;