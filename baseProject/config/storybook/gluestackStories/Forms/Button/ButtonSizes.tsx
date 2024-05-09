import React from 'react';
import { Button, ButtonText, ButtonIcon, VStack, ArrowLeftIcon, ArrowRightIcon } from '@gluestack-ui/themed';

const ButtonAllSizes = ({}) => {
  const sizes = ['sm', 'md', 'xl'];

  return (
    <VStack space="md" justifyContent="center" alignItems="center">
      {sizes.map((size: any) => {
        return (
          <Button mt="$4" size={size} key={size} gap="$2.5">
            <ButtonIcon as={ArrowLeftIcon} />
            <ButtonText>Button</ButtonText>
            <ButtonIcon as={ArrowRightIcon} />
          </Button>
        );
      })}
    </VStack>
  );
};

export default ButtonAllSizes;
