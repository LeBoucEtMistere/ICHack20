import React from 'react';
import {
  View,
  StatusBar,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

const Loading = props => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ActivityIndicator color={'white'} animating={true} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#999999',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
