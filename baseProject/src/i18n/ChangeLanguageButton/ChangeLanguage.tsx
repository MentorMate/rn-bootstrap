import React, { FC, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { en1, en } from '../locals';
import i18next from '../i18n.config';

interface ChangeLanguageProps {}

const ChangeLanguage: FC<ChangeLanguageProps> = () => {
  const [selectedLocal, setSelectedLocal] = useState(en.locale);

  const handlePress = () => {
    const newLocal = selectedLocal === en.locale ? en1.locale : en.locale;
    i18next.changeLanguage(newLocal);
    setSelectedLocal(newLocal);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text>{selectedLocal}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
});

export default ChangeLanguage;
