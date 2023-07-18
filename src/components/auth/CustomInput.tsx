import {View, Text, StyleSheet, TextInput} from 'react-native';
import React from 'react';

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
  onBlur?: () => void;
  onFocus?: () => void;
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
  onBlur,
  onFocus,
}) => {
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <TextInput
        onBlur={onBlur}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        style={[styles.input, {color: textColor}]}
        autoCapitalize="none"
        onFocus={onFocus}
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
    width: '100%',
  },
  input: {
    backgroundColor: 'transparent',
    width: '100%',
  },
});
