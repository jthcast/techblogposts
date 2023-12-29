'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  forwardRef,
} from 'react'
import * as styles from '@/components/atom/Dialog/dialog.css'

export const Root = DialogPrimitive.Root

export const Trigger = DialogPrimitive.Trigger

const Portal = DialogPrimitive.Portal

export const Close = forwardRef<
  ElementRef<typeof DialogPrimitive.Close>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Close>
>(({ asChild = true, ...props }, ref) => (
  <DialogPrimitive.Close ref={ref} asChild={asChild} {...props} />
))

Close.displayName = DialogPrimitive.Overlay.displayName

const Overlay = forwardRef<
  ElementRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ ...props }, ref) => (
  <DialogPrimitive.Overlay ref={ref} className={styles.overlay} {...props} />
))

Overlay.displayName = DialogPrimitive.Overlay.displayName

export const Content = forwardRef<
  ElementRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ children, ...props }, ref) => (
  <Portal>
    <Overlay />
    <DialogPrimitive.Content ref={ref} className={styles.content} {...props}>
      {children}
    </DialogPrimitive.Content>
  </Portal>
))

Content.displayName = DialogPrimitive.Content.displayName

export const Header = ({ ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={styles.header} {...props} />
)

Header.displayName = 'DialogHeader'

export const Body = ({ ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={styles.body} {...props} />
)

Body.displayName = 'DialogBody'

export const Footer = ({ ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div className={styles.footer} {...props} />
)

Footer.displayName = 'DialogFooter'

export const Title = forwardRef<
  ElementRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ ...props }, ref) => (
  <DialogPrimitive.Title ref={ref} className={styles.title} {...props} />
))

Title.displayName = DialogPrimitive.Title.displayName

export const Description = forwardRef<
  ElementRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ ...props }, ref) => (
  <DialogPrimitive.Description
    ref={ref}
    className={styles.description}
    {...props}
  />
))

Description.displayName = DialogPrimitive.Description.displayName
