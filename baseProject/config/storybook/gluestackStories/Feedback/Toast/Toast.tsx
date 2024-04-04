import React from 'react';
import {
  CloseIcon,
  Button,
  ButtonText,
  ButtonIcon,
  InfoIcon,
  Icon,
  VStack,
  HStack,
  useToast,
  Toast,
  ToastTitle,
  ToastDescription,
  Pressable,
} from '@gluestack-ui/themed';

const ToastBasic = ({ placement = 'top', ...props }: any) => {
  const toast = useToast();
  return (
    <Button
      onPress={() => {
        toast.show({
          placement: placement,
          duration: null,
          render: ({ id }) => {
            const toastId = `toast-${id}`;
            return (
              <Toast action={props.action} nativeID={toastId}>
                <HStack space="xs" gap={8} maxWidth="100%">
                  <Icon
                    as={InfoIcon}
                    w="$6"
                    h="$6"
                    color="$primary300"
                    fill={
                      props.action === 'info'
                        ? '$primary600'
                        : props.action === 'error'
                          ? '$error100'
                          : props.action === 'success'
                            ? '$success100'
                            : props.action === 'warning'
                              ? '$warning100'
                              : undefined
                    }
                  />
                  <VStack space="xs" flexShrink={1}>
                    <ToastTitle>Toast Message Title</ToastTitle>
                    <ToastDescription>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam consequat mattis nisl in
                      porttitor.
                    </ToastDescription>
                  </VStack>
                </HStack>
                <Pressable
                  position="absolute"
                  w="$6"
                  h="$6"
                  top="$2"
                  right="$2"
                  alignItems="flex-end"
                  onPress={() => toast.close(id)}
                >
                  <ButtonIcon as={CloseIcon} color="$primary60" w="$2.5" h="$2.5" />
                </Pressable>
              </Toast>
            );
          },
        });
      }}
    >
      <ButtonText>Press Me</ButtonText>
    </Button>
  );
};

ToastBasic.description =
  'This is a basic Toast component example. Toasts are used to communicate a state that affects a system, feature or page';

export default ToastBasic;

export {
  Toast,
  ToastTitle,
  ToastDescription,
  useToast,
  Icon,
  CloseIcon,
  InfoIcon,
  VStack,
  HStack,
  Button,
  ButtonText,
  ButtonIcon,
  Pressable,
};
