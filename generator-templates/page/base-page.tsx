import React, { FunctionComponent } from 'react';
import { View } from 'react-native';

interface {{name}}Props {
  testID?: string;
}

export enum TestID {
  {{name}}Wrapper = '{{name}}Wrapper'
}

export const {{name}}: FunctionComponent<{{name}}Props> = ({ testID = TestID.{{name}}Wrapper }) => {
  return <View testID={{curlyBraces 'testID'}} />;
};
