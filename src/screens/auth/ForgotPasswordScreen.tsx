import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StyleProp,
  ViewStyle,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import AuthHeader from '@components/auth/AuthHeader';
import CustomInput from '@components/auth/CustomInput';
import CustomButton from '@components/auth/CustomButton';
import Colors from '@utils/constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CountryPicker} from 'react-native-country-codes-picker';
import {sendCode, fetchUserByValue} from 'store/user';
import {RootState, AppDispatch} from 'store';
import {useDispatch, useSelector} from 'react-redux';
import ErrorText from '@components/ErrorText';
import LoadingButton from '@components/LoadingButton';
import {forgotPassword} from '../../store/user/index';

interface User {
  [key: string]: any;
}

type Props = {
  onBackPress: () => void;
  onForgotSuccess: (user: User, email: string) => void;
  inputBgColor: string;
  textColor: string;
  bgColor: string;
  user: User | null;
};

const ForgotPasswordScreen: React.FC<Props> = ({
  onBackPress,
  bgColor,
  textColor,
  inputBgColor,
  onForgotSuccess,
}) => {
  const [email, setEmail] = useState<string>('');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);

  const onContinuePress = async () => {
    try {
      setIsLoading(true);
      const action = await dispatch(forgotPassword(email));
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
      const user = action.payload.user;

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
        onForgotSuccess(user, email);
      }
    } catch (error) {
      console.log(error);
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    }
  };

  return (
    <View style={[styles.wrapper, {backgroundColor: bgColor}]}>
      <AntDesign
        size={20}
        name={'arrowleft'}
        color={textColor}
        onPress={onBackPress}
      />

      <View style={styles.container}>
        <AuthHeader
          textColor={textColor}
          bgColor="transparent"
          text="Find Qubemind account"
        />
        <View>
          <View>
            <View>
              <CustomInput
                textColor={textColor}
                bgColor={Colors.darkInputBg}
                placeholderTextColor={textColor}
                placeholder="Enter email"
                value={email}
                onChange={txt => setEmail(txt)}
              />
            </View>
          </View>
        </View>
        {error && <ErrorText text={errorText} />}
        <View style={{marginTop: 15}}>
          {isLoading ? (
            <LoadingButton />
          ) : (
            <CustomButton
              onPress={onContinuePress}
              textColor={textColor}
              bgColor={Colors.navy2}
              value="Next"
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    paddingBottom: 30,
    paddingLeft: 20,
    paddingRight: 20,
  },

  wrapper: {
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
  phoneInput: {
    borderColor: '#ddd',
    borderWidth: 2,
    borderRadius: 2,
    padding: 16,
  },

  countryPickerButton: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  submitButton: {
    marginLeft: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: 'blue',
    borderRadius: 4,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
