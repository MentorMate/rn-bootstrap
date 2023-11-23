/* eslint-disable react/react-in-jsx-scope */
{{#if hasGluestackUICore}}
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { StyleSheet, View } from 'react-native';
{{/if}}
{{#if hasGluestackUI}}
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { StyleSheet, View } from 'react-native';
  {{#if hasGluestackUIDefaultTheme}}
  import {config } from '@gluestack-ui/config';
  {{else if hasGluestackUIEjected}}
  import { config } from '../config/gluestack-ui.config';
  {{/if}}
{{/if}}
  
export const parameters = {
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};

export const decorators = [
  Story => (
    <View style={styles.container}>
      {{#if hasGluestackUI}}<GluestackUIProvider config={config}>{{else if hasGluestackUICore}}<GluestackUIProvider>{{/if}}
        <Story />
      {{#if hasGluestackUI}}</GluestackUIProvider>{{else if hasGluestackUICore}}</GluestackUIProvider>{{/if}}
    </View>
  ),
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});