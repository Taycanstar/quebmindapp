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
import CustomPasswordInput from '@components/auth/CustomPasswordInput';
import CustomButton from '@components/auth/CustomButton';
import Colors from '@utils/constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CountryPicker} from 'react-native-country-codes-picker';
import {sendCode, fetchUserByValue} from 'store/user';
import {RootState, AppDispatch} from 'store';
import {useDispatch, useSelector} from 'react-redux';
import ErrorText from '@components/ErrorText';
import SuccessText from '@components/SuccessText';
import LoadingButton from '@components/LoadingButton';
import {forgotPassword} from '../../store/user/index';

interface User {
  [key: string]: any;
}

type Props = {
  onBackPress: () => void;
  onResetSuccess: (user: User, email: string) => void;
  inputBgColor: string;
  textColor: string;
  bgColor: string;
  user: User | null;
};

const ResetPasswordScreen: React.FC<Props> = ({
  onBackPress,
  bgColor,
  textColor,
  inputBgColor,
  onResetSuccess,
}) => {
  const [password, setPassword] = useState<string>('');
  const [show, setShow] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');
  const [error, setError] = useState<boolean>(false);
  const [successText, setSuccessText] = useState<string>('');
  const [success, setSuccess] = useState<boolean>(false);

  const onContinuePress = async () => {
    //add data
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
          text="Enter your new password"
        />
        <View>
          <View>
            <View>
              <CustomPasswordInput
                placeholderTextColor="white"
                textColor="white"
                bgColor={Colors.darkInputBg}
                placeholder="Enter password"
                value={password}
                onChange={txt => setPassword(txt)}
              />
            </View>
          </View>
        </View>
        {error && <ErrorText text={errorText} />}
        {error && <SuccessText text={successText} />}
        <View style={{marginTop: 15}}>
          {isLoading ? (
            <LoadingButton />
          ) : (
            <CustomButton
              onPress={onContinuePress}
              textColor={textColor}
              bgColor={Colors.navy2}
              value="Continue"
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default ResetPasswordScreen;

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
