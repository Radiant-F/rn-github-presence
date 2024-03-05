import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import store from './redux/store';
import {Provider} from 'react-redux';
import StackNavigator from './routes';

export default function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});
