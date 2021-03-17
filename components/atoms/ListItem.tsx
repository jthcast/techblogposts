import { useEffect, useRef } from 'react';
import useObserver from '../../customHooks/useObserver';

interface ListItemProps {
  children?: React.ReactElement;
  className?: string;
  isFocused?: boolean;
  movePosition?: string;
  onFocus?: () => void;
}

const ListItem = ({
  children,
  className,
  isFocused,
  movePosition,
  onFocus,
}: ListItemProps): React.ReactElement => {
  const ref = useRef<HTMLLIElement>();
  const observer = useObserver({
    callback: (entry) => {
      if (isFocused && !entry.isIntersecting) {
        if (movePosition === 'ArrowDown') {
          ref.current.scrollIntoView(false);
        } else if (movePosition === 'ArrowUp') {
          ref.current.scrollIntoView(true);
        }
      }
    }, threshold: 1
  });

  useEffect(() => {
    if (ref.current) {
      observer([ref.current]);
    }
  }, [ref.current]);

  useEffect(() => {
    if (isFocused) {
      ref.current.focus({ preventScroll: true });
      if (onFocus) {
        onFocus();
      }
    }
  }, [isFocused]);

  return (
    <li
      tabIndex={0}
      ref={ref}
      className={className}
    >
      {children}
    </li>
  );
};

export default ListItem;
