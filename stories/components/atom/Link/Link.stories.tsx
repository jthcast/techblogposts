import { Link } from '@/components/atom/Link/Link'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Link> = {
  title: 'Atom/Link',
  component: Link,
  tags: ['autodocs'],
  render: (args) => <Link {...args} />,
}

export default meta

export const Default: StoryObj<typeof Link> = {
  args: {
    children: 'Link',
    color: 'primary',
    href: 'https://techblogposts.com',
    isButton: false,
    isUnderline: false,
  },
  argTypes: {
    color: {
      control: { type: 'radio' },
      options: ['primary', 'secondary', 'tertiary', 'accentPrimary'],
    },
  },
}
