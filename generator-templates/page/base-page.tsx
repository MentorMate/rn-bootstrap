import React from 'react';
import { View } from 'react-native';

interface {{name}}Props {
  testID?: string;
}

export enum TestID {
  {{name}}Wrapper = '{{name}}Wrapper'
}

export const {{name}}: React.FC<{{name}}Props> = ({ testID = TestID.{{name}}Wrapper }) => {
  return <View testID={{curlyBraces 'testID'}} />;
};
