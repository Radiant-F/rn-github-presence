import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';

export default function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <View>
        <Text>App</Text>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
