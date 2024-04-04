import type { Meta } from '@storybook/react';
import Input from './Input';

const InputMeta: Meta<typeof Input> = {
  title: 'FORMS/Input',
  component: Input,
  // metaInfo is required for figma generation
  // @ts-ignore
  metaInfo: {
    componentDescription: `The Input component is your go-to tool for gathering user input in a sleek and user-friendly text field. Whether you're designing a simple login form or a complex search feature, this component has got you covered.`,
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['outline', 'underlined', 'rounded'],
    },
    isInvalid: {
      control: 'boolean',
      options: [true, false],
    },
    isDisabled: {
      control: 'boolean',
      options: [true, false],
    },
  },
  args: {
    variant: 'outline',
    isInvalid: false,
    isDisabled: false,
  },
};

export default InputMeta;

export { Input };
