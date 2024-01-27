import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: {
    userId: number;
    token: string;
  };
  SignIn?: {
    token: string;
  };
  SignUp: undefined;
  Splash: undefined;
};

export type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type SignInProps = NativeStackScreenProps<RootStackParamList, 'SignIn'>;
export type SplashProps = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const RootStackNavigator = createNativeStackNavigator<RootStackParamList>();

export default RootStackNavigator;
