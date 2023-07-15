import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthHeader from '@components/auth/AuthHeader';
import CustomInput from '@components/auth/CustomInput';
import CustomButton from '@components/auth/CustomButton';
import CustomPasswordInput from '@components/auth/CustomPasswordInput';
import Colors from '@utils/constants/Colors';

type Props = {};

const LoginScreen = (props: Props) => {
  const [val, setVal] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const onForgotPress = () => {};
  return (
    <View style={styles.container}>
      <AuthHeader />
      <CustomInput
        textColor="white"
        bgColor={Colors.darkInputBg}
        placeholderTextColor="white"
        placeholder="Enter email or username"
        value={val}
        onChange={newText => setVal(newText)}
      />
      <CustomPasswordInput
        placeholderTextColor="white"
        textColor="white"
        bgColor={Colors.darkInputBg}
        placeholder="Enter password"
        value={password}
        onChange={newText => setPassword(newText)}
      />
      <TouchableOpacity onPress={onForgotPress}>
        <Text
          style={[
            styles.botText,
            {
              color: 'white',
              fontWeight: 500,
              textAlign: 'right',
              marginBottom: 20,
            },
          ]}>
          Forgot your password?
        </Text>
      </TouchableOpacity>
      <CustomButton textColor="white" bgColor={Colors.navy2} value="Log in" />
      <View
        style={{flexDirection: 'row', justifyContent: 'center', marginTop: 5}}>
        <Text
          style={[
            styles.botText,
            {
              color: 'white',
              fontWeight: 500,
              textAlign: 'center',
              marginBottom: 20,
              marginRight: 10,
            },
          ]}>
          Don't have an account?
        </Text>
        <TouchableOpacity>
          <Text
            style={[
              styles.botText,
              {
                color: 'white',
                fontWeight: 700,
                textAlign: 'center',
                marginBottom: 20,
              },
            ]}>
            Signup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingBottom: 50,
    paddingLeft: 50,
    paddingRight: 50,
    paddingTop: 20,
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});
