import React from 'react';
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon, CheckboxLabel } from '@gluestack-ui/themed';

interface ExampleGluestackCheckboxProps {
  value: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
}

export const ExampleGluestackCheckbox = ({ value, size, label }: ExampleGluestackCheckboxProps) => {
  return (
    <Checkbox value={value} size={size}>
      <CheckboxIndicator mr="$2">
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
      <CheckboxLabel>{label}</CheckboxLabel>
    </Checkbox>
  );
};
