import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import { FancyFeaturePage } from 'features/fancy-feature/page/FancyFeaturePage';
import { AnotherFancyFeaturePage } from 'features/another-fancy-feature/page/AnotherFancyFeaturePage';
import { ScreenName } from 'common/navigation/ScreenName';
import { StackNavigationType } from 'common/navigation/type';
import { HeaderBackButton } from '@react-navigation/elements';

const Stack = createStackNavigator<StackNavigationType>();
const backButtonOption: StackNavigationOptions = {
  headerLeft: HeaderBackButton
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={ScreenName.FancyFeature} component={FancyFeaturePage} />
      <Stack.Screen
        options={backButtonOption}
        name={ScreenName.AnotherFancyFeature}
        component={AnotherFancyFeaturePage}
      />
    </Stack.Navigator>
  );
};
