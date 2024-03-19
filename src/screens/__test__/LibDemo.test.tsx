import {Button, StyleSheet, Text, View, Modal, Linking} from 'react-native';
import React, {useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';
import axios from 'axios';

export default function LibDemo() {
  const {hasPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const [active, setActive] = useState(true);

  const body = {
    status: 'Hadir',
    latitude: 0,
    longitude: 0,
    desc: '',
  };
  const header = {
    headers: {Authorization: `Bearer ${token}`, Accept: 'application/json'},
  };
  const token =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGV2LnBvbmRva2RpZ2l0YWwucG9uZG9rcXUuaWRcL2FwaVwvbG9naW4iLCJpYXQiOjE3MTA4MzEzNDEsImV4cCI6MTcxMzQyMzM0MSwibmJmIjoxNzEwODMxMzQxLCJqdGkiOiIwVGtVMmpUT0F5ZWpnNnB0Iiwic3ViIjo2NDIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.yTn01x_zumeQKEest1Su44vfke9AxvUSilIIJjMDdBE';

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: async codes => {
      setActive(false);
      console.log(codes[0].value);
      try {
        const endpoint = codes[0].value == 'Hadir' ? 'in' : 'out';
        const {data} = await axios.post(
          `https://dev.pondokdigital.pondokqu.id/api/presence-${endpoint}`,
          body,
          header,
        );
        console.log('SUCCESS:', data);
      } catch (error) {
        console.log('ERROR:', error);
      }
    },
  });

  if (device == null) return <Text>Tidak ada kamera</Text>;

  return (
    <View style={{flex: 1}}>
      {hasPermission && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={active}
          codeScanner={codeScanner}
        />
      )}
      <Button title="activate camera" onPress={() => setActive(true)} />
      <Modal visible={!hasPermission}>
        <View
          style={{
            backgroundColor: 'black',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{backgroundColor: 'white', padding: 20}}>
            <Text>Izinkan kamera</Text>
            <Button
              title="izinkan kamera"
              onPress={() => Linking.openSettings()}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({});
