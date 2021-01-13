import React, { ButtonHTMLAttributes } from 'react';
import { IconSpinner } from './Icons';

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  ariaLabel?: string;
  block?: boolean;
  children?: React.ReactElement;
  className?: string;
  danger?: boolean;
  disabled?: boolean;
  ghost?: boolean;
  href?: string;
  formAction?: string;
  loading?: boolean;
  onClick?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void | undefined;
  shape?: 'circle' | 'round';
  tabIndex?: number;
  buttonType?: 'button' | 'a';
  formTarget?: string;
  lineType?: 'primary' | 'reverseBackground' | 'dashed' | 'none' | 'text';
  target?: '_blank' | '_self' | '_parent' | '_top';
}

const Button = ({
  ariaLabel,
  block = false,
  children,
  className,
  danger = false,
  disabled = false,
  ghost = false,
  href,
  formAction,
  loading = false,
  onClick,
  shape,
  tabIndex,
  buttonType = 'button',
  formTarget,
  lineType,
  target = '_blank',
}: ButtonProps): React.ReactElement => {
  return (
    <>
      {buttonType === 'button' ? (
        <button
          aria-label={ariaLabel}
          className={`jth-button${block ? ` jth-button-block` : ``}${lineType ? ` jth-button-line-${lineType}` : ``
            }${ghost ? ` jth-button-ghost` : ``}${danger ? ` jth-button-danger` : ``
            }${shape ? ` jth-button-${shape}` : ``}${loading || disabled ? ` jth-button-disabled` : ``
            }${className ? ` ${className}` : ``}`}
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
      ) : (
          <a
            aria-label={ariaLabel}
            className={`jth-button${block ? ` jth-button-block` : ``}${lineType ? ` jth-button-line-${lineType}` : ``
              }${ghost ? ` jth-button-ghost` : ``}${danger ? ` jth-button-danger` : ``
              }${shape ? ` jth-button-${shape}` : ``}${className ? ` ${className}` : ``
              }`}
            href={href}
            rel="noreferrer"
            target={target}
            onClick={onClick}
            tabIndex={tabIndex}
          >
            {children}
          </a>
        )}
    </>
  );
};

export default Button;
