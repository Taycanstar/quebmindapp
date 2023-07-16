import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthHeader from '@components/auth/AuthHeader';
import CustomInput from '@components/auth/CustomInput';
import CustomButton from '@components/auth/CustomButton';
import CustomPasswordInput from '@components/auth/CustomPasswordInput';
import Colors from '@utils/constants/Colors';
import {loginUser, fetchUserByValue} from '../../store/user';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AnyAction} from '@reduxjs/toolkit';
import {ThunkDispatch} from 'redux-thunk';
import {RootState} from 'store';
import {useNavigation} from '@react-navigation/native';

type Props = {
  onPress: () => void;
};

const LoginScreen: React.FC<Props> = ({onPress}) => {
  const [val, setVal] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);
  const [loginType, setLoginType] = useState<string>('');
  const navigation = useNavigation();

  const dispatch = useDispatch();

  const dispatchTyped = dispatch as ThunkDispatch<
    RootState,
    undefined,
    AnyAction
  >;

  const onForgotPress = () => {};

  const handleValueChange = (value: string) => {
    // Regular expression pattern to check if the entered value is an email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(value)) {
      // The entered value is an email
      setLoginType('email');
    } else {
      // The entered value is a username
      setLoginType('text');
    }

    setVal(value);
  };

  const onLoginPress = async () => {
    try {
      if (loginType === 'email') {
        const result = (await dispatchTyped(
          loginUser({email: val.toLowerCase(), password}),
        )) as AnyAction;

        console.log(result);
      } else {
        const result = (await dispatchTyped(
          loginUser({username: val.toLowerCase(), password}),
        )) as AnyAction;
        console.log(result);
      }

      // if (user !== null) {
      //   if (user.registrationStep === 'phoneNumberVerified') {
      //     // Redirect the user to the platform/apps page
      //     router.push('/platform/apps');
      //   } else if (user.registrationStep === 'emailVerified') {
      //     // Redirect the user to the verify info page
      //     router.push('/auth/onboarding/details');
      //   } else if (user.registrationStep === 'personalInfoVerified') {
      //     // Redirect the user to the verify phone number page

      //   }
      // }
    } catch (error) {
      console.error(`Error`, error);
    }
  };
  return (
    <View style={styles.wrapper}>
      <AntDesign size={20} name={'arrowleft'} color="white" onPress={onPress} />
      <View style={styles.container}>
        {/* </View> */}
        <AuthHeader
          textColor="white"
          bgColor="transparent"
          text="Log in with your Qubemind Account"
        />
        <CustomInput
          textColor="white"
          bgColor={Colors.darkInputBg}
          placeholderTextColor="white"
          placeholder="Enter email or username"
          value={val}
          onChange={handleValueChange}
        />
        <CustomPasswordInput
          placeholderTextColor="white"
          textColor="white"
          bgColor={Colors.darkInputBg}
          placeholder="Enter password"
          value={password}
          onChange={(newText: string) => setPassword(newText)}
        />
        <TouchableOpacity onPress={onForgotPress}>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              textAlign: 'right',
              marginBottom: 20,
            }}>
            Forgot your password?
          </Text>
        </TouchableOpacity>

        <CustomButton
          onPress={onLoginPress}
          textColor="white"
          bgColor={Colors.navy2}
          value="Log in"
        />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: '500',
              textAlign: 'center',
              marginBottom: 20,
              marginRight: 10,
            }}>
            Don't have an account?
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: 'white',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: 20,
              }}>
              Signup
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 50,
  },

  wrapper: {
    paddingTop: 20,
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
});
