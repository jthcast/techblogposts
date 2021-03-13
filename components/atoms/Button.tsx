import { css, cx } from '@emotion/css';
import globalCss from '../../styles/global-css';
import { ButtonHTMLAttributes } from 'react';
import { IconSpinner } from './Icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  ariaLabel?: string;
  children?: React.ReactElement;
  className?: string;
  danger?: boolean;
  disabled?: boolean;
  loading?: boolean;
  formAction?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  onClick?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void | undefined;
  tabIndex?: number;
}

const Button = ({
  ariaLabel,
  children,
  className,
  danger = false,
  disabled = false,
  formAction,
  loading = false,
  onClick,
  tabIndex,
  formTarget,
  target = '_blank',
}: ButtonProps): React.ReactElement => {
  return (
    <button
      aria-label={ariaLabel}
      className={cx(
        { [cssButton]: true },
        { [cssDanger]: danger },
        { [cssDisabled]: loading || disabled },
        { [className]: true }
      )}
      disabled={loading || disabled || false}
      onClick={onClick}
      tabIndex={tabIndex}
      type="button"
      formTarget={formTarget}
      formAction={formAction}
    >
      {loading && <IconSpinner spin className="loading" />}
      {children}
    </button>
  );
};

export default Button;

const cssButton = css`
padding: 0.5rem;
margin: 0;
background-color: transparent;
color: ${globalCss.color.color};
border: 0.063rem solid ${globalCss.color.borderColor};
border-radius: 0.125rem;
cursor: pointer;
transition: all 0.2s;
font-weight: normal;

&:hover {
  opacity: 0.8;
  border: 0.063rem solid ${globalCss.color.secondaryBrandColor};
  color: ${globalCss.color.secondaryBrandColor};
}

&:focus {
  opacity: 0.8;
  border: 0.063rem solid ${globalCss.color.secondaryBrandColor};
  color: ${globalCss.color.secondaryBrandColor};
}

&:active {
  border: 0.063rem solid ${globalCss.color.secondaryBrandColor};
  color: ${globalCss.color.secondaryBrandColor};
}

&:before {
  content: none;
}
`;

const cssDanger = css`
border: 0.063rem solid ${globalCss.color.danger};
color: ${globalCss.color.danger};

&:hover {
  color: ${globalCss.color.danger};
}

&:focus {
  color: ${globalCss.color.danger};
}

&:active {
  border: 0.063rem solid ${globalCss.color.danger};
  color: ${globalCss.color.danger};
}
`;

const cssDisabled = css`
cursor: not-allowed;
opacity: 0.4;
`;