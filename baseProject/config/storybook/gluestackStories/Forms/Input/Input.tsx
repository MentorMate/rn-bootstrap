import React, { useState } from 'react';
import {
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Center,
  Button,
  ButtonText,
  Box,
  VStack,
  Text,
  Heading,
  Icon,
  SearchIcon,
  FormControl,
} from '@gluestack-ui/themed';

const InputBasic = ({ colorMode, ...props }: any) => {
  const [value, setValue] = React.useState('');

  let inputIconSize = '';
  switch (props.size) {
    case 'sm':
      inputIconSize = 'xs';
      break;
    case 'md':
      inputIconSize = 'sm';
      break;
    case 'lg':
      inputIconSize = 'lg';
      break;
    case 'xl':
      inputIconSize = 'xl';
      break;
  }

  return (
    <Input {...props}>
      <InputField
        onChange={(e: any) => {
          setValue(e.nativeEvent.text);
        }}
        value={value}
        placeholder="Enter Text here"
      />
      <InputSlot pr={props.variant === 'underlined' ? '$0' : '$4'}>
        <InputIcon as={SearchIcon} />
      </InputSlot>
    </Input>
  );
};

InputBasic.description = 'This is a basic Input component example. Inputs are used to capture data from users.';

export default InputBasic;

export {
  Input,
  InputField,
  InputIcon,
  Center,
  Button,
  ButtonText,
  Box,
  VStack,
  Text,
  Heading,
  useState,
  Icon,
  FormControl,
  InputSlot,
};
