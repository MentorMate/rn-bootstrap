import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import 'react-native-gesture-handler';
{{#if hasStorybook}}
import { useStorybook } from './config/storybook/storybook.config';
import Storybook from './.storybook/index';
{{/if}}

{{#if hasStorybook}}
if (useStorybook) {
  AppRegistry.registerComponent(appName, () => Storybook);
} else {
  AppRegistry.registerComponent(appName, () => App);
}
{{else}}
AppRegistry.registerComponent(appName, () => App);
{{/if}}