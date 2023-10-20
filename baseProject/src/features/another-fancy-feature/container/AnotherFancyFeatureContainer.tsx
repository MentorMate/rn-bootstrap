import React from 'react';
import { AnotherFancyFeatureComponent } from '../component/AnotherFancyFeatureComponent';
import { TimeNow } from '../model/TimeNow';

interface Props extends TimeNow {}

export const AnotherFancyFeatureContainer: React.FC<Props> = ({ timeNow }) => {
  return <AnotherFancyFeatureComponent timeNow={timeNow} />;
};
