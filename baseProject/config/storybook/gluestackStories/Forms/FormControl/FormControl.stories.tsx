import type { Meta } from '@storybook/react';
import FormControl from './FormControl';

const FormControlMeta: Meta<typeof FormControl> = {
  title: 'FORMS/FormControl',
  component: FormControl,
  // metaInfo is required for figma generation
  // @ts-ignore
  metaInfo: {
    componentDescription: `By using FormControl, developers can provide important context to form elements. This context can include whether the element is invalid, disabled, or required.`,
  },
  argTypes: {
    isInvalid: {
      control: 'boolean',
      options: [true, false],
    },
    isDisabled: {
      control: 'boolean',
      options: [true, false],
    },
    isRequired: {
      control: 'boolean',
      options: [true, false],
    },
  },
  args: {
    isInvalid: true,
    isRequired: true,
    isDisabled: false,
  },
};

export default FormControlMeta;

export { FormControl };
