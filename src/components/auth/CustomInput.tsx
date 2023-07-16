import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';
import Colors from '@utils/constants/Colors';

type Props = {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  placeholderTextColor: string;
  textColor: string;
  bgColor: string;
  editable?: boolean;
  keyboardType?: string;
  maxLength?: number;
};

const CustomInput: React.FC<Props> = ({
  value,
  onChange,
  placeholder,
  textColor,
  bgColor,
  placeholderTextColor,
  editable,
  keyboardType,
  maxLength,
}) => {
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <TextInput
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={[styles.input, {color: textColor}]}
        autoCapitalize="none"
      />
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  input: {
    backgroundColor: 'transparent',
  },
});
