import { ExampleGluestackRadioButton } from './RadioButton';

const MyRadioButtonMeta = {
  title: 'RadioButton',
  component: ExampleGluestackRadioButton,
  argTypes: {
    value: 'change',
  },
  args: {
    isInvalid: false,
    isDisabled: false,
    size: 'md',
    label: 'Label',
  },
};

export default MyRadioButtonMeta;

export const Basic = {};

export const Default = {
  args: {
    value: 'change',
    label: 'Radio button'
  },
};

export const Large = {
  args: {
    size: 'lg',
    label: 'Radio button'
  },
};

export const Small = {
  args: {
    size: 'sm',
    label: 'Radio button'
  },
};
