import {
  Text,
  View,
  PermissionsAndroid,
  Linking,
  Button,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect} from 'react';
import usePermission from '../../hooks/usePermission';
import {CameraView} from '../../features/rn-vision-camera';

export default function RNVisionCam(): React.JSX.Element {
  const {result, request} = usePermission([
    PermissionsAndroid.PERMISSIONS.CAMERA,
    PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
  ]);

  function checkPermissions() {
    if (result == 'unknown') return request();
    if (result != 'granted') {
      Alert.alert(
        '',
        'Camera and microphone permissions are needed. Open app settings to grant permissions?',
        [
          {text: 'open settings', onPress: () => Linking.openSettings()},
          {text: 'no', onPress: () => BackHandler.exitApp()},
        ],
      );
      return;
    }
  }

  useEffect(() => {
    checkPermissions();
  }, []);

  if (result != 'granted') {
    <View
      style={{
        flex: 1,
        backgroundColor: '#888888',
        padding: 20,
      }}>
      <Text>RNVisionCam</Text>
      <Button
        title="request permission"
        onPress={() => {
          console.log('wadidaw');
        }}
      />
    </View>;
  }

  if (result == 'granted') return <CameraView />;
  else return <></>;
}
