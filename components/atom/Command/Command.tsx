'use client'

import { Command as CommandPrimitive } from 'cmdk'
import {
  ComponentPropsWithoutRef,
  ElementRef,
  HTMLAttributes,
  forwardRef,
} from 'react'
import * as styles from '@/components/atom/Command/command.css'

export const Root = forwardRef<
  ElementRef<typeof CommandPrimitive>,
  ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ ...props }, ref) => (
  <CommandPrimitive ref={ref} className={styles.root} {...props} />
))

Root.displayName = CommandPrimitive.displayName

export const Input = forwardRef<
  ElementRef<typeof CommandPrimitive.Input>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ ...props }, ref) => (
  <div className={styles.inputWrapper}>
    <CommandPrimitive.Input ref={ref} className={styles.input} {...props} />
  </div>
))

Input.displayName = CommandPrimitive.Input.displayName

export const List = forwardRef<
  ElementRef<typeof CommandPrimitive.List>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ ...props }, ref) => (
  <CommandPrimitive.List ref={ref} className={styles.list} {...props} />
))

List.displayName = CommandPrimitive.List.displayName

export const Empty = forwardRef<
  ElementRef<typeof CommandPrimitive.Empty>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty ref={ref} className={styles.empty} {...props} />
))

Empty.displayName = CommandPrimitive.Empty.displayName

export const PureEmpty = ({ ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={styles.empty} {...props} />
}

PureEmpty.displayName = 'CommandPureEmpty'

export const Group = forwardRef<
  ElementRef<typeof CommandPrimitive.Group>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ ...props }, ref) => (
  <CommandPrimitive.Group ref={ref} className={styles.group} {...props} />
))

Group.displayName = CommandPrimitive.Group.displayName

export const Separator = forwardRef<
  ElementRef<typeof CommandPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ ...props }, ref) => (
  <CommandPrimitive.Separator
    ref={ref}
    className={styles.separator}
    {...props}
  />
))

Separator.displayName = CommandPrimitive.Separator.displayName

export const Item = forwardRef<
  ElementRef<typeof CommandPrimitive.Item>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ ...props }, ref) => (
  <CommandPrimitive.Item ref={ref} className={styles.item} {...props} />
))

Item.displayName = CommandPrimitive.Item.displayName

export const Shortcut = ({ ...props }: HTMLAttributes<HTMLSpanElement>) => {
  return <span className={styles.shortcut} {...props} />
}

Shortcut.displayName = 'CommandShortcut'

export const Loading = forwardRef<
  ElementRef<typeof CommandPrimitive.Loading>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Loading>
>(({ ...props }, ref) => <CommandPrimitive.Loading ref={ref} {...props} />)

Loading.displayName = CommandPrimitive.Loading.displayName
