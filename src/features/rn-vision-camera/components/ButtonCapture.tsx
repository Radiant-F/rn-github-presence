import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

type ButtonCapture = {
  onPress: () => void;
  loading?: boolean;
};

export default function ButtonCapture({
  onPress,
  loading = false,
}: ButtonCapture): React.JSX.Element {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <ActivityIndicator color={'black'} size={'large'} animating={loading} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 70,
    height: 70,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    borderRadius: 70 / 2,
    borderWidth: 10,
    borderColor: '#2e2e2e',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
