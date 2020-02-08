import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { AuthContext } from '../store/Auth';
import LottieView from 'lottie-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default SignupOrRegister = ({ navigation }) => {
  const { signInWithGoogle } = React.useContext(AuthContext);

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: 'white'
      }}
    >
      <Text
        style={{
          fontFamily: 'Share Tech',
          fontSize: 56,
          top: 24
        }}
      >
        Reimbursr
      </Text>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0
        }}
      >
        <LottieView
          style={{ justifyContent: 'center' }}
          autoPlay
          autoSize
          source={require('../animations/8502-scan-receipt.json')}
        ></LottieView>
      </View>
      <View style={{ width: '80%', position: 'absolute', bottom: 48 }}>
        <View>
          <Button
            containerStyle={{ marginVertical: 8 }}
            buttonStyle={{ backgroundColor: 'grey' }}
            titleStyle={{ fontSize: 24, fontFamily: 'Share Tech' }}
            title='Login with Google'
            onPress={() => signInWithGoogle()}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
