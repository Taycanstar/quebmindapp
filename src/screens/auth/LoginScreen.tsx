import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthHeader from '@components/auth/AuthHeader';
import CustomInput from '@components/auth/CustomInput';
import CustomButton from '@components/auth/CustomButton';
import ErrorText from '@components/ErrorText';
import LoadingButton from '@components/LoadingButton';
import CustomPasswordInput from '@components/auth/CustomPasswordInput';
import Colors from '@utils/constants/Colors';
import {loginUser, fetchUserByValue, fakeLoginUser} from '../../store/user';
import {useDispatch, useSelector} from 'react-redux';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AnyAction} from '@reduxjs/toolkit';
import {ThunkDispatch} from 'redux-thunk';
import {RootState, AppDispatch} from 'store';
import {useNavigation} from '@react-navigation/native';

interface User {
  [key: string]: any;
}

type Props = {
  onPress: () => void;
  onLoginSuccess: (user: User) => void;
  // user: User | null;
};

const LoginScreen: React.FC<Props> = ({onPress, onLoginSuccess}) => {
  const [val, setVal] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginType, setLoginType] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const [user, setUser] = useState<User | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const fetchUserData = async () => {
    try {
      const response = await dispatch(fetchUserByValue(val));
      if (response.payload) {
        setUser(response.payload); // Access the payload with the user data
      }
    } catch (error) {
      // Handle error
      console.log(error);
    }
  };

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

  // const fetchUserAndLogin = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await dispatch(fetchUserByValue(val));
  //     if ('error' in response) {
  //       setError(true);
  //       setErrorText((response.payload as {message: string}).message);
  //       setTimeout(() => {
  //         setError(false);
  //       }, 4000);
  //       console.log(
  //         `Error on Screen`,
  //         (response.payload as {message: string}).message,
  //       );
  //       setIsLoading(false);
  //     } else if (response.payload) {
  //       const user = response.payload;
  //       // const isMatch = await BcryptReactNative.compareSync(
  //       //   password,
  //       //   user.password,
  //       // );
  //       const isMatch = true;
  //       console.log(isMatch, 'match');
  //       if (!isMatch) {
  //         setError(true);
  //         setErrorText('Incorrect password');
  //         setTimeout(() => {
  //           setError(false);
  //         }, 4000);
  //         setTimeout(() => {
  //           setIsLoading(false);
  //         }, 500);
  //       } else {
  //         if (user.registrationStep === 'phoneNumberVerified') {
  //           if (loginType === 'email') {
  //             await dispatch(loginUser({email: val.toLowerCase(), password}));
  //           } else {
  //             await dispatch(
  //               loginUser({username: val.toLowerCase(), password}),
  //             );
  //           }
  //           onLoginSuccess(user);
  //         } else if (user.registrationStep === 'emailVerified') {
  //           onLoginSuccess(user);
  //         } else if (user.registrationStep === 'personalInfoVerified') {
  //           onLoginSuccess(user);
  //         }
  //       }
  //     }
  //   } catch (error: any) {
  //     setTimeout(() => {
  //       setIsLoading(false);
  //     }, 500);
  //   }
  // };

  // const onLogin = () => {
  //   fetchUserAndLogin();
  // };

  const handleLogin = async () => {
    setIsLoading(true);
    let action;
    if (loginType === 'email') {
      action = await dispatch(
        fakeLoginUser({email: val.toLowerCase(), password}),
      );
    } else {
      action = await dispatch(
        fakeLoginUser({username: val.toLowerCase(), password}),
      );
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 500);

    if ('error' in action) {
      setError(true);
      setErrorText((action.payload as {message: string}).message);
      setTimeout(() => {
        setError(false);
      }, 4000);
      console.log(
        `Error on Screen`,
        (action.payload as {message: string}).message,
      );
    } else {
      const user = action.payload.user;
      console.log(user.registrationStep, '<== user');

      if (user.registrationStep === 'phoneNumberVerified') {
        if (loginType === 'email') {
          await dispatch(loginUser({email: val.toLowerCase(), password}));
        } else {
          await dispatch(loginUser({username: val.toLowerCase(), password}));
        }
        onLoginSuccess(user);
      } else if (user.registrationStep === 'emailVerified') {
        onLoginSuccess(user);
      } else if (user.registrationStep === 'personalInfoVerified') {
        onLoginSuccess(user);
      }
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
        {error && <ErrorText text={errorText} />}

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

        {isLoading ? (
          <LoadingButton />
        ) : (
          <CustomButton
            onPress={handleLogin}
            textColor="white"
            bgColor={Colors.navy2}
            value="Log in"
          />
        )}

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
