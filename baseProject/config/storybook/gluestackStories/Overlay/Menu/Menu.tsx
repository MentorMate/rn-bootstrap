import React, { useState } from 'react';
import {
  Button,
  ButtonText,
  GlobeIcon,
  HStack,
  Menu,
  MenuIcon,
  MenuItem,
  MenuItemLabel,
  Icon,
  Text,
  SettingsIcon,
  AddIcon,
  Center,
  Input,
  InputSlot,
  InputIcon,
  InputField,
  ChevronUpIcon,
  ChevronDownIcon,
  StarIcon,
} from '@gluestack-ui/themed';

const MenuBasic = ({ placement = 'bottom' }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Center>
      <Menu
        isOpen={isOpen}
        placement={placement}
        disabledKeys={['Settings']}
        onClose={() => setIsOpen(false)}
        onOpen={() => setIsOpen(true)}
        offset={-40}
        // eslint-disable-next-line react/no-unstable-nested-components
        trigger={({ ...triggerProps }) => {
          return (
            <Button {...triggerProps} bg="transparent" w={300}>
              <Input isReadOnly={true} w={300}>
                <InputSlot>
                  {{#if hasIconToolkit}}
                  <InputIcon as={StarIcon} ml="$4" color="$black" fill="black" />
                  {{/if}}
                </InputSlot>
                <InputField type="text" defaultValue="Option" />
                {{#if hasIconToolkit}}
                <InputSlot as={isOpen ? ChevronUpIcon : ChevronDownIcon} color="$black" alignSelf="center" mr="$3" />
                {{/if}}
              </Input>
            </Button>
          );
        }}
      >
        <MenuItem key="Community" textValue="Community" gap="$2" w={300}>
          <Icon as={GlobeIcon} size="sm" />
          <MenuItemLabel size="sm">Community</MenuItemLabel>
        </MenuItem>
        <MenuItem key="Settings" textValue="Settings" gap="$2">
          <Icon as={SettingsIcon} size="sm" />
          <MenuItemLabel size="sm">Settings</MenuItemLabel>
        </MenuItem>
        <MenuItem key="Add account" textValue="Add account" gap="$2">
          <Icon as={AddIcon} size="sm" />
          <MenuItemLabel size="sm">Add account</MenuItemLabel>
        </MenuItem>
      </Menu>
    </Center>
  );
};

MenuBasic.description =
  'This is a basic Menu component example.The Menu component creates a user-friendly dropdown interface that can be utilized to present a range of options or actions. This feature ensures accessibility and ease of use for the user.';

export default MenuBasic;

export {
  Button,
  ButtonText,
  GlobeIcon,
  HStack,
  Menu,
  MenuIcon,
  MenuItem,
  MenuItemLabel,
  Icon,
  Text,
  SettingsIcon,
  AddIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  StarIcon,
};
