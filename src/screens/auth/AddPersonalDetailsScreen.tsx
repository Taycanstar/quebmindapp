import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import AuthHeader from '@components/auth/AuthHeader';
import CustomInput from '@components/auth/CustomInput';
import CustomButton from '@components/auth/CustomButton';
import CustomPasswordInput from '@components/auth/CustomPasswordInput';
import Colors from '@utils/constants/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {addPersonalInfo, fetchUserByValue} from 'store/user';
import {RootState, AppDispatch} from 'store';
import {useDispatch, useSelector} from 'react-redux';

interface User {
  [key: string]: any;
}

type Props = {
  onBackPress: () => void;
  onNext: () => void;
  user: User | null;
};

const AddPersonalDetailsScreen: React.FC<Props> = ({
  onBackPress,
  onNext,
  user,
}) => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [organizationName, setOrganizationName] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const dispatch = useDispatch<AppDispatch>();
  const userId: string = user?._id?.toString() || '';
  const [isBdFocused, setIsBdFocused] = useState<boolean>(false);

  const handleBdFocus = () => {
    setIsBdFocused(true);
  };

  const handleBdBlur = () => {
    setIsBdFocused(false);
  };

  const onForgotPress = () => {};

  const handleFirstNameChange = (value: string) => {
    setFirstName(value);
  };

  const handleLastNameChange = (value: string) => {
    setLastName(value);
  };

  const handleOrgChange = (value: string) => {
    setOrganizationName(value);
  };

  const handleBdChange = (value: string) => {
    const input = value.replace(/\D/g, ''); // Remove non-digit characters
    let formattedDate = '';

    if (input.length > 0) {
      formattedDate += input.substr(0, 2);
    }
    if (input.length > 2) {
      formattedDate += '/' + input.substr(2, 2);
    }
    if (input.length > 4) {
      formattedDate += '/' + input.substr(4, 4);
    }

    setBirthday(formattedDate);
  };

  const userData = {
    id: userId,
    firstName,
    lastName,
    organizationName,
    birthday,
  };

  const onContinuePress = async () => {
    try {
      // Dispatch the confirmUser action with the necessary payload
      const res = await dispatch(
        addPersonalInfo({
          id: userId,
          firstName,
          lastName,
          organizationName,
          birthday,
        }),
      );

      onNext();
      // Handle success or perform additional actions
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.wrapper}>
      <AntDesign
        size={20}
        name={'arrowleft'}
        color="white"
        onPress={onBackPress}
      />

      <View style={styles.container}>
        <AuthHeader
          textColor="white"
          bgColor="transparent"
          text="Tell us about yourself"
        />
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
          }}>
          <View style={{width: '48.5%'}}>
            <CustomInput
              textColor="white"
              bgColor={Colors.darkInputBg}
              placeholderTextColor="white"
              placeholder="First name"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </View>
          <View style={{width: '48.5%'}}>
            <CustomInput
              textColor="white"
              bgColor={Colors.darkInputBg}
              placeholderTextColor="white"
              placeholder="Last name"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </View>
        </View>
        <CustomInput
          textColor="white"
          bgColor={Colors.darkInputBg}
          placeholderTextColor="white"
          placeholder="Organization name (optional)"
          value={organizationName}
          onChange={handleOrgChange}
        />
        <CustomInput
          textColor="white"
          bgColor={Colors.darkInputBg}
          placeholderTextColor="white"
          placeholder={isBdFocused ? 'MM/DD/YYYY' : 'Birthday'}
          value={birthday}
          onChange={handleBdChange}
          onFocus={handleBdFocus}
          onBlur={handleBdBlur}
        />

        <View style={{marginTop: 15}}>
          <CustomButton
            onPress={onContinuePress}
            textColor="white"
            bgColor={Colors.navy2}
            value="Continue"
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
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
            By proceeding with "Continue" you consent to our Terms of Service
            and recognize our Privacy Policy.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default AddPersonalDetailsScreen;

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
    backgroundColor: 'black',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
    height: '100%',
    paddingHorizontal: 20,
  },
});
