import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface {{name}}Props {
  testID?: string;
}

export enum TestID {
  {{name}}Wrapper = '{{name}}Wrapper',
  SomeText = 'SomeText'
}

export const {{name}}: React.FC<{{name}}Props> = ({ testID = TestID.{{name}}Wrapper }) => {
  return (
    <View testID={{curlyBraces 'testID'}} style={styles.componentWrapper}>
      <Text testID={TestID.SomeText}>Your {{name}}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  componentWrapper: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'green',
    borderStyle: 'solid'
  }
});
