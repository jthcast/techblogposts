import { useEffect, useState } from 'react';

interface ObserverProps {
  callback: (entry: IntersectionObserverEntry, observer: IntersectionObserver) => void;
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

const useObserver = ({
  callback,
  root,
  rootMargin,
  threshold = 0,
}: ObserverProps): React.Dispatch<React.SetStateAction<Element[] | undefined>> => {
  const [observerEntry, setObserverEntry] = useState<Array<Element>>();

  useEffect(() => {
    if (observerEntry) {
      const observerObj = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            callback(entry, observer);
          });
        },
        { root, rootMargin, threshold }
      );

      observerEntry.forEach((element: Element) => {
        observerObj.observe(element);
      });

      return () => observerObj.disconnect();
    }

    return () => null;
  }, [callback, observerEntry, root, rootMargin, threshold]);

  return setObserverEntry;
};

export default useObserver;
