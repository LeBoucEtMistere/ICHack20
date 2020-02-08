import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Camera from '../screens/Camera';
import Home from '../screens/Home';
import Settings from './Settings';
import BankAccount from '../screens/BankAccount';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Home' component={Home}></Stack.Screen>
      <Stack.Screen name='Camera' component={Camera}></Stack.Screen>
      <Stack.Screen name='Settings' component={Settings}></Stack.Screen>
      <Stack.Screen name='Bank Account' component={BankAccount}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default HomeStack;
