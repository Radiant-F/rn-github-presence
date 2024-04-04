import React from 'react';
import {Home, VisionCamera, SignIn, SignUp, Splash, LibDemo} from '../screens';
import RootStack from './navigationConfig';

export default function StackNavigator(): React.JSX.Element {
  return (
    <RootStack.Navigator initialRouteName="LibDemo">
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="SignIn" component={SignIn} />
      <RootStack.Screen name="SignUp" component={SignUp} />
      <RootStack.Screen
        name="Splash"
        options={{headerTitle: 'Home'}}
        component={Splash}
      />
      <RootStack.Screen name="VisionCamera" component={VisionCamera} />
      <RootStack.Screen name="LibDemo" component={LibDemo} />
    </RootStack.Navigator>
  );
}
