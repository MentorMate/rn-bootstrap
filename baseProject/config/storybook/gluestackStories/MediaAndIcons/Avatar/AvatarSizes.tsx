import React from 'react';
import { VStack, Avatar, AvatarBadge, AvatarFallbackText, AvatarImage } from '@gluestack-ui/themed';

const AvatarSizes = () => {
  return (
    <VStack space="md" alignItems="center" h="100%" justifyContent="center">
      {['xs', 'sm', 'md', 'lg'].map((size, index) => (
        <Avatar size={size} key={index}>
          <AvatarFallbackText>John Doe</AvatarFallbackText>
          <AvatarImage
            source=\{{
              uri: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
            }}
            alt="Avatar Image"
          />
          <AvatarBadge />
        </Avatar>
      ))}
    </VStack>
  );
};

AvatarSizes.description =
  'This is a basic Avatar component example. An avatar is a graphical representation of a user with different sizes.';

export default AvatarSizes;
