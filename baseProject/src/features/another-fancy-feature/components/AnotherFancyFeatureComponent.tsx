import React from 'react';
import { Text } from 'react-native';

interface Props {
  timeNow: string;
}

export const AnotherFancyFeatureComponent: React.FC<Props> = ({ timeNow }) => {
  return (
    <>
      <Text>This is another fancy feature of your app.</Text>
      <Text>The time now is {timeNow}</Text>
    </>
  );
};
