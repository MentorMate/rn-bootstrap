import type { Meta } from '@storybook/react';
import Switch from './Switch';

const SwitchMeta: Meta<typeof Switch> = {
  title: 'FORMS/Switch',
  component: Switch,
  // metaInfo is required for figma generation
  // @ts-ignore
  metaInfo: {
    componentDescription: `The Switch component offers a stylish alternative to the Checkbox, allowing users to enable or disable an option with a sleek sliding motion.`,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['md'],
    },
    isDisabled: {
      control: 'boolean',
      options: [true, false],
    },
    isEnabled: {
      control: 'boolean',
      options: [true, false],
    },
    isInvalid: {
      control: 'boolean',
      options: [true, false],
    },
  },
  args: {
    size: 'md',
    isDisabled: false,
    isEnabled: false,
    isInvalid: false,
  },
};

export default SwitchMeta;

export { Switch };
