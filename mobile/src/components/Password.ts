import React from 'react';
import { Input } from 'react-native-elements';

const Password = React.forwardRef((props, ref) => {
  const { password, setPassword, submitHandler } = props;
  return (
    <Input ref={ref} label={'Password'} autoCorrect={false} autoCapitalize={'none'} placeholder="Password" value={password} onChangeText={value => setPassword(value)} secureTextEntry={true} returnKeyType={'join'} onSubmitEditing={submitHandler} />
  );
});

export default Password;
