import {StyleSheet, Text, TouchableNativeFeedback, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type ButtonOptionType = {
  onPress: () => void;
  iconName?: string;
};

export default function ButtonOption({
  onPress,
  iconName = 'camera-flip',
}: ButtonOptionType): React.JSX.Element {
  return (
    <TouchableNativeFeedback
      useForeground
      onPress={onPress}
      background={TouchableNativeFeedback.Ripple('#ffffff4d', false, 25)}>
      <View style={styles.btnCameraOption}>
        <Icon style={styles.icon} name={iconName} size={28} color={'white'} />
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  btnCameraOption: {
    width: 50,
    height: 50,
    backgroundColor: '#00000066',
    borderRadius: 50 / 2,
    overflow: 'hidden',
    margin: 5,
  },
  icon: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
