import { ExampleGluestackButton } from './Button';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Button',
  component: ExampleGluestackButton,
  argTypes: {
    onPress: { action: 'pressed the button' },
  },
  args: {
    label: 'Default',
    size: 'md',
    action: 'primary',
    isDisabled: false,
    isFocusVisible: false,
  },
} satisfies Meta<typeof ExampleGluestackButton>;

export default meta;

type Story = StoryObj<typeof meta>;

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