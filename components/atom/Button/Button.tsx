import { ButtonVariants } from '@/components/atom/Button/button.css'
import { ButtonHTMLAttributes, forwardRef } from 'react'
import * as styles from '@/components/atom/Button/button.css'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
}

export const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps & ButtonVariants
>(
  (
    {
      isLoading,
      disabled,
      children,
      color,
      size,
      shape,
      isOutline,
      isFill,
      isGhost,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        disabled={isLoading || disabled}
        ref={ref}
        className={styles.button({
          color,
          size,
          shape,
          isOutline,
          isFill,
          isGhost,
        })}
        {...props}
      >
        {/* {isLoading && <Loader2Icon className={loaderIconCSS} />} TODO */}
        {children}
      </button>
    )
  },
)

Button.displayName = 'Button'
