import {PermissionsAndroid, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';

export default function usePermission(permissions = []) {
  const listPermissions = permissions.map(permission =>
    permission == 'camera'
      ? PermissionsAndroid.PERMISSIONS.CAMERA
      : permission == 'microphone'
      ? PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
      : PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  );

  const [result, setResult] = useState('uninitialized');

  async function requestPermissions() {
    try {
      const results = await PermissionsAndroid.requestMultiple(listPermissions);
      const filterGranted = listPermissions.filter(
          (v, i) => results[listPermissions[i]] == 'granted',
        ),
        granted = filterGranted.length == listPermissions.length;
      const filterDenied = listPermissions.filter(
          (v, i) => results[listPermissions[i]] == 'denied',
        ),
        denied = filterDenied.length == listPermissions.length;
      const filterNeverAskAgain = listPermissions.filter(
          (v, i) => results[listPermissions[i]] == 'never_ask_again',
        ),
        neverAskAgain = filterNeverAskAgain.length == listPermissions.length;
      setResult(
        granted
          ? 'granted'
          : denied
          ? 'denied'
          : neverAskAgain
          ? 'never_ask_again'
          : 'uninitialized',
      );
    } catch (error) {
      console.log('Permission Error:', error);
      return error;
    }
  }

  return {result, request: requestPermissions};
}

const styles = StyleSheet.create({});
