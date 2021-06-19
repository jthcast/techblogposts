import { css, cx } from '@emotion/css'
import globalCss from '../../styles/global-css'
import { ButtonHTMLAttributes, forwardRef, LegacyRef } from 'react'
import Icon from './Icon'

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  ariaLabel?: string
  children?: React.ReactElement | string
  className?: string
  danger?: boolean
  disabled?: boolean
  ghost?: boolean
  loading?: boolean
  formAction?: string
  formTarget?: string
  onClick?: (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ) => void | undefined
  tabIndex?: number
  type?: 'button' | 'submit' | 'reset'
}

const Button = forwardRef(
  (
    {
      ariaLabel,
      children,
      className,
      danger = false,
      disabled = false,
      ghost = false,
      formAction,
      loading = false,
      onClick,
      tabIndex,
      title,
      formTarget,
      type = 'button',
    }: ButtonProps,
    ref: LegacyRef<HTMLButtonElement>
  ): React.ReactElement => {
    return (
      <button
        aria-label={ariaLabel}
        className={cx(
          { [cssButton]: true },
          { [cssDanger]: danger },
          { [cssDisabled]: loading || disabled },
          { [cssGhost]: ghost },
          { [className]: !!className }
        )}
        disabled={loading || disabled || false}
        onClick={onClick}
        tabIndex={tabIndex}
        type={type}
        formTarget={formTarget}
        formAction={formAction}
        title={title}
        ref={ref}
      >
        {loading && <Icon className={cssSpinner} iconName="spinner" spin />}
        {children}
      </button>
    )
  }
)

export default Button

const cssButton = css`
  display: flex;
  align-items: center;
  cursor: pointer;
  background-color: ${globalCss.color.secondaryBrandColor};
  border: none;
  color: ${globalCss.color.white};
  padding: 0.25rem 0.75rem;
  border-radius: 0.25rem;
`

const cssDanger = css`
  background-color: ${globalCss.color.danger};
  color: ${globalCss.color.white};
`

const cssDisabled = css`
  cursor: not-allowed;
  opacity: 0.4;
`

const cssGhost = css`
  color: ${globalCss.color.color};
  background-color: transparent;
  border: 0.1rem solid ${globalCss.color.borderColor};
`

const cssSpinner = css`
  margin-right: 0.4rem;
`
