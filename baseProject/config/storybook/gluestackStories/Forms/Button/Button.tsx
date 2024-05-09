import React from 'react';
import {  Center } from '@gluestack-ui/themed';
import {
  Button,
  ButtonText,
  ButtonIcon,
  ButtonGroup,
  Icon,
  AddIcon,
  InfoIcon,
  ArrowUpIcon,
  Heading,
  Text,
  HStack,
  VStack,
  ThreeDotsIcon,
  Input,
  InputField,
  ArrowLeftIcon, 
  ArrowRightIcon
} from '@gluestack-ui/themed';

const ButtonBasic = ({ ...props }: any) => {
  return (
    <Button {...props} gap="$2.5">
      {{#if hasIconToolkit}}
      <ButtonIcon as={ArrowLeftIcon} />
      {{/if}}
      <ButtonText>Button</ButtonText>
      {{#if hasIconToolkit}} 
      <ButtonIcon as={ArrowRightIcon} />
      {{/if}}
    </Button>
  );
};

ButtonBasic.description =
  'This is a basic Button component example.  A button is a component that users can tap to trigger an action.';

export default ButtonBasic;

export {
  Button,
  ButtonText,
  ButtonIcon,
  ButtonGroup,
  Icon,
  AddIcon,
  InfoIcon,
  ArrowUpIcon,
  Heading,
  Text,
  HStack,
  VStack,
  ThreeDotsIcon,
  Input,
  InputField,
  Center,
  ArrowLeftIcon, 
  ArrowRightIcon
};
