import React from 'react';
import { View } from 'react-native';
import { Text, Button } from 'react-native-elements';
import { AuthContext } from '../store/Auth';

export default SignupOrRegister = ({ navigation }) => {
  const { signInWithGoogle } = React.useContext(AuthContext);

  return (
    <View style={{ width: '100%', height: '100%', alignItems: 'center' }}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: 50
        }}
      >
        <Text h1>VegEarly</Text>
      </View>
      <View style={{ width: '80%', position: 'absolute', bottom: 48 }}>
        <View>
          <Button
            containerStyle={{ marginVertical: 8 }}
            buttonStyle={{ backgroundColor: 'grey' }}
            titleStyle={{ fontSize: 24 }}
            title='Login with Google'
            onPress={() => signInWithGoogle()}
          />
        </View>
      </View>
    </View>
  );
};
