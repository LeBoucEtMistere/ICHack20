import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, RefreshControl } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';

import { StyleSheet } from 'react-native';
import ReceiptContainer from '../components/ReceiptContainer';
import { Text } from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import Axios from 'axios';
import { backend_server_uri } from '../store/Endpoint';

interface Props {}

// const mockReceipts = [
//   {
//     name: 'Marks and Spencers on Monday',
//     uri: 'https://nimatuowino.files.wordpress.com/2014/06/tesco-receipt.jpg',
//     totalPrice: '£2.40'
//   },
//   {
//     name: 'Tesco on Tuesday',
//     uri:
//       'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.dailymail.co.uk%2Fi%2Fpix%2F2016%2F05%2F31%2F15%2F34CC451900000578-3618060-Author_and_blogger_The_Unmumsy_Mum_shared_a_snap_of_the_Tesco_re-a-16_1464705617100.jpg&f=1&nofb=1',
//     totalPrice: '£2.40'
//   },
//   {
//     name: 'Waitrose on Wednesday',
//     uri:
//       'https://i.dailymail.co.uk/i/newpix/2018/09/06/20/4FCC4FE100000578-6140317-image-a-19_1536262741343.jpg',
//     totalPrice: '£2.40'
//   }
// ];

const Home: React.FC<Props> = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    (async () => {
      const endpoint = backend_server_uri + '/receipts';

      console.log({ endpoint });
      const response = await Axios.get(endpoint);
      console.log({ response });
      setPendingReceipts(
        response.data.filter(item => item[1].validated === false)
      );
      setProcessedReceipts(
        response.data.filter(item => item[1].validated === true)
      );
      setRefreshing(false);
      setLoading(false);
    })();
  }, [refreshing]);

  useEffect(() => {
    (async () => {
      const endpoint = backend_server_uri + '/receipts';
      try {
        const response = await Axios.get(endpoint);
        console.log({ response });
        setPendingReceipts(
          response.data.filter(item => item[1].validated === false)
        );
        setProcessedReceipts(
          response.data.filter(item => item[1].validated === true)
        );
      } catch (err) {
        console.warn({ err });
      }
      setLoading(false);
    })();
  }, []);

  const [loading, setLoading] = useState(true);
  const [pendingReceipts, setPendingReceipts] = useState([]);
  const [processedReceipts, setProcessedReceipts] = useState([]);

  const openCamera = () => {
    navigation.navigate('Camera');
  };

  return loading ? (
    <ActivityIndicator style={{ height: '100%' }} />
  ) : (
    <SafeAreaView style={{ height: '100%' }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          margin: 8
        }}
      >
        <Text style={styles.title}>Your receipts</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <MaterialIcons
            name='settings'
            size={35}
            style={{ marginTop: 8, marginRight: 8 }}
          ></MaterialIcons>
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ReceiptContainer
          navigation={navigation}
          title={'Pending'}
          receipts={pendingReceipts}
        ></ReceiptContainer>
        <ReceiptContainer
          navigation={navigation}
          title={'Processed'}
          receipts={processedReceipts}
        ></ReceiptContainer>
      </ScrollView>
      <TouchableOpacity
        onPress={openCamera}
        containerStyle={{
          backgroundColor: 'grey',
          elevation: 3,
          borderRadius: 32,
          justifyContent: 'center',
          alignItems: 'center',
          width: 64,
          height: 64,
          position: 'absolute',
          bottom: 32,
          right: 32
        }}
      >
        <AntDesign name='plus' color={'white'} size={50}></AntDesign>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontFamily: 'Share Tech',
    fontSize: 36,
    marginLeft: 8,
    marginTop: 8
  }
});

export default Home;
