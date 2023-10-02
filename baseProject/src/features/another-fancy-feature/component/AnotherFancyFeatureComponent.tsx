import React, { FunctionComponent } from 'react';
import { Text } from 'react-native';
import { TimeNow } from '../model/TimeNow';

interface Props extends TimeNow {}

export const AnotherFancyFeatureComponent: FunctionComponent<Props> = ({ timeNow }) => {
  return (
    <>
      <Text>This is another fancy feature of your app.</Text>
      <Text>The time now is {timeNow}</Text>
    </>
  );
};
