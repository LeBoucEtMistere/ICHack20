import { NativeModules } from 'react-native';

NativeModules.RNCNetInfo = {
  getCurrentConnectivity: jest.fn(),
  isConnectedMetered: jest.fn(),
  addListener: jest.fn(),
  removeListeners: jest.fn(),
};
