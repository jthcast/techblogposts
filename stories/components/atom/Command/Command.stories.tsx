import * as Command from '@/components/atom/Command/Command'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Command.Root> = {
  title: 'Atom/Command',
  component: Command.Root,
  tags: ['autodocs'],
  render: (args) => (
    <Command.Root {...args}>
      <Command.Input />
      <Command.List>
        <Command.Loading />
        <Command.Empty />
        <Command.Group heading="heading">
          <Command.Item>Item</Command.Item>
        </Command.Group>
      </Command.List>
    </Command.Root>
  ),
}

export default meta

export const Default: StoryObj<typeof Command.Root> = {
  args: {},
}
