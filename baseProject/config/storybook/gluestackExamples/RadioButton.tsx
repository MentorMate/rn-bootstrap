import React from 'react';
import { CircleIcon, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel } from '@gluestack-ui/themed';

interface ExampleGluestackRadioButtonProps {
  value: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ExampleGluestackRadioButton = ({ value, size }: ExampleGluestackRadioButtonProps) => {
  return (
    <RadioGroup>
      <Radio value={value} size={size}>
        <RadioIndicator mr="$2">
          <RadioIcon as={CircleIcon} strokeWidth={1} />
        </RadioIndicator>
        <RadioLabel>Label</RadioLabel>
      </Radio>
    </RadioGroup>
  );
};
