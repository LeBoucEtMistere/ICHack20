import React from 'react';
import { Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';

interface Props {}

const ErrorScreen: React.FC<Props> = ({ route }) => {
  const { error, navigation } = route.params;
  console.log({ params: route.params });

  return (
    <View
      style={{
        height: '100%',
        width: '100%',
        alignItems: 'center'
      }}
    >
      <Image
        style={{ width: '100%', height: '75%' }}
        source={require('../../assets/images/meme.jpg')}
      />
      <Text
        style={{
          opacity: 0.5,
          fontFamily: 'Share Tech',
          fontSize: 32,
          paddingHorizontal: 32,
          paddingTop: 16,
          textAlign: 'center'
        }}
      >
        Oops, our servers chickened out.
      </Text>
      <View
        style={{
          width: '75%',
          margin: 8,
          position: 'absolute',
          bottom: 32
        }}
      >
        <Button
          title={'Go back in time and hack.'}
          buttonStyle={{ backgroundColor: 'grey' }}
          onPress={() => navigation.navigate('Home')}
        ></Button>
      </View>
    </View>
  );
};

export default ErrorScreen;
