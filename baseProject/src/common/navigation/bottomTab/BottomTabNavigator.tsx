import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigator } from 'common/navigation/stack/StackNavigator';
import { HomePage } from 'features/home/page/HomePage';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = ()=> {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="FancyFeatures" component={StackNavigator} />
    </Tab.Navigator>
  );
}