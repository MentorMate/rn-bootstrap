export type AnotherFancyFeatureParams = {
  timeNow: string;
};

export type StackNavigationType = {
  FancyFeature: undefined;
  AnotherFancyFeature: AnotherFancyFeatureParams;
};

export type TabNavigationType = {
  Home: undefined;
  FancyFeaturesStack: undefined;
};
