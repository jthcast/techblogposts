import { css, cx } from '@emotion/css';
import globalCss from '../../styles/global-css';
import React, { ReactElement } from 'react';
import { IconSpinner } from './Icons';

interface SwitchProps {
  ariaLabel?: string;
  checked?: boolean;
  checkedChildren?: string;
  children?: ReactElement;
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
  children,
  disabled = false,
  className,
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
      className={cx(
        { [cssSwitch]: true },
        { [cssSwitchChecked]: checked },
        { [cssSwitchDisabled]: loading || disabled },
        { [className]: true }
      )}
      disabled={loading || disabled || false}
      onChange={onClickHandling}
      onClick={onClickHandling}
      role="switch"
      tabIndex={tabIndex}
      type="button"
    >
      <span className={cssSwitchInner}>
        {loading && <IconSpinner spin />}
        {!loading && unCheckedChildren && !checked && unCheckedChildren}
        {!loading && checkedChildren && checked && checkedChildren}
        {children}
      </span>
    </button>
  );
};

export default Switch;

const cssSwitch = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0.25rem;
  list-style: none;
  min-width: 2.5rem;
  min-height: 2.5rem;
  line-height: 1rem;
  vertical-align: middle;
  background-color: ${globalCss.color.borderColor};
  border: 0;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;
  user-select: none;
`;

const cssSwitchChecked = css`
  background-color: ${globalCss.color.primaryBrandColor};
`;

const cssSwitchDisabled = css`
  cursor: not-allowed;
  opacity: .4;
`;

const cssSwitchInner = css`
  color: ${globalCss.color.white};
  font-size: 1rem;
`;