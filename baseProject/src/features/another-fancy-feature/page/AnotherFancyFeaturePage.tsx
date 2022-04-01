import { RouteProp } from '@react-navigation/native';
import { ScreenName } from 'common/navigation/ScreenName';
import { StackNavigationType } from 'common/navigation/type';
import React from 'react';
import { AnotherFancyFeatureContainer } from '../container/AnotherFancyFeatureContainer';

type RouteProps = RouteProp<StackNavigationType, ScreenName.AnotherFancyFeature>;
type Props = { route: RouteProps };

export const AnotherFancyFeaturePage: React.FC<Props> = ({ route }) => {
  return <AnotherFancyFeatureContainer timeNow={route.params.timeNow} />;
};
