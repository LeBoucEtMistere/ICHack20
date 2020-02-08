import React from 'react';
import { Input } from 'react-native-elements';

const Email = ({ setEmail, email, nextFieldRef }) => {
  return (
    <Input label={'Your Email Address'} autoCorrect={false} autoCapitalize={'none'} placeholder="banana@foodprint.co" value={email} returnKeyType={'next'} onChangeText={value => setEmail(value)} onSubmitEditing={() => nextFieldRef.current.focus()} />
  );
};

export default Email;
