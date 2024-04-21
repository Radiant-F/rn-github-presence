import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

export default function usePermission(permissions = []) {
  const [result, setResult] = useState('unknown');

  async function checkPermissions() {
    try {
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
          ? 'ignored'
          : 'half granted',
      );
      // console.log(
      //   granted
      //     ? 'granted'
      //     : denied
      //     ? 'denied'
      //     : never_ask_again
      //     ? 'ignored'
      //     : 'half granted',
      // );
      if (granted) {
        // return granted
      } else if (denied) {
        // return open app settings
      } else if (never_ask_again) {
        // ignored
      } else {
        // return
      }
    } catch (error) {
      console.log('PERMISSION ERROR:', error);
    }
  }

  return {result, request: checkPermissions};
}

const styles = StyleSheet.create({});
