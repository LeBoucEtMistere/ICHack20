import React, { useState, useContext } from 'react';
import { SafeAreaView, StyleSheet, View, Linking } from 'react-native';
import { Text, ListItem } from 'react-native-elements';
import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../store/Auth';

interface Props {}

const Settings: React.FC<Props> = ({ navigation }) => {
  const [errors, setErrors] = useState<string[]>([]);
  const { signOut } = useContext(AuthContext);

  const logoutHandler = () => {
    AsyncStorage.removeItem('userToken');
    signOut();
    navigation.reset();
  };

  const openSetUpBankAccount = () => {
    navigation.navigate('Bank Account');
  };

  const openEmail = () => {
    Linking.openURL('mailto:ben@fresla.co?subject=Bed%20App%20Support').catch(
      err => {
        setErrors(['Unable to open mail app, do you have one set?']);
      }
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{'Settings'}</Text>
        <Text>let us know if you need help.</Text>
      </View>
      <View style={styles.listContainer}>
        <ListItem
          containerStyle={styles.buttonContainer}
          title='Connect bank account'
          topDivider
          bottomDivider
          onPress={openSetUpBankAccount}
        />
        <ListItem
          containerStyle={styles.buttonContainer}
          title='Email us'
          topDivider
          bottomDivider
          onPress={openEmail}
        />
        <ListItem
          containerStyle={styles.buttonContainer}
          title='Log out'
          bottomDivider
          onPress={logoutHandler}
        />
      </View>
      <View>
        {errors.map((error, i) => (
          <Text key={i}>Error: {error}</Text>
        ))}
      </View>
    </SafeAreaView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  titleContainer: {
    margin: 8
  },
  title: {
    fontSize: 24
  },
  listContainer: {
    width: '100%'
  },
  buttonContainer: {
    marginTop: 0,
    width: '100%'
  },
  button: {
    height: 48
  },
  revokeButton: {
    backgroundColor: '#bc0303'
  }
});
