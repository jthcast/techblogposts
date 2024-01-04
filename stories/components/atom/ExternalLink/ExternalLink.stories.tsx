import { ExternalLink } from '@/components/atom/ExternalLink/ExternalLink'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof ExternalLink> = {
  title: 'Atom/ExternalLink',
  component: ExternalLink,
  tags: ['autodocs'],
  render: (args) => <ExternalLink {...args} />,
}

export default meta

export const Default: StoryObj<typeof ExternalLink> = {
  args: {
    children: 'ExternalLink',
    href: 'https://techblogposts.com',
  },
}
