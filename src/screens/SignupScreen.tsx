import {View, Text, StyleSheet} from 'react-native';
import React, {useState, useContext} from 'react';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from '@utils/config/themeContext';

type Props = {};

const SignupScreen = (props: Props) => {
    const theme = useContext(themeContext)
  const [mode, setMode] = useState(false);
  return (
    <View style={[styles.container, {backgroundColor:theme.background}]}>
      <Text>SignupScreen</Text>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1;
    }
})