import React, { useEffect, useCallback, useState } from 'react';
import { NavigationNativeContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';
import Loading from './src/screens/Loading';
import Home from './src/containers/Friendlist';
import { AuthContext } from './src/store/Auth';
import auth from '@react-native-firebase/auth';
import Login from './src/screens/Login';
import {
  GoogleSignin,
  User,
  statusCodes
} from '@react-native-community/google-signin';
import Axios from 'axios';

const Stack = createStackNavigator();

const App = () => {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null
    }
  );

  const fetchUserFromStorage = useCallback(async () => {
    const userLoggedIn = await AsyncStorage.getItem('userLoggedIn');

    if (userLoggedIn) {
      try {
        console.log('Silent login due to LoggedIn state in async storage.');
        const userInfo = await GoogleSignin.signInSilently();
        console.log({ userInfo });
        const { accessToken } = await GoogleSignin.getTokens();
        Axios.interceptors.request.use(config => {
          console.log({ config });
          return config;
        });
      } catch (error) {
        console.log({ error });
        if (error.code === statusCodes.SIGN_IN_CANCELLED) {
          console.log('user cancelled the login flow');
        } else if (error.code === statusCodes.IN_PROGRESS) {
          console.log('operation (e.g. sign in) is in progress already');
        } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
          console.log('play services not available or outdated');
        } else {
          console.log({ error });
        }
      }
    }
  }, []);

  useEffect(() => {
    console.log('Configuring Google Sign in');
    GoogleSignin.configure({
      scopes: [],
      webClientId:
        '254664784940-fvguvda3lrkafj05lhoa5a7k1ikj5989.apps.googleusercontent.com',
      offlineAccess: true
    });
    fetchUserFromStorage();

    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      // After restoring token, we may need to validate it in production apps

      // This will switch to the App screen or Auth screen and this loading
      // screen will be unmounted and thrown away.
      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
    SplashScreen.hide();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signInWithGoogle: async () => {
        try {
          console.log('');
          await GoogleSignin.hasPlayServices();
          const userInfo = await GoogleSignin.signIn();
          console.log({ userInfo });
          const { accessToken: token } = await GoogleSignin.getTokens();
          await AsyncStorage.setItem('userToken', token);
          dispatch({ type: 'SIGN_IN', token });
        } catch (error) {
          // setInternetEnabled passed into login, change it here. (add retry)
          if (error.code === statusCodes.SIGN_IN_CANCELLED) {
            // user cancelled the login flow
          } else if (error.code === statusCodes.IN_PROGRESS) {
            // operation (e.g. sign in) is in progress already
          } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
            // play services not available or outdated
          } else {
            // some other error happened
            console.log({ error });
          }
        }
      },
      signOut: () => {
        AsyncStorage.removeItem('userToken');
        GoogleSignin.signOut();
        dispatch({ type: 'SIGN_OUT' });
      }
    }),
    []
  );

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationNativeContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {state.isLoading ? (
            // We haven't finished checking for the token yet
            <Stack.Screen name='Loading' component={Loading} />
          ) : state.userToken === null ? (
            // No token found, user isn't signed in
            <Stack.Screen
              name='Login'
              component={Login}
              options={{
                title: 'Login',
                // When logging out, a pop animation feels intuitive
                animationTypeForReplace: state.isSignout ? 'pop' : 'push'
              }}
            />
          ) : (
            <Stack.Screen name='Home' component={Home} />
          )}
        </Stack.Navigator>
      </NavigationNativeContainer>
    </AuthContext.Provider>
  );
};

export default App;
