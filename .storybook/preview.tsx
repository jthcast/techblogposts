import React from 'react'
import type { Preview } from '@storybook/react'
import ThemeProvider from '../providers/ThemeProvider/ThemeProvider'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      sort: 'requiredFirst',
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: 'centered',
  },
  decorators: [
    (Story) => (
      <>
        <ThemeProvider />
        <Story />
      </>
    ),
  ],
}

export default preview
