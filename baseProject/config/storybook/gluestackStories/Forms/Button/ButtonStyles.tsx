import React from 'react';
import { Button, ButtonText, VStack } from '@gluestack-ui/themed';

const ButtonAllVariants = ({}) => {
  const variants = ['solid', 'outline', 'link'];
  return (
    <VStack space="md">
      {variants.map((variant: string) => {
        return (
          <Button variant={variant} mt="$4" key={variant}>
            <ButtonText>{variant}</ButtonText>
          </Button>
        );
      })}
    </VStack>
  );
};

export default ButtonAllVariants;
