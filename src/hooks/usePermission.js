import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

export default function usePermission(permissions = []) {
  const [result, setResult] = useState('unknown');

  async function checkPermissions() {
    try {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      ];
      const results = await PermissionsAndroid.requestMultiple(permissions);
      const granted = Object.values(results).every(
          result => result === 'granted',
        ),
        denied = Object.values(results).every(result => result === 'denied'),
        never_ask_again = Object.values(results).every(
          result => result === 'never_ask_again',
        );

      setResult(
        granted
          ? 'granted'
          : denied
          ? 'denied'
          : never_ask_again
          ? 'open settings'
          : 'ignored',
      );
      console.log(
        granted
          ? 'granted'
          : denied
          ? 'denied'
          : never_ask_again
          ? 'open settings'
          : 'ignored',
      );
      if (granted) {
        // return granted
      } else if (denied) {
        // return denied
      } else if (never_ask_again) {
        // open app settings
      } else {
        // return ignored
      }
    } catch (error) {
      console.log('PERMISSION ERROR:', error);
    }
  }

  return {result, request: checkPermissions};
}

const styles = StyleSheet.create({});
