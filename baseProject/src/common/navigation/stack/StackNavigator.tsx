import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { FancyFeaturePage } from 'features/fancy-feature/page/FancyFeaturePage';
import { AnotherFancyFeaturePage } from 'features/another-fancy-feature/page/AnotherFancyFeaturePage';

const Stack = createStackNavigator();

export const StackNavigator=()=> {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FancyFeature" component={FancyFeaturePage} />
      <Stack.Screen name="AnotherFancyFeature" component={AnotherFancyFeaturePage} />
    </Stack.Navigator>
  );
}