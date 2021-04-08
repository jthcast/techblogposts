import { useEffect } from "react";

const useScrollToTop = (): null => {
  const scrollToTop = () => {
    const root = document.querySelector('#__next');
    root.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return null;
};

export default useScrollToTop;
