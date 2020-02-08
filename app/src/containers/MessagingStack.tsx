import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Camera from '../screens/Camera';
import AllMessages from '../screens/AllMessages';

const Stack = createStackNavigator();

const MessagingStack = () => {
  return (
    <Stack.Navigator initialRouteName='Overview'>
      <Stack.Screen
        name='AllMessages'
        component={AllMessages}
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen name='Camera' component={Camera}></Stack.Screen>
    </Stack.Navigator>
  );
};

export default MessagingStack;
