import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {AlertPopUp} from '../../components';

export default function SignIn(): React.JSX.Element {
  const [popUp, setPopUp] = useState(false);
  return (
    <View>
      <Text>SignIn</Text>
      <Button
        title={`trigger alert ${popUp ? 'off' : 'on'}`}
        onPress={() => setPopUp(!popUp)}
      />
      <AlertPopUp visible={popUp} />
    </View>
  );
}

const styles = StyleSheet.create({});
