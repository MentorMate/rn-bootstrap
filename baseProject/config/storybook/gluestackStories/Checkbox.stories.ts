import { ExampleGluestackCheckbox } from './Checkbox';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Checkbox',
  component: ExampleGluestackCheckbox,
  argTypes: {
    onPress: { action: 'checkbox is ticked!' },
  },
  args: {
    size: 'md',
    label: 'Default',
  },
} satisfies Meta<typeof ExampleGluestackCheckbox>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {};

export const Default: Story = {
  args: {
    value: 'change',
    label: 'Checkbox',
  },
};

export const Large: Story = {
  args: {
    value: 'change',
    size: 'lg',
    label: 'Checkbox',
  },
};

export const Small: Story = {
  args: {
    value: 'change',
    size: 'sm',
    label: 'Checkbox',
  },
};
