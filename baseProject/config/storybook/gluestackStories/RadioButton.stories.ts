import { ExampleGluestackRadioButton } from './RadioButton';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'RadioButton',
  component: ExampleGluestackRadioButton,
  argTypes: {
    onPress: { action: 'radio button is selected!' },
  },
  args: {
    size: 'md',
    label: 'Label',
  },
} satisfies Meta<typeof ExampleGluestackRadioButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic = {};

export const Default: Story = {
  args: {
    value: 'change',
    label: 'Radio button',
  },
};

export const Large: Story = {
  args: {
    value: 'change',
    size: 'lg',
    label: 'Radio button',
  },
};

export const Small: Story = {
  args: {
    value: 'change',
    size: 'sm',
    label: 'Radio button',
  },
};
