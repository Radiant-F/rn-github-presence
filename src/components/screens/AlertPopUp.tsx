import React, {useEffect, useState} from 'react';
import {
  Button,
  LayoutAnimation,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  UIManager,
  View,
} from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

type AlertType = {
  message?: string;
  visible?: boolean;
};

let timeout: null | ReturnType<typeof setTimeout> = null;
let message = '';
export default function AlertPopUp({
  message = 'Masukan pesan...',
  visible = false,
}: AlertType): React.JSX.Element {
  const [msg, setMsg] = useState('');
  const [alertVisible, setAlertVisible] = useState(false);

  const showAlert = () => {
    message = msg;
    LayoutAnimation.easeInEaseOut();
    setAlertVisible(true);
    setMsg('');
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => {
      LayoutAnimation.easeInEaseOut();
      setAlertVisible(false);
    }, 1500);
  };

  useEffect(() => {
    if (visible) showAlert();
  }, [visible]);

  return (
    <View style={styles.container}>
      <View style={[styles.alert, !alertVisible && {height: 1, marginTop: -1}]}>
        <Text style={styles.msg} numberOfLines={5}>
          {message}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
  },
  input: {
    width: '80%',
    fontSize: 18,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  alert: {
    position: 'absolute',
    top: 0,
    backgroundColor: 'green',
    width: '100%',
    overflow: 'hidden',
  },
  msg: {
    margin: 10,
    marginHorizontal: 20,
    color: '#fff',
  },
});
