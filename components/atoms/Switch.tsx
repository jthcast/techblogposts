import React from 'react';
import { IconSpinner } from './Icons';

interface SwitchProps {
  ariaLabel?: string;
  checked?: boolean;
  checkedChildren?: string;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  onChange?: (event: React.FormEvent<HTMLButtonElement>) => void;
  onClick?: (event: React.FormEvent<HTMLButtonElement>) => void;
  tabIndex?: number;
  unCheckedChildren?: string;
}

const Switch = ({
  ariaLabel,
  checked = false,
  checkedChildren,
  className,
  disabled = false,
  loading = false,
  onChange,
  onClick,
  tabIndex,
  unCheckedChildren,
}: SwitchProps): React.ReactElement => {
  const onClickHandling = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (onClick) {
      onClick(event);
    }
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <button
      aria-checked={checked}
      aria-label={ariaLabel}
      className={`jth-switch${checked ? ' jth-switch-checked' : ``}${loading || disabled ? ' jth-switch-disabled' : ``
        }${className ? ` ${className}` : ``}`}
      disabled={loading || disabled || false}
      onChange={onClickHandling}
      onClick={onClickHandling}
      role="switch"
      tabIndex={tabIndex}
      type="button"
    >
      <div className="jth-switch-handle">{loading && <IconSpinner spin />}</div>
      <span className="jth-switch-inner">
        {unCheckedChildren && !checked && unCheckedChildren}
        {checkedChildren && checked && checkedChildren}
      </span>
    </button>
  );
};

export default Switch;
