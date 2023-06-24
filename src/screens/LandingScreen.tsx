import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import Colors from '@utils/constants/Colors';
import {transparentLogo} from '../utils/images/ImageAssets';
import {googleLogo} from '../utils/images/ImageAssets';
import {appleLogo} from '../utils/images/ImageAssets';
import {emailImg} from '../utils/images/ImageAssets';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export type Props = {};

const LandingScreen: React.FC<Props> = (Props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageWrapper}>
        <Image style={styles.logo} source={transparentLogo} />
        <View />
      </View>
      <View style={styles.socialContainer}>
        <TouchableOpacity style={styles.whiteButton}>
          <FontAwesome size={15} name={'apple'} color="black" />
          <Text style={styles.whiteButtonTxt}>Continue with Apple</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.darkButton}>
          <Image style={styles.googleLogo} source={googleLogo} />
          <Text style={styles.darkButtonTxt}>Continue with Google</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.darkButton}>
          <Zocial name={'email'} size={18} color="white" />
          <Text style={styles.darkButtonTxt}>Continue with email</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonTxt}>Log in</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 0.5,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.navy2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
  },
  socialContainer: {
    position: 'absolute',
    backgroundColor: 'black',
    flex: 1,
    width: '100%',
    justifyContentL: 'center',
    alignItems: 'center',
    height: '35%',
    padding: 25,
    bottom: 0,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  darkButton: {
    backgroundColor: Colors.darkGrayBg2,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  darkButtonTxt: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  whiteButtonTxt: {
    color: 'black',
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 10,
  },
  whiteButton: {
    backgroundColor: 'white',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  googleLogo: {
    width: 20,
    height: 20,
  },
  appleLogo: {
    width: 15,
    height: 15,
  },
  emailImg: {
    height: 25,
    width: 25,
  },
  loginButton: {
    backgroundColor: 'black',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.darkGrayBg2,
    padding: 10,
  },
  loginButtonTxt: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default LandingScreen;
