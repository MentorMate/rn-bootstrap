import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

interface {{name}}Props {}

export const {{name}}: React.FC<{{name}}Props> = () => {
  return (
    <{{name}}Wrapper>
      <Text>Your {{name}}</Text>
    </{{name}}Wrapper>
  );
};

const {{name}}Wrapper = styled.View`
  flex: 1;
  border: 1px solid green;
`;
