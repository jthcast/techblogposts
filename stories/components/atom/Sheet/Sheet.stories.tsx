import * as Sheet from '@/components/atom/Sheet/Sheet'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Sheet.Root> = {
  title: 'Atom/Sheet',
  component: Sheet.Root,
  tags: ['autodocs'],
  render: (args) => (
    <Sheet.Root {...args}>
      <Sheet.Trigger asChild>
        <button>Trigger</button>
      </Sheet.Trigger>
      <Sheet.Content>
        <Sheet.Header>
          <Sheet.Title>Title</Sheet.Title>
        </Sheet.Header>
        <Sheet.Footer>Footer</Sheet.Footer>
      </Sheet.Content>
    </Sheet.Root>
  ),
}

export default meta

export const Default: StoryObj<typeof Sheet.Root> = {
  args: {},
}
