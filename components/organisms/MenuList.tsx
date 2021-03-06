import React, { useCallback, useEffect, useState } from 'react';
import DarkModeSwitch from '../molecules/DarkModeSwitch';
import { IconBars, IconJthLogoColored, IconPaperWithSignalColored, IconSearch, IconTimes } from '../atoms/Icons';
import ScrollButton from '../molecules/ScrollButton';
import InfiniteScrollSwitch from '../molecules/InfiniteScrollSwitch';
import { css, cx } from '@emotion/css';
import globalCss from '../../styles/global-css';
import config from '../../config';
import Link from 'next/link';
import SearchModal from '../molecules/SearchModal';

interface MenuListProps {
  showStartPosition?: 'bottom' | 'left' | 'none' | 'right' | 'top';
}

const MenuList = ({
  showStartPosition = 'none',
}: MenuListProps): React.ReactElement => {
  let firstTabEl = undefined;
  let lastTabEl = undefined;
  const isClient = typeof window !== 'undefined';
  if (isClient) {
    firstTabEl = document.querySelectorAll(
      '#menulist-items li:first-child > :first-child'
    )[0] as HTMLButtonElement;
    lastTabEl = document.querySelector(
      '#scrollButton-menuList-menu'
    ) as HTMLLIElement;
  }
  const [menuState, setMenuState] = useState(false);

  const menuListHandling = () => {
    setMenuState(!menuState);
  };

  useEffect(() => {
    if (menuState) {
      document.body.style.setProperty('overflow-y', 'hidden');
    } else {
      document.body.style.removeProperty('overflow-y');
    }
  }, [menuState])

  const keyDownHandling = useCallback(
    (event: KeyboardEvent) => {
      if (event.code === 'Escape' && menuState) {
        setMenuState(false);
      }
      if (
        menuState &&
        event.code === 'Tab' &&
        event.target === lastTabEl &&
        !event.shiftKey
      ) {
        event.preventDefault();
        firstTabEl.focus();
      }
      if (
        menuState &&
        event.code === 'Tab' &&
        event.target === firstTabEl &&
        event.shiftKey
      ) {
        event.preventDefault();
        lastTabEl.focus();
      }
    },
    [menuState, firstTabEl, lastTabEl]
  );

  useEffect(() => {
    window.addEventListener('keydown', (event) => keyDownHandling(event));

    return () => {
      window.removeEventListener('keydown', (event) => keyDownHandling(event));
    };
  }, [keyDownHandling]);

  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const searchHandling = () => {
    setSearchModalOpen(!isSearchModalOpen);
  }

  return (
    <>
      <nav
        className={cx(
          { [cssMenuList]: true },
          { [cssShowPositionBottom(menuState)]: showStartPosition === 'bottom' },
          { [cssShowPositionLeft(menuState)]: showStartPosition === 'left' },
          { [cssShowPositionNone(menuState)]: showStartPosition === 'none' },
          { [cssShowPositionRight(menuState)]: showStartPosition === 'right' },
          { [cssShowPositionTop(menuState)]: showStartPosition === 'top' },
        )}
        role="dialog"
        aria-modal="true"
      >
        <div className={cssMenuListItems(menuState)}>
          <ul id="menulist-items">
            <li className={cssButtonGrid}>
              <InfiniteScrollSwitch />
              <span>자동 글 불러오기</span>
            </li>
            <li className={cssButtonGrid}>
              <DarkModeSwitch />
              <span>테마</span>
            </li>
            <li className={cssButtonGrid}>
              <Link
                href="/blogs"
              >
                <a
                  aria-label="blog list"
                  onClick={menuListHandling}
                >
                  <IconPaperWithSignalColored />
                </a>
              </Link>
              <span>블로그 목록</span>
            </li>
            <li className={cssButtonGrid}>
              <a
                href={config.copyrightHomepage}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JthCast"
              >
                <IconJthLogoColored />
              </a>
              <span>© {new Date().getFullYear()} {config.copyright}.</span>
            </li>
          </ul>
        </div>
        <div
          role="presentation"
          onClick={menuListHandling}
          className={cssBackdrop}
        />
      </nav>
      <SearchModal isOpen={isSearchModalOpen} openHandler={searchHandling} />
      <ScrollButton
        ariaLabel="검색"
        title="검색"
        onClick={searchHandling}
        showType="up"
        className={cssSearchButton}
      >
        <IconSearch />
      </ScrollButton>
      <ScrollButton
        id="scrollButton-menuList-menu"
        ariaLabel="메뉴"
        title="메뉴"
        onClick={menuListHandling}
        showType="up"
        className={cssMenuButton}
      >
        {menuState ? <IconTimes /> : <IconBars />}
      </ScrollButton>
    </>
  );
};

export default MenuList;

const cssMenuList = css`
  z-index: 2;
  width: 100%;
  position: fixed;
  top: 0;
  // background-color: $primaryBrandColor;
  background-color: ${globalCss.color.backgroundColorDownOpacity};
  backdrop-filter: blur(16px);
  font-size: 2rem;
  font-weight: ${globalCss.common.fontNormal};
  line-height: 200%;
  text-transform: uppercase;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: opacity 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  height: 100%;
  overflow-y: auto;

  a {
    color: ${globalCss.color.color};
    border-bottom: none;
  }
`;

const cssMenuListItems = (menuState: boolean) => css`
  margin: auto;

  ul {
    padding: 0;
    list-style: none;
    display: flex;
    align-items: center;
    flex-direction: column;
    transition: transform 830ms cubic-bezier(0.19, 1, 0.22, 1);
    transform: translateY(-15%);
    ${menuState && 'transform: translateY(0)'};

    li {
      margin-bottom: 1rem;

      &:nth-last-child(1) {
        margin-bottom: 0;
      }
    }
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    line-height: 160%;
  }
`;

const cssShowPositionBottom = (menuState: boolean) => css`
  transform: ${menuState ? 'translateY(0)' : 'translateY(100%)'};
`;

const cssShowPositionLeft = (menuState: boolean) => css`
  transform: ${menuState ? 'translateY(0)' : 'translateY(-100%)'};
`;

const cssShowPositionNone = (menuState: boolean) => css`
  opacity: ${menuState ? '1' : '0'};
  visibility: ${menuState ? 'visible' : 'hidden'};
`;

const cssShowPositionRight = (menuState: boolean) => css`
  transform: ${menuState ? 'translateX(0)' : 'translateX(100%)'};
`;

const cssShowPositionTop = (menuState: boolean) => css`
  transform: ${menuState ? 'translateY(0)' : 'translateY(-100%)'};
`;

const cssBackdrop = css`
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: -1;
`;

const cssSearchButton = css`
  position: fixed;
  right: 1.5rem;
  bottom: 6rem;
  z-index: 1;
`;

const cssMenuButton = css`
  position: fixed;
  right: 1.5rem;
  bottom: 1.5rem;
  z-index: 2;
`;

const cssButtonGrid = css`
  display: grid;
  font-size: 0.8rem;
  line-height: 2.5;
  align-items: center;
  justify-items: center;
  user-select: none;

  button {
    margin: auto;
  }

  a {
    line-height: 0;
    
    svg {
      font-size: 2rem;
    }
  }
`;