import React, { useCallback, useEffect, useRef, useState } from 'react';

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

    return () => null;
  }, [scrollHandling]);

  return (
    <button
      id={id}
      tabIndex={tabIndex}
      aria-label={ariaLabel}
      className={`jth-scrollButton${ghost ? ` jth-scrollButton-ghost` : ``}${scrollState ? ` jth-scrollButton-on` : ``
        }${isTopState ? ` jth-scrollButton-top` : ``}${className ? ` ${className}` : ``
        }`}
      onClick={onClick || undefined}
    >
      {children || null}
    </button>
  );
};

export default ScrollButton;
