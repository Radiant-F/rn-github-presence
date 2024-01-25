import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, SignIn, SignUp} from '../screens';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import RootStack from './navigationConfig';

export default function StackNavigator(): React.JSX.Element {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="SignIn" component={SignIn} />
      <RootStack.Screen name="SignUp" component={SignUp} />
    </RootStack.Navigator>
  );
}
