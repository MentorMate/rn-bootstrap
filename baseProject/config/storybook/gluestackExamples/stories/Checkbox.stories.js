import { ExampleGluestackCheckbox } from './Checkbox';

const MyCheckboxMeta = {
  title: 'Checkbox',
  component: ExampleGluestackCheckbox,
  args: {
    isInvalide: false,
    isDisabled: false,
    size: 'md',
    label: 'Default',
  },
};

export default MyCheckboxMeta;

export const Basic = {};

export const Default = {
  args: {
    value: 'change',
    label: 'Checkbox',
  },
};

export const Large = {
  args: {
    size: 'lg',
    label: 'Checkbox',
  },
};

export const Small = {
  args: {
    size: 'sm',
    label: 'Checkbox',
  },
};