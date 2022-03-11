import 'react-native-gesture-handler';
import React from 'react';
import { useColorScheme, SafeAreaView, StatusBar, } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
{{#if hasReduxToolkit}}
import { store } from './src/store/store';
import { Provider } from 'react-redux';
{{/if}}
{{#if hasReactNavigationExample}}
import { BottomTabNavigator } from './src/common/navigation/bottomTab/BottomTabNavigator'
{{else}}
import { HomeContainer } from './src/features/home/container/HomeContainer'
{{/if}}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
  };

  return (
    {{#if hasReduxToolkit}}<Provider store={store}>{{/if}}
      <NavigationContainer>
        <SafeAreaView style={backgroundStyle}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          {{#if hasReactNavigationExample}}
            <BottomTabNavigator />
          {{else}}
            <HomeContainer />
          {{/if}}
        </SafeAreaView>
      </NavigationContainer>
    {{#if hasReduxToolkit}}</Provider>{{/if}}
  );
};

export default App;
