import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme, SafeAreaView, StatusBar, } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
{{#if hasReduxToolkit}}
import { store } from './src/common/store/store';
import { Provider } from 'react-redux';
{{/if}}
{{#if hasReactNavigationExample}}
import { BottomTabNavigator } from './src/common/navigation/bottomTab/BottomTabNavigator'
{{else}}
import { HomeContainer } from './src/features/home/container/HomeContainer'
{{/if}}
{{#if hasAnyGluestackUIOption}}
  import { GluestackUIProvider } from '@gluestack-ui/themed';
  {{#if hasGluestackUIDefaultTheme}}
  import {config } from '@gluestack-ui/config';
  {{else if hasGluestackUIEjected}}
  import { config } from './config/gluestack-ui.config';
  {{/if}}
{{/if}}
{{#if hasReactotron}}
  {{#if hasStorybook}}
import StorybookUIRoot from './.storybook';
import Reactotron from './reactotronConfig';
  {{/if}}
{{/if}}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    {{#if hasReduxToolkit}}<Provider store={store}>{{/if}}
      <NavigationContainer>
        {{#if hasGluestackUI}}<GluestackUIProvider config={config}>{{else if hasGluestackUICore}}<GluestackUIProvider>{{/if}}
          <SafeAreaView style={backgroundStyle}>
            <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
            {{#if hasReactNavigationExample}}
            <BottomTabNavigator />
            {{else}}
            <HomeContainer />
            {{/if}}
          </SafeAreaView>
        {{#if hasAnyGluestackUIOption}}</GluestackUIProvider>{{/if}}
      </NavigationContainer>
    {{#if hasReduxToolkit}}</Provider>{{/if}}
  );
};

{{#if hasReactotron}}
  {{#if hasStorybook}}
    export default Reactotron.storybookSwitcher(StorybookUIRoot)(App);
  {{else}}
    export default App;
  {{/if}}
{{else}}
export default App;
{{/if}}