import {ActivityIndicator, Button, Text, View} from 'react-native';
import React from 'react';
import {HomeProps} from '../../routes/navigationConfig';
import {useUserQuery} from '../../features/auth/services/authApiSlice';

export default function Home({navigation}: HomeProps): React.JSX.Element {
  // const {isFetching} = useUserQuery(null);
  return (
    <View>
      <Text>Home</Text>
      {/* <ActivityIndicator
        animating={isFetching}
        size={'large'}
        color={'black'}
      /> */}
      <Button
        title="navigate to somewhere"
        onPress={() => navigation.canGoBack()}
      />
    </View>
  );
}
