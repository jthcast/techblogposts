import React, { ChangeEvent, useContext, useEffect, useRef, useState } from 'react';
import DarkModeSwitch from '../molecules/DarkModeSwitch';
import Icon from '../atoms/Icon';
import ScrollButton from '../molecules/ScrollButton';
import InfiniteScrollSwitch from '../molecules/InfiniteScrollSwitch';
import { css, cx } from '@emotion/css';
import globalCss from '../../styles/global-css';
import config from '../../config';
import Link from 'next/link';
import SearchModal from '../molecules/SearchModal';
import { LoginContext } from '../../context/LoginContext';
import { useRouter } from 'next/router';

interface MenuListProps {
  showStartPosition?: 'bottom' | 'left' | 'none' | 'right' | 'top';
}

const MenuList = ({
  showStartPosition = 'none',
}: MenuListProps): React.ReactElement => {
  const [loginInfo, setLogin] = useContext(LoginContext);
  const firstTabRef = useRef<HTMLButtonElement>();
  const firstTabEl = firstTabRef.current;
  const lastTabRef = useRef<HTMLButtonElement>();
  const lastTabEl = lastTabRef.current;
  const [menuState, setMenuState] = useState(false);
  const router = useRouter();
  const { copyrightHomepage, author, siteUrl, githubUrl} = config

  const menuListHandling = () => {
    setMenuState(!menuState);
    router.push('', undefined, { shallow: true });
  };

  useEffect(() => {
    if (menuState) {
      document.body.style.setProperty('overflow-y', 'hidden');
    } else {
      document.body.style.removeProperty('overflow-y');
    }
  }, [menuState]);

  const keyDownHandling = (event: KeyboardEvent) => {
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
  }

  useEffect(() => {
    if(menuState){
      window.addEventListener('keydown', keyDownHandling);
      window.addEventListener('popstate', menuListHandling);
      router.push('?menu', undefined, { shallow: true });
    }

    return () => {
      window.removeEventListener('keydown', keyDownHandling);
      window.removeEventListener('popstate', menuListHandling);
    };
  }, [menuState]);

  const [isSearchModalOpen, setSearchModalOpen] = useState(false);

  const searchHandling = () => {
    setSearchModalOpen(!isSearchModalOpen);
  };

  const inputEl = useRef<HTMLInputElement>();
  const [inputValue, setInputValue] = useState<string>('');

  const inputChangeHandling = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const inputClickHandling = () => { //This function is only for mobile Safari input keyboard when focused
    setSearchModalOpen(!isSearchModalOpen);
    const fakeInput = document.createElement('input');
    fakeInput.setAttribute('type', 'text');
    fakeInput.style.position = 'absolute';
    fakeInput.style.opacity = '0';
    fakeInput.style.height = '0';
    fakeInput.style.fontSize = '16px';
    document.body.prepend(fakeInput);
    fakeInput.focus();

    setTimeout(() => {
      inputEl.current.focus();
      fakeInput.remove();
    }, 0);
  };

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
          <ul className={cssTwoLineList} id="menulist-items">
            <li className={cssButtonGrid}>
              <InfiniteScrollSwitch ref={firstTabRef} />
              <span>자동 글 불러오기</span>
            </li>
            <li className={cssButtonGrid}>
              <DarkModeSwitch />
              <span>테마</span>
            </li>
            <li className={cssButtonGrid}>
              <Link
                href="/"
              >
                <a
                  aria-label="post list"
                  onClick={menuListHandling}
                >
                  <Icon iconName='paperWithLinesColored' />
                </a>
              </Link>
              <span>포스트 목록</span>
            </li>
            <li className={cssButtonGrid}>
              <Link
                href="/blogs"
              >
                <a
                  aria-label="blog list"
                  onClick={menuListHandling}
                >
                  <Icon iconName='paperWithSignalColored' />
                </a>
              </Link>
              <span>블로그 목록</span>
            </li>
            {loginInfo && (
              <>
                <li className={cssButtonGrid}>
                  <Link href="/bookmarks">
                    <a
                      aria-label="bookmark list"
                      onClick={menuListHandling}
                    >
                      <Icon iconName='starInTheBookColored' />
                    </a>
                  </Link>
                  <span>즐겨찾기</span>
                </li>
                <li className={cssButtonGrid}>
                  <Link href="/mypage">
                    <a
                      aria-label="mypage"
                      onClick={menuListHandling}
                    >
                      <Icon iconName='cogWithCardColored' />
                    </a>
                  </Link>
                  <span>계정 설정</span>
                </li>
              </>
            )}
          </ul>
          <ul className={cssFlexRowList}>
          <li className={cssIcon}>
              <a
                href={copyrightHomepage}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="JthCast"
              >
                <Icon iconName='logo' />
              </a>
            </li>
            <li className={cssIcon}>
              <a href={`mailto:${author.email}`} aria-label="mail">
                <Icon iconName='envelope' />
              </a>
            </li>
            <li className={cssIcon}>
              <a
                href={`${githubUrl}`}
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
        </div>
        <div
          role="presentation"
          onClick={menuListHandling}
          className={cssBackdrop}
        />
      </nav>
      <SearchModal isOpen={isSearchModalOpen} openHandler={searchHandling} inputEl={inputEl} valueState={[inputValue, setInputValue]}>
        <input type='text' ref={inputEl} className={cssInput} placeholder='검색' onChange={inputChangeHandling} value={inputValue} />
      </SearchModal>
      <ScrollButton
        ref={lastTabRef}
        ariaLabel="메뉴"
        title="메뉴"
        onClick={menuListHandling}
        showType="up"
        className={cssMenuButton}
      >
        {menuState ? <Icon iconName='times' /> : <Icon iconName='bars' />}
      </ScrollButton>
      <ScrollButton
        ariaLabel="검색"
        title="검색"
        onClick={inputClickHandling}
        showType="up"
        className={cssSearchButton}
      >
        <Icon iconName='search' />
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
  transform: translateY(-15%);
  ${menuState && 'transform: translateY(0)'};
  transition: transform 830ms cubic-bezier(0.19, 1, 0.22, 1);

  ul {
    padding: 0;
    list-style: none;
    align-items: center;
    margin-bottom: 3rem;
  }

  ul:nth-last-child(1) {
    margin-bottom: 0;
  }

  @media ${globalCss.breakpoint.mobileQuery} {
    line-height: 160%;
  }
`;

const cssTwoLineList = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
`;

const cssFlexRowList = css`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
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

const cssInput = css`
  background-color: transparent;
  color: ${globalCss.color.color};
  border: none;
  outline: none;
  width: 100%;

  &::placeholder{
    color: ${globalCss.color.borderColor};
  }
`;

const cssIcon = css`
  font-size: 1.5rem;

  @media ${globalCss.breakpoint.mobileQuery} {
    font-size: 2rem;
  }
`;