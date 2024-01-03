'use client'

import { SeparatorVariants } from '@/components/atom/Separator/separator.css'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react'
import * as styles from '@/components/atom/Separator/separator.css'

export const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root> & SeparatorVariants
>(({ orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={styles.separator({ orientation })}
    {...props}
  />
))

Separator.displayName = SeparatorPrimitive.Root.displayName
