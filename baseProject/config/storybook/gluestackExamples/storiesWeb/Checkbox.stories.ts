import type { Meta, StoryObj } from '@storybook/react';

import { ExampleGluestackCheckbox } from './Checkbox';

// More on how to set up stories: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Checkbox',
  component: ExampleGluestackCheckbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExampleGluestackCheckbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Default: Story = {
  args: {
    value: 'change',
    label: 'Checkbox',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Checkbox',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Checkbox',
  },
};
