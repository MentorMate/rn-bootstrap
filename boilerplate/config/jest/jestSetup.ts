import 'react-native-gesture-handler/jestSetup';

// @ts-ignore
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';

// @ts-ignore
import mockRNCNetInfo from '@react-native-community/netinfo/jest/netinfo-mock.js';

jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('react-native/Libraries/Animated/Easing');
jest.mock('react-native/Libraries/Animated/animations/TimingAnimation');

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('@react-native-community/netinfo', () => mockRNCNetInfo);
