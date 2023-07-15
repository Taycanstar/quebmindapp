import {View, Text, StyleSheet} from 'react-native';
import React from 'react';

type Props = {};

const AuthHeader = (props: Props) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Log in with your Qubemind Account</Text>
    </View>
  );
};

export default AuthHeader;

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'center',
    backgroundColor: 'black',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 24,
    color: 'black',
    fontWeight: 'bold',
    padding: 20,
    color: 'white',
    textAlign: 'center',
  },
});
