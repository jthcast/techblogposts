import * as Separator from '@/components/atom/Separator/Separator'
import * as styles from '@/stories/components/atom/Separator/separator.css'
import type { Meta, StoryObj } from '@storybook/react'

const meta: Meta<typeof Separator.Separator> = {
  title: 'Atom/Separator',
  component: Separator.Separator,
  tags: ['autodocs'],
  render: (args) => (
    <div className={styles.wrapper}>
      <Separator.Separator {...args} />
    </div>
  ),
}

export default meta

export const Default: StoryObj<typeof Separator.Separator> = {
  args: {
    orientation: 'horizontal',
  },
  argTypes: {
    orientation: {
      control: { type: 'radio' },
      options: ['horizontal', 'vertical'],
    },
  },
}
