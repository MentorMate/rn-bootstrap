import type { Meta } from '@storybook/react';
import Toast from './Toast';

const ToastMeta: Meta<typeof Toast> = {
  title: 'FEEDBACK/Toast',
  component: Toast,
  // metaInfo is required for figma generation
  // @ts-ignore
  metaInfo: {
    componentDescription: `Toast is a component that can display alerts, notifications, or messages on top of an overlay layer. It is commonly used to inform users of important information or actions.`,
  },
  argTypes: {
    placement: {
      control: 'select',
      figmaIgnore: true,
      options: ['top', 'bottom'],
    },
    action: {
      control: 'select',
      options: ['error', 'warning', 'success', 'info'],
    },
  },
  args: {
    placement: 'top',
    action: 'info',
  },
};

export default ToastMeta;

export { Toast };
