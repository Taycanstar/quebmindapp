import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

type Props = {
  textColor?: string;
  bgColor?: string;
  text?: string;
};

const AuthHeader: React.FC<Props> = ({textColor, bgColor, text}) => {
  return (
    <View style={[styles.container, {backgroundColor: bgColor}]}>
      <Text style={[styles.text, {color: textColor}]}>{text}</Text>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    padding: 20,

    textAlign: 'center',
  },
});
