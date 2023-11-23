import { ExampleGluestackButton } from './Button';

const MyButtonMeta = {
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
};

export default MyButtonMeta;

export const Primary = {
  args: {
    action: 'primary',
    variant: 'solid',
    label: 'Button',
  },
};

export const Secondary = {
  args: {
    action: 'secondary',
    variant: 'outline',
    label: 'Button',
  },
};

export const Large = {
  args: {
    size: 'lg',
    label: 'Button',
  },
};

export const Small = {
  args: {
    size: 'sm',
    label: 'Button',
  },
};