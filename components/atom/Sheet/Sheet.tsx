'use client'

import { SheetVariants } from '@/components/atom/Sheet/sheet.css'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  forwardRef,
} from 'react'
import * as styles from '@/components/atom/Sheet/sheet.css'

export const Root = SheetPrimitive.Root

export const Trigger = SheetPrimitive.Trigger

export const Close = SheetPrimitive.Close

export const Portal = SheetPrimitive.Portal

export const Overlay = forwardRef<
  ElementRef<typeof SheetPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ ...props }, ref) => (
  <SheetPrimitive.Overlay ref={ref} className={styles.overlay} {...props} />
))

Overlay.displayName = SheetPrimitive.Overlay.displayName

type SheetContentProps = ComponentPropsWithoutRef<typeof SheetPrimitive.Content>

export const Content = forwardRef<
  ElementRef<typeof SheetPrimitive.Content>,
  SheetContentProps & SheetVariants
>(({ side = 'left', children, ...props }, ref) => (
  <Portal>
    <Overlay />
    <SheetPrimitive.Content
      ref={ref}
      className={styles.content({ side })}
      {...props}
    >
      {children}
    </SheetPrimitive.Content>
  </Portal>
))

Content.displayName = SheetPrimitive.Content.displayName

export const Header = ({ ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={styles.header} {...props} />
)

Header.displayName = 'SheetHeader'

export const Footer = ({ ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={styles.footer} {...props} />
)

Footer.displayName = 'SheetFooter'

export const Title = forwardRef<
  ElementRef<typeof SheetPrimitive.Title>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={styles.title} {...props} />
))

Title.displayName = SheetPrimitive.Title.displayName

export const Description = forwardRef<
  ElementRef<typeof SheetPrimitive.Description>,
  ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ ...props }, ref) => (
  <SheetPrimitive.Description
    ref={ref}
    className={styles.description}
    {...props}
  />
))

Description.displayName = SheetPrimitive.Description.displayName
