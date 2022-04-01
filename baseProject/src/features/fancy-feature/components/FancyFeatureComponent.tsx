import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ScreenName } from 'common/navigation/ScreenName';
import { StackNavigationType } from 'common/navigation/type';
import React, { useCallback } from 'react';
import { Text, Button } from 'react-native';

export const FancyFeatureComponent = () => {
  const { navigate } = useNavigation<StackNavigationProp<StackNavigationType>>();
  const handleNavigationToAnotherFancyFeature = useCallback(() => {
    navigate(ScreenName.AnotherFancyFeature, { timeNow: new Date().toTimeString() });
  }, [navigate]);

  return (
    <>
      <Text>This is a fancy feature of your app.</Text>
      <Button title="Go to Another Fancy Feature" onPress={handleNavigationToAnotherFancyFeature} />
    </>
  );
};
