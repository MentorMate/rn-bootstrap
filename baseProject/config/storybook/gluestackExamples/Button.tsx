import React from 'react';
import { Button, ButtonText } from '@gluestack-ui/themed';

interface ExampleGluestackButtonProps {
  action?: 'primary' | 'secondary' | 'positive' | 'negative' | 'default';
  variant?: 'solid' | 'outline' | 'link';
  size?: 'sm' | 'md' | 'lg';
  label: string;
  onPress?: () => void;
}

export const ExampleGluestackButton = ({
  action,
  size = 'md',
  variant,
  label,
  onPress,
}: ExampleGluestackButtonProps) => {
  return (
    <Button action={action} variant={variant} size={size} onPress={onPress}>
      <ButtonText>{label}</ButtonText>
    </Button>
  );
};