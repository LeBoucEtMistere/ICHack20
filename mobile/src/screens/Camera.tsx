import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import Config from 'react-native-config';
import Axios from 'axios';

const Camera = ({ route, navigation }) => {
  const takePictureHandler = async (camera: RNCamera) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    console.log({ data });
    const endpoint = Config.SERVER_URL + '/pics';
    console.log({ endpoint });
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: data.uri,
        type: 'image/jpeg',
        name: 'pic.jpg'
      });
      const config = {
        headers: { 'content-type': 'multipart/form-data' },
        accept: 'application/json'
      };
      // TODO Show loading screen
      navigation.navigate('LoadingAnimation');
      try {
        const response = await Axios.post(endpoint, formData, config);
        console.log({ response });

        navigation.navigate('Receipt', { item: response.data });
      } catch (err) {
        console.warn({ err });
        navigation.navigate('Error', {
          navigation
        });
      }
    } catch (err) {
      console.warn({ err });
    }
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
