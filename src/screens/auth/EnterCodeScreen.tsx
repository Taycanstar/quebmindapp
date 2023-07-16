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

type Props = {
  onBackPress: () => void;
  inputBgColor: string;
  textColor: string;
  bgColor: string;
};

const EnterCodeScreen: React.FC<Props> = ({
  onBackPress,
  bgColor,
  textColor,
  inputBgColor,
}) => {
  const [code, setCode] = useState<string>('');
  const onContinuePress = () => {};

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
          text="Enter code"
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: -25,
          }}>
          <Text
            style={{
              color: 'white',
              fontSize: 12,
              fontWeight: '500',
              textAlign: 'center',
              marginBottom: 20,
              marginRight: 10,
            }}>
            Input the code that was recently sent to you.
          </Text>
        </View>

        <CustomInput
          textColor={textColor}
          bgColor={Colors.darkInputBg}
          placeholderTextColor={textColor}
          placeholder="Enter 6-digit code"
          value={code}
          onChange={txt => setCode(txt)}
          keyboardType="numeric"
          maxLength={6}
        />

        <View style={{marginTop: 15}}>
          <CustomButton
            onPress={onContinuePress}
            textColor={textColor}
            bgColor={bgColor}
            value="Resend code"
          />
        </View>
      </View>
    </View>
  );
};

export default EnterCodeScreen;

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
