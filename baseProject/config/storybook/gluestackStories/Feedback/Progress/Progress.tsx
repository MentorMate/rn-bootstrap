import React from 'react';
import { Progress, ProgressFilledTrack, VStack, Text, Heading, Center, HStack } from '@gluestack-ui/themed';

const ProgressBasic = ({ value = 50, ...props }: any) => {
  return (
    <Center>
      <HStack justifyContent="space-between" width={268} my="$1">
        <Text size="sm">Progress</Text>
        <Text size="sm">Hint</Text>
      </HStack>
      <Progress
        sx=\{{
          w: 268,
        }}
        value={value}
        {...props}
      >
        <ProgressFilledTrack>
          <Text color="white" fontWeight="bold" alignSelf="center" mt="$1">
            {value}%
          </Text>
        </ProgressFilledTrack>
      </Progress>
    </Center>
  );
};

ProgressBasic.description =
  'This is a basic Progress component example. Progress components are used to show the progress of a task.';

export default ProgressBasic;

export { Progress, ProgressFilledTrack, VStack, Text, Heading };
