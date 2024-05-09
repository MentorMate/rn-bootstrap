import React from 'react';
import {
  Center,
  Text,
  CheckIcon,
  Icon,
  HStack,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Heading,
  VStack,
  RemoveIcon,
  FormControl,
} from '@gluestack-ui/themed';

const CheckboxGroupBasic = ({ ...props }: any) => {
  const [values, setValues] = React.useState(['Label 1']);

  return (
    <CheckboxGroup aria-label="Checkbox Group" value={values} onChange={setValues} nativeID="checkbox-group" gap="$3">
      <Checkbox
        isDisabled={props.isDisabled}
        isIndeterminate
        value="Label 1"
        aria-label="Label 1"
        onChange={(isSelected: boolean) => console.log(isSelected, '###')}
        nativeID="checkbox-1"
        gap={10}
      >
        <CheckboxIndicator>
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
        <CheckboxLabel>Label 1</CheckboxLabel>
      </Checkbox>
      <Checkbox
        isDisabled={props.isDisabled}
        aria-label="Label 2"
        value="Label 2"
        onChange={(isSelected: boolean) => console.log(isSelected, '###')}
        nativeID="checkbox-2"
        gap={10}
      >
        <CheckboxIndicator>
          <CheckboxIcon as={CheckIcon} />
        </CheckboxIndicator>
        <CheckboxLabel>Label 2</CheckboxLabel>
      </Checkbox>
    </CheckboxGroup>
  );
};

const FigmaCheckboxStory = ({ ...props }: any) => {
  return (
    <Checkbox {...props} nativeID="checkbox-1" gap="$2.5">
      <CheckboxIndicator>
        <CheckboxIcon as={CheckIcon} />
      </CheckboxIndicator>
      <CheckboxLabel>Label</CheckboxLabel>
    </Checkbox>
  );
};

CheckboxGroupBasic.description = 'This is a basic Checkbox component example';

export default CheckboxGroupBasic;

export {
  FigmaCheckboxStory,
  Center,
  Text,
  CheckIcon,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  VStack,
  Icon,
  HStack,
  RemoveIcon,
  Heading,
  FormControl,
};
