import React from 'react';
import { Text, View } from 'react-native';
import LottieView from 'lottie-react-native';

interface Props {}

const BankAccount: React.FC<Props> = () => {
  return (
    <View
      style={{
        backgroundColor: 'black',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <LottieView
        style={{ justifyContent: 'center', width: '100%' }}
        autoPlay
        source={require('../animations/3738-blockchain-2.json')}
      ></LottieView>
    </View>
  );
};

export default BankAccount;
