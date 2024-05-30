import React from 'react';
import { BottomTabNavigationOptions, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackNavigator } from 'common/navigation/stack/StackNavigator';
import { HomePage } from 'features/home/page/HomePage';
import { ScreenName } from 'common/navigation/ScreenName';
import { TabNavigationType } from 'common/navigation/type';
{{#if hasI18n}}
import ChangeLanguage from '../../../i18n/ChangeLanguageButton/ChangeLanguage';
{{/if}}

const Tab = createBottomTabNavigator<TabNavigationType>();
const tabNavOptions: BottomTabNavigationOptions = {
  headerShown: false,
};

{{#if hasI18n}}
const languageOptions: BottomTabNavigationOptions = {
  headerRight: () => <ChangeLanguage />,
};
{{/if}}

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      {{#if hasI18n}}
      <Tab.Screen name={ScreenName.Home} component={HomePage} options={languageOptions} />
      {{else}}
      <Tab.Screen name={ScreenName.Home} component={HomePage} />
      {{/if}}
      <Tab.Screen options={tabNavOptions} name={ScreenName.FancyFeaturesStack} component={StackNavigator} />
    </Tab.Navigator>
  );
};
