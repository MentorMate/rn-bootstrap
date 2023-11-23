import React from 'react';
import { Checkbox, CheckboxIndicator, CheckboxIcon, CheckIcon, CheckboxLabel } from '@gluestack-ui/themed';

interface ExampleGluestackCheckboxProps {
  value: string;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  isInvalid?: boolean;
  isDisabled?: boolean;
}

export const ExampleGluestackCheckbox = ({
  value,
  size,
  label = '',
  isInvalid,
  isDisabled,
}: ExampleGluestackCheckboxProps) => {
  return (
    <Checkbox value={value} size={size} isInvalid={isInvalid} isDisabled={isDisabled} aria-label={label}>
      <CheckboxIndicator mr="$2">
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
      <CheckboxLabel>{label}</CheckboxLabel>
    </Checkbox>
  );
};