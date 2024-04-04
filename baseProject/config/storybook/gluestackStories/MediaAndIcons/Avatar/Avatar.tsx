import React from 'react';
import {
  VStack,
  Avatar,
  AvatarGroup,
  AvatarBadge,
  AvatarFallbackText,
  AvatarImage,
  HStack,
  Icon,
  Heading,
  Text,
} from '@gluestack-ui/themed';

const AvatarBasic = ({
  size = 'md',
  uri = 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
  badge = true,
  fallbackText = 'John Doe',
  ...props
}: any) => {
  return (
    <Avatar size={size} {...props}>
      <AvatarFallbackText>{fallbackText}</AvatarFallbackText>
      {uri && uri !== 'TEST Avatar with letters' && (
        <AvatarImage
          source=\{{
            uri: uri,
          }}
          alt="Avatar Image"
        />
      )}
      {badge && <AvatarBadge />}
    </Avatar>
  );
};

AvatarBasic.description =
  'This is a basic Avatar component example. An avatar is a graphical representation of a user.';

export default AvatarBasic;

export { HStack, VStack, Avatar, AvatarGroup, AvatarBadge, AvatarFallbackText, AvatarImage, Icon, Heading, Text };
