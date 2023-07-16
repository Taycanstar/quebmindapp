import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Colors from '@utils/constants/Colors';

type Props = {
  textColor: string;
  bgColor: string;
  value: string;
  onPress: () => void;
};

const CustomButton: React.FC<Props> = ({
  textColor,
  bgColor,
  value,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.container, {backgroundColor: bgColor}]}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: textColor,
          textAlign: 'center',
        }}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
});
