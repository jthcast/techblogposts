import { css, cx } from '@emotion/css';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import globalCss from '../../styles/global-css';

interface ScrollButtonProps {
  ariaLabel?: string;
  children?: React.ReactElement;
  className?: string;
  ghost?: boolean;
  onClick?: () => void;
  showType?: 'notTop' | 'notTopAndUp' | 'up';
  tabIndex?: number;
  id?: string;
}

const ScrollButton = ({
  ariaLabel,
  children,
  className,
  ghost = false,
  onClick,
  showType = 'notTop',
  tabIndex,
  id,
}: ScrollButtonProps): React.ReactElement => {
  const [scrollState, setScrollState] = useState(false);
  const [isTopState, setIsTopState] = useState(false);
  const prevScrollRef = useRef(0);
  const showTypeRef = useRef(showType);

  const scrollHandling = useCallback(() => {
    const scrollValue = window.scrollY;

    if (scrollValue === 0) {
      setIsTopState(true);
    } else {
      setIsTopState(false);
    }
    if (showTypeRef.current === 'notTop') {
      if (scrollValue === 0) {
        setIsTopState(false);
      } else {
        setIsTopState(true);
      }
    } else if (showTypeRef.current === 'up') {
      if (prevScrollRef.current >= scrollValue) {
        setScrollState(true);
      } else {
        setScrollState(false);
      }
    } else if (showTypeRef.current === 'notTopAndUp') {
      if (scrollValue !== 0 && prevScrollRef.current >= scrollValue) {
        setScrollState(true);
      } else {
        setScrollState(false);
      }
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
    <button
      id={id}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      className={cx(
        { [cssScrollButton]: true },
        { [cssGhost]: ghost },
        { [cssShow]: scrollState },
        { [className]: true },
      )}
      onClick={onClick || undefined}
    >
      {children || null}
    </button>
  );
};

export default ScrollButton;

const cssScrollButton = css`
  height: 3.5rem;
  width: 3.5rem;
  background-color: ${globalCss.color.primaryBrandColor};
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: 0.2s ease;
  // transform: translateY(100%); //TODO causing bug
  visibility: hidden;
  border: none;

  svg {
    color: ${globalCss.color.white};
    font-size: 2.5rem;
    margin: 0 0.6rem 0 0.6rem;
  }
`;

const cssGhost = css`
  background-color: transparent;

  svg {
    color: ${globalCss.color.color};
  }
`;

const cssShow = css`
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
`;