import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigator } from 'common/navigation/stack/StackNavigator';
import { HomePage } from 'features/home/page/HomePage';
import { ScreenName } from 'common/navigation/ScreenName';
import { TabNavigationType } from 'common/navigation/type';

const Tab = createBottomTabNavigator<TabNavigationType>();
const tabNavOptions: BottomTabNavigationOptions = {
  headerShown: false
};

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name={ScreenName.Home} component={HomePage} />
      <Tab.Screen options={tabNavOptions} name={ScreenName.FancyFeaturesStack} component={StackNavigator} />
    </Tab.Navigator>
  );
};
