import * as Dialog from '@/components/atom/Dialog/Dialog'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Dialog.Root> = {
  title: 'Atom/Dialog',
  component: Dialog.Root,
  tags: ['autodocs'],
}

export default meta

export const Root: StoryObj<typeof Dialog.Root> = {
  render: (args) => (
    <Dialog.Root {...args}>
      <Dialog.Trigger asChild>
        <button>Open Dialog</button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>Title</Dialog.Title>
          <Dialog.Description>Description</Dialog.Description>
        </Dialog.Header>
        <Dialog.Footer>Footer</Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  ),
  args: {},
}
