import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useTranslation} from 'react-i18next';
import i18n from 'i18next';

export default function Splash() {
  const {t} = useTranslation();

  function changeLanguage(lang: string) {
    i18n.changeLanguage(lang);
  }

  return (
    <View>
      <Text style={styles.greet}>{t('Welcome')}</Text>
      <Text style={styles.greet}>{t('Good Morning')}</Text>
      <Button
        title="English"
        color={'dodgerblue'}
        onPress={() => changeLanguage('en')}
      />
      <Button
        title="Bahasa Indonesia"
        color={'tomato'}
        onPress={() => changeLanguage('id')}
      />
      <Button
        title="Sundanese"
        color={'lightseagreen'}
        onPress={() => changeLanguage('sunda')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  greet: {
    fontSize: 35,
    color: 'black',
    textAlign: 'center',
    fontWeight: '500',
  },
});
