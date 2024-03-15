import {
  Button,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
  Image,
  Modal,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {
  Camera,
  CameraPosition,
  useCameraDevice,
} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonOption from './ButtonOption';
import ButtonShot from './ButtonShot';
import Video from 'react-native-video';
import {AlertPopUp} from '../../../components';

export default function CameraView(): React.JSX.Element {
  const [modal, setModal] = useState(false);

  const isActive = useIsFocused();
  const [cameraPosition, setCameraPosition] = useState<CameraPosition>('back');
  const device = useCameraDevice(cameraPosition);

  const camera = useRef<Camera>(null);

  const [mode, setMode] = useState<'photo' | 'video'>('photo');

  const [flash, setFlash] = useState<'auto' | 'on' | 'off' | undefined>('auto');
  const flashStatus =
    flash == 'on' ? 'flash' : flash == 'off' ? 'flash-off' : 'flash-auto';
  function flashSettings() {
    if (flash == 'auto') setFlash('on');
    else if (flash == 'on') setFlash('off');
    else setFlash('auto');
  }

  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [stablilzation, setStablilzation] = useState<boolean>(false);
  async function takePhoto() {
    try {
      if (camera.current != null) {
        const photo = await camera.current.takePhoto({
          flash: flash,
          qualityPrioritization: 'speed',
          enableAutoStabilization: stablilzation,
        });
        console.log(photo);
        setPhotoUri(`file://${photo.path}`);
        setModal(true);
      }
    } catch (error) {
      console.log('ERROR:', error);
    }
  }

  const [videoUri, setVideoUri] = useState<string | null>(null);
  const [recording, setRecording] = useState(false);
  function takeVideo() {
    if (camera.current != null) {
      setRecording(true);
      camera.current.startRecording({
        flash: flash == 'auto' || flash == 'on' ? 'on' : 'off',
        videoBitRate: 'extra-low',
        onRecordingFinished(video) {
          console.log('RECORDED:', video);
          setVideoUri(`file://${video.path}`);
          setModal(true);
        },
        onRecordingError(error) {
          console.log('RECORDING ERROR:', error);
        },
      });
    }
  }

  async function handleCapture() {
    if (mode == 'photo') takePhoto();
    else {
      if (recording) {
        await camera.current?.stopRecording();
        setRecording(false);
      } else takeVideo();
    }
  }

  function clearOnModalClose() {
    setModal(false);
    setPhotoUri(null);
    setVideoUri(null);
  }

  if (!device) return <Text>No camera device</Text>;
  else
    return (
      <View style={{flex: 1}}>
        <Camera
          onInitialized={() => console.log('camera ready')}
          photo={true}
          video={true}
          audio={true}
          ref={camera}
          device={device}
          style={StyleSheet.absoluteFill}
          isActive={isActive && !modal}
        />
        <ButtonShot onPress={handleCapture} />
        <Button
          title="stop video"
          disabled={!recording}
          onPress={handleCapture}
        />
        <View style={styles.viewCameraOption}>
          <ButtonOption
            onPress={() =>
              setCameraPosition(cameraPosition == 'back' ? 'front' : 'back')
            }
          />
          <ButtonOption
            iconName={flashStatus}
            onPress={() => flashSettings()}
          />
          <ButtonOption
            iconName={mode == 'photo' ? 'camera' : 'video'}
            onPress={() => setMode(mode == 'photo' ? 'video' : 'photo')}
          />
          <ButtonOption
            iconName={stablilzation ? 'video-stabilization' : 'card-off'}
            onPress={() => setStablilzation(!stablilzation)}
          />
        </View>
        {/* <AlertPopUp visible={} /> */}
        <Modal
          animationType="fade"
          visible={modal}
          onRequestClose={clearOnModalClose}>
          {photoUri && (
            <Image
              source={{uri: photoUri}}
              style={{width: '100%', height: '100%'}}
            />
          )}
          {videoUri && (
            <Video
              source={{uri: videoUri}}
              style={{flex: 1, width: '100%', height: '100%'}}
              repeat
            />
          )}
        </Modal>
      </View>
    );
}

const styles = StyleSheet.create({
  viewCameraOption: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
});
