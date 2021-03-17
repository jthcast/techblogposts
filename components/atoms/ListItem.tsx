import { useEffect, useRef } from 'react';

interface ListItemProps {
  children?: React.ReactElement;
  className?: string;
  isFocused?: boolean;
  onFocus?: () => void;
}

const ListItem = ({
  children,
  className,
  isFocused,
  onFocus,
}: ListItemProps): React.ReactElement => {
  const ref = useRef<HTMLLIElement>();

  useEffect(() => {
    if (isFocused) {
      ref.current.focus();
      onFocus();
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
