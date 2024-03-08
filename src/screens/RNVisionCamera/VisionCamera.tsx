import {
  StyleSheet,
  Text,
  View,
  PermissionsAndroid,
  ToastAndroid,
  Linking,
  Button,
  StatusBar,
} from 'react-native';
import React from 'react';

export default function RNVisionCam(): React.JSX.Element {
  async function checkCameraPermission() {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (result == 'granted') {
        // turn on camera
      } else if (result == 'denied') {
        // ask for permission
      } else {
        // open app settings
      }
    } catch (error) {
      console.log('PERMISSION ERROR:', error);
    }
  }

  async function checkMicPermission() {
    try {
      const result = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );
      if (result == 'granted') {
        // turn on camera
      } else if (result == 'denied') {
        // ask for permission
      } else {
        // open app settings
      }
    } catch (error) {
      console.log('PERMISSION ERROR:', error);
    }
  }

  async function checkPermission() {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ];
      const results = await PermissionsAndroid.requestMultiple(permissions),
        granted =
          results[permissions[0]] == 'granted' &&
          results[permissions[1]] == 'granted',
        denied =
          results[permissions[0]] == 'denied' &&
          results[permissions[1]] == 'denied';

      if (granted) {
        // turn on camera
      } else if (denied) {
        // turn on camera
      } else {
        ToastAndroid.show(
          'Harap nyalakan perizinan kamera dan mikrofon',
          ToastAndroid.LONG,
        );
        await Linking.openSettings();
      }
    } catch (error) {
      console.log('PERMISSION ERROR:', error);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        paddingTop: StatusBar.currentHeight,
        backgroundColor: '#888888',
        padding: 8,
      }}>
      <Text>RNVisionCam</Text>
      <Button
        title="toasted"
        onPress={() => {
          ToastAndroid.showWithGravity(
            'Walawe',
            ToastAndroid.LONG,
            ToastAndroid.CENTER,
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
