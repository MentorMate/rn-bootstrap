import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface {{name}}Props {}

export const {{name}}: React.FC<{{name}}Props> = () => {
  return (
    <View style={styles.componentWrapper}>
      <Text>Your {{name}}</Text>
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
