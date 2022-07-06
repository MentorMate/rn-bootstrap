import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

interface {{name}}Props {
  testID?: string;
}

export enum TestID {
  {{name}}Wrapper = '{{name}}Wrapper',
  SomeText = 'SomeText'
}

export const {{name}}: React.FC<{{name}}Props> = ({ testID = TestID.{{name}}Wrapper }) => {
  return (
    <{{name}}Wrapper testID={{curlyBraces 'testID'}}>
      <Text testID={TestID.SomeText}>Your {{name}}</Text>
    </{{name}}Wrapper>
  );
};

const {{name}}Wrapper = styled.View`
  flex: 1;
  border: 1px solid green;
`;
