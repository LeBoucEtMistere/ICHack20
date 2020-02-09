import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Axios from 'axios';

const Camera = ({ route, navigation }) => {
  const takePictureHandler = async camera => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    console.log({ data });
    // const endpoint = '';
    // const response = await Axios.post(endpoint);
    const response = {
      data: {
        name: 'Tesco Tuesday',
        total: '£5.08',
        imageUri:
          'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fc8.alamy.com%2Fcomp%2FCNTYDX%2Ftesco-shopping-receipt-CNTYDX.jpg&f=1&nofb=1',
        items: [
          {
            name: 'Fresh Milk',
            price: '£0.89'
          },
          {
            name: 'Muesli',
            price: '£2.29'
          },
          {
            name: 'Dark Chocolate',
            price: '£1.90',
            quantity: 2
          },
          {
            name: 'Dark Chocolate',
            price: '£1.90',
            quantity: 2
          },
          {
            name: 'Dark Chocolate',
            price: '£1.90',
            quantity: 2
          },
          {}
        ]
      }
    };
    navigation.navigate('Receipt', { data: response.data });
  };

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.preview}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel'
        }}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== 'READY') {
            return <Text>Not ready</Text>;
          }
          return (
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <TouchableOpacity
                style={styles.capture}
                onPress={() => takePictureHandler(camera)}
              ></TouchableOpacity>
            </View>
          );
        }}
      </RNCamera>
    </View>
  );
};

export default Camera;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: 'rgba(9,9,9,0.1)',
    margin: 32,
    borderRadius: 50
  }
});
