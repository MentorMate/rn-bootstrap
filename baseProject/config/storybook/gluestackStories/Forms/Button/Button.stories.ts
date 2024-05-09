import type { Meta } from '@storybook/react';
import Button from './Button';
import ButtonSizesExample from './ButtonSizes';
import ButtonStylesExample from './ButtonStyles';
import ButtonWithIconsTemp from './ButtonWithIcon';

const ButtonMeta: Meta<typeof Button> = {
  title: 'FORMS/Button',
  component: Button,
  // metaInfo is required for figma generation
  // @ts-ignore
  metaInfo: {
    componentDescription: `A button component is a graphical user interface element that enables users to act by clicking or tapping.`,
  },
  args: {
    action: 'primary',
    variant: 'solid',
    size: 'md',
    isPressed: false,
    isDisabled: false,
  },
  argTypes: {
    action: {
      control: 'select',
      options: ['primary', 'secondary', 'positive', 'negative'],
    },
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'link'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'xl'],
    },
    isPressed: {
      control: 'boolean',
      options: [true, false],
    },
    isDisabled: {
      control: 'boolean',
      options: [true, false],
    },
  },
};

export default ButtonMeta;

export { Button, ButtonSizesExample, ButtonStylesExample, ButtonWithIconsTemp };
