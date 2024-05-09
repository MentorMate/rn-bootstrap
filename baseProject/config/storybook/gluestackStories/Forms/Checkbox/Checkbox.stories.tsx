import type { Meta } from '@storybook/react';
import Checkbox from './Checkbox';

const CheckboxMeta: Meta<typeof Checkbox> = {
  title: 'FORMS/Checkbox',
  component: Checkbox,
  // metaInfo is required for figma generation
  // @ts-ignore
  metaInfo: {
    componentDescription: `Whether you're building a simple form or a complex data collection system, the Checkbox component offers a user-friendly way for users to select multiple options from a list.`,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['md'],
    },
    isChecked: {
      type: 'boolean',
      options: [true, false],
    },
    isDisabled: {
      type: 'boolean',
      options: [true, false],
    },
  },
  args: {
    size: 'md',
    isDisabled: false,
    isChecked: false,
  },
};

export default CheckboxMeta;
export { Checkbox };
