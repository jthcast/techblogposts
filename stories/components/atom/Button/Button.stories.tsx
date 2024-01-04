import { Button } from '@/components/atom/Button/Button'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Button> = {
  title: 'Atom/Button',
  component: Button,
  tags: ['autodocs'],
  render: (args) => <Button {...args} />,
}

export default meta

export const Default: StoryObj<typeof Button> = {
  args: {
    children: 'Button',
    isLoading: false,
    isOutline: false,
    color: 'primary',
    size: 'medium',
    shape: undefined,
    disabled: false,
  },
  argTypes: {
    color: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary'],
    },
  },
}
