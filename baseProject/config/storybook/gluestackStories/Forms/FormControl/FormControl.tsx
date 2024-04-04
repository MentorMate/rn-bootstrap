import React from 'react';
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Input,
  InputField,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Button,
  ButtonText,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Switch,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  VStack,
  Heading,
  Text,
  Center,
  Icon,
  CircleIcon,
  CheckIcon,
  AlertCircleIcon,
  ChevronDownIcon,
  InputSlot,
  InputIcon,
  StarIcon
} from '@gluestack-ui/themed';


const FormControlBasic = ({ colorMode, ...props }) => {
  let inputState = 'default';
  if (props.isInvalid) {
    inputState = 'isInvalid';
  } else if (props.isDisabled) {
    inputState = 'isDisabled';
  }
  return (
    <FormControl {...props}>
      <FormControlLabel mb="$2.5">
        <FormControlLabelText>Label</FormControlLabelText>
      </FormControlLabel>
      <Input>
        <InputSlot>
          {{#if hasIconToolkit}}
          <InputIcon as={StarIcon} ml="$4" color="$primary600" fill="$primary600" />
          {{/if}}
        </InputSlot>
        <InputField type="text" placeholder="Placeholder text" />
      </Input>
      <FormControlHelper>
        <FormControlHelperText>Must be atleast 6 characters.</FormControlHelperText>
      </FormControlHelper>
      <FormControlError>
        <FormControlErrorIcon as={AlertCircleIcon} />
        <FormControlErrorText>Atleast 6 characters are required.</FormControlErrorText>
      </FormControlError>
    </FormControl>
  );
};

FormControlBasic.description =
  'This is a basic FormControl component example.  A form control is a component that users can interact with to enter or select data.';

export default FormControlBasic;

export {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
  FormControlHelper,
  FormControlHelperText,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  Input,
  InputField,
  Button,
  ButtonText,
  Radio,
  RadioGroup,
  RadioIcon,
  RadioIndicator,
  RadioLabel,
  Checkbox,
  CheckboxGroup,
  CheckboxIndicator,
  CheckboxIcon,
  CheckboxLabel,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  Modal,
  ModalBackdrop,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  HStack,
  VStack,
  Heading,
  Text,
  Center,
  Icon,
  AlertCircleIcon,
  ChevronDownIcon,
  CircleIcon,
  CheckIcon,
  StarIcon
};
