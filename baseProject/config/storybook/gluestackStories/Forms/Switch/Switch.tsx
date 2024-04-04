import React from 'react';
import { Switch, VStack, Text, HStack } from '@gluestack-ui/themed';

//TODO: disabled styles are not working properly if set from themes file due to gluestack-ui bug. 
//Change the styles from the component itself once the issue is fixed. 
const SwitchBasic = ({ ...props }: any) => {
  return (
    <HStack alignItems="center" space="md">
      <Text size="md" lineHeight="$lg" color="$primary800">
        Text
      </Text>
      <Switch
        defaultValue={true}
        value={props.isEnabled}
        isDisabled={props.isDisabled}
        {...props}
        ios_backgroundColor={props.isDisabled ? 'transparent' : '$primary400'}
        trackColor=\{{ false: '$primary300', true: props.isDisabled ? '$primary300' : '$primary600' }}
        thumbColor={props.isDisabled ? '$primary400' : '$white'}
        style=\{{
          activeThumbColor: props.isDisabled ? '$primary400' : '$white',
          shadowOpacity: 0,
        }}
      />
      <Text size="md" lineHeight="$lg" color="$primary800">
        Text
      </Text>
    </HStack>
  );
};

SwitchBasic.description = 'This is a basic Switch component example. Switches are used to toggle between two states.';

export default SwitchBasic;

export { Switch, VStack, Text, HStack };
