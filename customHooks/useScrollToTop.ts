import { useEffect } from "react";

const useScrollToTop = (): null => {
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return null;
};

export default useScrollToTop;
