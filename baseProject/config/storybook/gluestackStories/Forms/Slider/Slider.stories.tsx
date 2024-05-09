import type { Meta } from '@storybook/react';
import Slider from './Slider';

const SliderMeta: Meta<typeof Slider> = {
  title: 'FORMS/Slider',
  component: Slider,
  // metaInfo is required for figma generation
  // @ts-ignore
  metaInfo: {
    clusteringOrder: ['size'],
    componentDescription: `The Slider component enables an intuitive selection of values within a designated range. Users can easily adjust their selection by sliding a visual indicator along the track.`,
  },
  argTypes: {
    value: {
      control: { type: 'number', min: 1, max: 100 },
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isReversed: {
      control: 'boolean',
      figmaIgnore: true,
      options: [true, false],
    },
    isDisabled: {
      control: 'boolean',
      options: [true, false],
    },
    isFocused: {
      control: 'boolean',
      options: [true, false],
    },
  },
  args: {
    value: 30,
    size: 'md',
    isReversed: false,
    isHovered: false,
    isPressed: false,
    isFocused: false,
    isDisabled: false,
  },
};

export default SliderMeta;

export { Slider };
