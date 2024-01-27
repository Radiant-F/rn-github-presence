import React from 'react';
import {Home, SignIn, SignUp, Splash} from '../screens';
import RootStack from './navigationConfig';

export default function StackNavigator(): React.JSX.Element {
  return (
    <RootStack.Navigator>
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="SignIn" component={SignIn} />
      <RootStack.Screen name="SignUp" component={SignUp} />
      <RootStack.Screen name="Splash" component={Splash} />
    </RootStack.Navigator>
  );
}
