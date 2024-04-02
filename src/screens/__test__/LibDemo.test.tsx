import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const months = [
  'Januari',
  'Februari',
  'Maret',
  'April',
  'Mei',
  'Juni',
  'Juli',
  'Agustus',
  'September',
  'Oktober',
  'November',
  'Desember',
];

const LibDemo = () => {
  const [presenceData, setPresenceData] = useState<any>({});

  const [selectedMonthIndex, setSelectedMonthIndex] = useState(
    new Date().getMonth(),
  );

  async function getPresence() {
    try {
      const {data} = await axios.get(
        'https://dev.pondokdigital.pondokqu.id/api/get-data-user-in-year',
        {
          headers: {
            Authorization:
              'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGV2LnBvbmRva2RpZ2l0YWwucG9uZG9rcXUuaWRcL2FwaVwvbG9naW4iLCJpYXQiOjE3MTA4MzEzNDEsImV4cCI6MTcxMzQyMzM0MSwibmJmIjoxNzEwODMxMzQxLCJqdGkiOiIwVGtVMmpUT0F5ZWpnNnB0Iiwic3ViIjo2NDIsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.yTn01x_zumeQKEest1Su44vfke9AxvUSilIIJjMDdBE',
            'Content-Type': 'application/json',
          },
        },
      );
      setPresenceData(data);
    } catch (error) {
      console.log('ERROR:', error);
    }
  }

  useEffect(() => {
    getPresence();
  }, []);

  return (
    <View style={{flex: 1, marginTop: 20}}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.btnNavMonth}
          onPress={() => setSelectedMonthIndex(selectedMonthIndex - 1)}>
          <Icon name="chevron-left" color={'black'} size={30} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.textMonth}>
          <Text style={{color: 'black', fontSize: 20}}>
            {months[selectedMonthIndex]}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnNavMonth}
          onPress={() => setSelectedMonthIndex(selectedMonthIndex + 1)}>
          <Icon name="chevron-right" color={'black'} size={30} />
        </TouchableOpacity>
      </View>

      <FlatList
        numColumns={4}
        columnWrapperStyle={{alignSelf: 'center'}}
        data={presenceData[months[selectedMonthIndex]]}
        renderItem={({item}) => {
          return (
            <View
              style={{
                ...styles.viewTanggal,
                backgroundColor:
                  item.statusPresence == 'Alpha' ? 'black' : 'dodgerblue',
              }}>
              <Text style={{color: 'white'}}>{item.statusPresence}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default LibDemo;

const styles = StyleSheet.create({
  viewTanggal: {
    width: 60,
    height: 60,
    backgroundColor: 'black',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  textMonth: {
    backgroundColor: 'white',
    padding: 20,
    paddingHorizontal: 40,
    elevation: 5,
    borderRadius: 50 / 2,
  },
  btnNavMonth: {
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 50 / 2,
    elevation: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
