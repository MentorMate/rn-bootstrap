import React from 'react';
import { Link, LinkText, Icon, HStack, Text, ArrowRightIcon, ArrowLeftIcon } from '@gluestack-ui/themed';

const LinkBasic = ({ ...props }: any) => {
  return (
    <Link href="https://mentormate.com" isExternal {...props}>
      <HStack gap="$2" alignItems="center">
        {{#if hasIconToolkit}}
        <Icon as={ArrowLeftIcon} color="$primary600" />
        {{/if}}
        <LinkText alignSelf="baseline">MentorMate</LinkText>
        {{#if hasIconToolkit}}
        <Icon as={ArrowRightIcon} color="$primary600" />
        {{/if}}
      </HStack>
    </Link>
  );
};

LinkBasic.description =
  'This is a basic Link component example.  A link is a component that users can tap to navigate to a new page.';

export default LinkBasic;

export { Link, LinkText, Icon, HStack, Text, ArrowRightIcon, ArrowLeftIcon };
