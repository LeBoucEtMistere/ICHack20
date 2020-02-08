import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';

const Camera = ({ route, navigation }) => {

  const takePictureHandler = async (camera) => {
    const options = { quality: 0.5, base64: true };
    const data = await camera.takePictureAsync(options);
    // navigation.navigate('Feedback', {image: data});
  };

  const barCodeHandler = ({ data, rawData, type, bounds }) => {
    console.log({ data, rawData, type, bounds });
    // save the barcode info into a different components state
    // navigation.navigate('Feedback', {image: data});
  };

  return (
    <View style={styles.container}>
      <RNCamera
        onBarCodeRead={barCodeHandler}
        style={styles.preview}
        captureAudio={false}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.on}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        {({ camera, status, recordAudioPermissionStatus }) => {
          if (status !== 'READY') { return <Text>Not ready</Text>; }
          return (
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center' }}>
              <TouchableOpacity
                onPress={() => takePictureHandler(camera)}
                style={styles.capture} />
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
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    borderWidth: 4,
    borderColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: 'red',
    borderRadius: 50,
  },
});
