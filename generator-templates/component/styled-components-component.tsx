import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';

interface {{componentName}}Props {}

export const {{componentName}}: React.FC<{{componentName}}Props> = () => {
  return (
    <{{componentName}}Wrapper>
      <Text>Your {{componentName}}</Text>
    </{{componentName}}Wrapper>
  );
};

const {{componentName}}Wrapper = styled.View`
  flex: 1;
  border: 1px solid green;
`;
