import React from 'react';
import {StyleSheet, View, TouchableOpacity, Image, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const BrowserHeader: React.FC = ({onClose}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onClose} style={styles.button}>
        <AntDesign name="arrowleft" size={22} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>auth.qubemind.com</Text>
      <TouchableOpacity style={styles.button}>
        {/* <Image
          style={styles.icon}
          source={require('../path/to/refresh-icon.png')}
        /> */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 4,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  button: {
    padding: 8,
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default BrowserHeader;
