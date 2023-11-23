import type { Meta, StoryObj } from '@storybook/react';

import { ExampleGluestackButton } from './Button';

// More on how to set up stories: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
  title: 'Example/Button',
  component: ExampleGluestackButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ExampleGluestackButton>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
  args: {
    action: 'primary',
    variant: 'solid',
    label: 'Button',
  },
};

export const Secondary: Story = {
  args: {
    action: 'secondary',
    variant: 'outline',
    label: 'Button',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    label: 'Button',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    label: 'Button',
  },
};
