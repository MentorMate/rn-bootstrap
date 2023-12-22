import Reactotron, { trackGlobalErrors } from 'reactotron-react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';
import {name as appName} from './app.json';

Reactotron.setAsyncStorageHandler(AsyncStorage)
  .use(trackGlobalErrors())
  .configure({
    name: 'appName'
  }) // controls connection & communication settings
  .useReactNative({
    storybook: true,
  }) // add all built-in react native plugins
  .connect(); // let's connect!

console.tron = Reactotron;

export default Reactotron;
