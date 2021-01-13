import React, { useCallback, useEffect, useRef, useState } from 'react';
import HeaderMessage from '../atoms/HeaderMessage';
import { IconLogoColored } from '../atoms/Icons';
import DarkModeSwitch from '../molecules/DarkModeSwitch';
import InfiniteScrollSwitch from '../molecules/InfiniteScrollSwitch';

interface HeaderProps {
  className?: string;
  ghost?: boolean;
  showType?: 'fixed' | 'top' | 'sticky' | 'up';
  subTitle?: string;
  title?: string;
}

const Header = ({
  className,
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
        className={`jth-header-container${showTypeRef.current === 'sticky' ? ' jth-header-sticky' : ``
          }${showTypeRef.current === 'fixed' ? ' jth-header-fixed' : ``}${hideRef.current ? ' jth-header-hide' : ``
          }${scrollState ? ` jth-header-show` : ``}${ghost ? ' jth-header-ghost' : ``
          }${className ? ` ${className}` : ``}`}
      >
        {/* <div className="jth-header-mobile">
          <Link to="/" aria-label="home">
            <IconLogo />
          </Link>
        </div> */}
        <nav className="jth-header-items">
          {title || subTitle ? (
            <ul className="jth-header-items-left">
              <li>
                <span className="jth-header-title">
                  <IconLogoColored />
                  {title}
                </span>
                <span className="jth-header-subTitle">{subTitle}</span>
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
          <ul className="jth-header-items-right">
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
