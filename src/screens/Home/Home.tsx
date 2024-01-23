import {Button, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {HomeProps} from '../../routes';

export default function Home({navigation}: HomeProps): React.JSX.Element {
  return (
    <View>
      <Text>Home</Text>
      <Button
        title="navigate to somewhere"
        onPress={() => navigation.navigate('SignIn')}
      />
    </View>
  );
}
