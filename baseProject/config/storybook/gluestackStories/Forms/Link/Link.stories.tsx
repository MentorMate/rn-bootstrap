import type { Meta } from '@storybook/react';
import Link from './Link';

const LinkMeta: Meta<typeof Link> = {
  title: 'FORMS/Link',
  component: Link,
  // metaInfo is required for figma generation
  // @ts-ignore
  metaInfo: {
    componentDescription: `With links, users can navigate seamlessly throughout a website. This component has a hyperlinked appearance for a user-friendly experience.`,
  },
  argTypes: {
    isHovered: {
      control: 'boolean',
      options: [true, false],
    },
    isPressed: {
      control: 'boolean',
      options: [true, false],
    },
    isFocusVisible: {
      control: 'boolean',
      options: [true, false],
    },
    isDisabled: {
      control: 'boolean',
      options: [true, false],
    },
  },
  args: {
    isHovered: false,
    isPressed: false,
    isFocusVisible: false,
    isDisabled: false,
  },
};

export { Link };
export default LinkMeta;
