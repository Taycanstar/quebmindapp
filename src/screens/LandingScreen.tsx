import React, {useState, useEffect} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
} from 'react-native';
import Colors from '@utils/constants/Colors';
import {transparentLogo} from '../utils/images/ImageAssets';

export type Props = {};

const LandingScreen: React.FC<Props> = (Props: Props) => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image style={styles.logo} source={transparentLogo} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
});

export default LandingScreen;
