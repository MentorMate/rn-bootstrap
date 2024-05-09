import type { Meta } from '@storybook/react';
import Progress from './Progress';

const ProgressMeta: Meta<typeof Progress> = {
  title: 'FEEDBACK/Progress',
  component: Progress,
  // metaInfo is required for figma generation
  // @ts-ignore
  metaInfo: {
    componentDescription: `The Progress component is designed to display the progress of a task that involves multiple steps and takes some time to complete.`,
  },
  argTypes: {
    value: {
      type: 'number',
      defaultValue: '50',
    },
  },
  args: {
    value: 48,
  },
};

export default ProgressMeta;

export { Progress };
