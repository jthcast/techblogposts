import { css, cx } from '@emotion/css';
import React, { forwardRef, LegacyRef, useCallback, useEffect, useRef, useState } from 'react';
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
  title?: string;
}

const ScrollButton = forwardRef(({
  ariaLabel,
  children,
  className,
  ghost = false,
  onClick,
  showType = 'notTop',
  tabIndex,
  id,
  title
}: ScrollButtonProps, ref: LegacyRef<HTMLButtonElement>): React.ReactElement => {
  const [scrollState, setScrollState] = useState(false);
  const [isTopState, setIsTopState] = useState(false);
  const prevScrollRef = useRef(0);
  const showTypeRef = useRef(showType);

  const scrollHandling = useCallback(() => {
    const scrollValue = document.querySelector('#__next').scrollTop;

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
    const root = document.querySelector('#__next');
    root.addEventListener('scroll', scrollHandling);

    return () => {
      root.removeEventListener('scroll', scrollHandling);
    };
  }, [scrollHandling]);

  return (
    <button
      ref={ref}
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
      title={title}
    >
      {children || null}
    </button>
  );
});

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
  transform: translateY(100%);
  visibility: hidden;
  border: none;
  cursor: pointer;

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