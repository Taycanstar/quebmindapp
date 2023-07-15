import {View, Text, StyleSheet, TextInput} from 'react-native';
import React, {useState} from 'react';
import Colors from '@utils/constants/Colors';
import Feather from 'react-native-vector-icons/Feather';

type Props = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  textColor: string;
  bgColor: string;
  placeholderTextColor: string;
};

const CustomInput = ({
  value,
  onChange,
  placeholder,
  secureTextEntry,
  textColor,
  bgColor,
  placeholderTextColor,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const onEyePress = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <TextInput
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={[styles.input, {color: textColor}]}
        autoCapitalize="none"
        secureTextEntry={!isPasswordVisible}
        maxLength={26}
      />
      <View style={styles.iconContainer}>
        {isPasswordVisible ? (
          <Feather
            onPress={onEyePress}
            size={25}
            name={'eye-off'}
            color={textColor}
          />
        ) : (
          <Feather
            onPress={onEyePress}
            size={25}
            name={'eye'}
            color={textColor}
          />
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    backgroundColor: 'transparent',
  },
  iconContainer: {},
});
