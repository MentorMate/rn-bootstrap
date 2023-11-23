import React from 'react';
import { Button, ButtonText } from '@gluestack-ui/themed';

interface ExampleGluestackButtonProps {
  action?: 'primary' | 'secondary' | 'positive' | 'negative' | 'default';
  variant?: 'solid' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
  label: string;
  isFocusVisible?: boolean;
  isDisabled?: boolean;
  onPress?: () => void;
}

export const ExampleGluestackButton = ({
  action,
  size = 'md',
  variant,
  label,
  isDisabled,
  isFocusVisible,
  onPress,
}: ExampleGluestackButtonProps) => {
  return (
    <Button
      action={action}
      variant={variant}
      size={size}
      onPress={onPress}
      isDisabled={isDisabled}
      isFocusVisible={isFocusVisible}
    >
      <ButtonText>{label}</ButtonText>
    </Button>
  );
};
