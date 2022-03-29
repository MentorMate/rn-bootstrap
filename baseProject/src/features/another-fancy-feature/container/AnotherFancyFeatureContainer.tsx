import React from 'react';
import { AnotherFancyFeatureComponent } from '../components/AnotherFancyFeatureComponent';

interface Props {
  timeNow: string;
}

export const AnotherFancyFeatureContainer: React.FC<Props> = ({ timeNow }) => {
  return <AnotherFancyFeatureComponent timeNow={timeNow} />;
};
