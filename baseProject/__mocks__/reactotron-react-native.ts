const reactotron = {
  setAsyncStorageHandler: () => reactotron,
  storybookSwitcher: () => (view: React.Component) => {
    return view;
  },
  configureStore: () => reactotron,
  configure: () => reactotron,
  useReactNative: () => reactotron,
  asyncStorage: () => reactotron,
  trackGlobalErrors: () => reactotron,
  createEnhancer: () => jest.fn,
  use: () => reactotron,
  clear: () => reactotron,
  connect: () => reactotron,
};

module.exports = reactotron;
