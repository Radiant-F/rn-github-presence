import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Home, SignIn, SignUp} from '../screens';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

type RootStackParamList = {
  Home: undefined;
  SignIn: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function StackNavigator(): React.JSX.Element {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="SignIn" component={SignIn} />
    </RootStack.Navigator>
  );
}
