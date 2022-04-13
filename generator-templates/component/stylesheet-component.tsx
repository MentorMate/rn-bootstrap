import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface {{componentName}}Props {}

export const {{componentName}}: React.FC<{{componentName}}Props> = () => {
  return (
    <View style={styles.componentWrapper}>
      <Text>Your {{componentName}}</Text>
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
