import {Button, StyleSheet, Text, View, Modal, Linking} from 'react-native';
import React, {useState} from 'react';
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

export default function LibDemo() {
  const {hasPermission, requestPermission} = useCameraPermission();
  const device = useCameraDevice('back');

  const [modal, setModal] = useState(true);

  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: codes => {
      console.log(`Scanned ${codes.length} codes!`);
    },
  });

  if (device == null) return <Text>Tidak ada kamera</Text>;

  return (
    <View style={{flex: 1}}>
      {hasPermission && (
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          codeScanner={codeScanner}
        />
      )}
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
