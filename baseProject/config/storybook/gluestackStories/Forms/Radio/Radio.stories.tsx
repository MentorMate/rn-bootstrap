import type { Meta } from '@storybook/react';
import Radio from './Radio';

const RadioMeta: Meta<typeof Radio> = {
  title: 'FORMS/Radio',
  component: Radio,
  // metaInfo is required for figma generation
  // @ts-ignore
  metaInfo: {
    componentDescription: `The Radio component presents users with predefined choices and enables them to select only one option. It is commonly used for providing a single-choice selection in forms or surveys.`,
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['md'],
    },
    isInvalid: {
      type: 'boolean',
      options: [true, false],
    },
    isDisabled: {
      type: 'boolean',
      options: [true, false],
    },
    isHovered: {
      type: 'boolean',
      options: [true, false],
    },
    isFocusVisible: {
      type: 'boolean',
      options: [true, false],
    },
    isReadOnly: {
      type: 'boolean',
      figmaIgnore: true,
      options: [true, false],
    },
  },
  args: {
    size: 'md',
    isInvalid: false,
    isDisabled: false,
    isReadOnly: false,
    isHovered: false,
    isFocusVisible: false,
  },
};

export default RadioMeta;

export { Radio };
