import type { Meta, StoryObj } from '@storybook/react';

import { ExampleGluestackRadioButton } from './RadioButton';

// More on how to set up stories: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/RadioButton',
  component: ExampleGluestackRadioButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExampleGluestackRadioButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    value: 'change',
    label: 'Radio button'
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Radio button'
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Radio button'
  },
};
