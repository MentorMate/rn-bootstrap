import React from 'react';
import { Text } from 'react-native';
import { TimeNow } from 'features/another-fancy-feature/model/TimeNow';

interface Props extends TimeNow {}

export const AnotherFancyFeatureComponent: React.FC<Props> = ({ timeNow }) => {
  return (
    <>
      <Text>This is another fancy feature of your app.</Text>
      <Text>The time now is {timeNow}</Text>
    </>
  );
};
