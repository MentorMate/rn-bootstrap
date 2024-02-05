import React from 'react';
import { CircleIcon, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from '@gluestack-ui/themed';

interface ExampleGluestackRadioButtonProps {
  value: string;
  size?: 'sm' | 'md' | 'lg';
  isInvalid?: boolean;
  isDisabled?: boolean;
  label: string;
  onPress?: () => void;
}

export const ExampleGluestackRadioButton = ({
  value,
  size,
  isInvalid,
  isDisabled,
  label,
  onPress,
}: ExampleGluestackRadioButtonProps) => {
  return (
    <RadioGroup>
      <Radio value={value} size={size} isDisabled={isDisabled} isInvalid={isInvalid} onPress={onPress}>
        <RadioIndicator mr="$2">
          <RadioIcon as={CircleIcon} />
        </RadioIndicator>
        <RadioLabel>{label}</RadioLabel>
      </Radio>
    </RadioGroup>
  );
};
