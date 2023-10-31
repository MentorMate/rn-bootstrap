// this is the prebuilt configuration file for storybook
{{#if hasGluestackUICore}}
import { GluestackUIProvider } from '@gluestack-ui/themed';
import { View } from 'react-native';
{{/if}}
{{#if hasGluestackUI}}
  import { View } from 'react-native';
  import { GluestackUIProvider } from '@gluestack-ui/themed';
  {{#if hasGluestackUIDefaultTheme}}
  import {config } from '@gluestack-ui/config';
  {{else if hasGluestackUIEjected}}
  import { config } from './config/gluestack-ui.config';
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
    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
      {{#if hasGluestackUI}}<GluestackUIProvider config={config}>{{else if hasGluestackUICore}}<GluestackUIProvider>{{/if}}
        <Story />
        {{#if hasGluestackUI}}</GluestackUIProvider>{{else if hasGluestackUICore}}</GluestackUIProvider>{{/if}}
    </View>
  ),
];
