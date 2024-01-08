import Reactotron, { trackGlobalErrors } from 'reactotron-react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
{{#if hasReduxToolkit}}
import { reactotronRedux } from 'reactotron-redux';
{{/if}}
import {name as appName} from './app.json';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .use(trackGlobalErrors())
  .configure({
    name: 'appName'
  }) // controls connection & communication settings
  .useReactNative({
    storybook: true,
  }) // add all built-in react native plugins
  {{#if hasReduxToolkit}}
  .use(reactotronRedux())
  {{/if}}
  .connect(); // let's connect!

console.tron = Reactotron;

export default Reactotron;
