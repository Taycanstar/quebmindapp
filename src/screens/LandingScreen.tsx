import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Linking,
  Modal,
} from 'react-native';
import {WebView} from 'react-native-webview';
import Colors from '@utils/constants/Colors';
import {transparentLogo} from '../utils/images/ImageAssets';
import {googleLogo} from '../utils/images/ImageAssets';
import {appleLogo} from '../utils/images/ImageAssets';
import {emailImg} from '../utils/images/ImageAssets';
import Zocial from 'react-native-vector-icons/Zocial';
import BrowserHeader from '@components/BrowserHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AuthLogin from '@components/AuthLogin';
export type Props = {};

const LandingScreen: React.FC<Props> = (Props: Props) => {
  const [token, setToken] = useState<string>('');
  const [showWebView, setShowWebView] = useState<boolean>(false);

  // useEffect(() => {
  //   // Add event listener for deep links
  //   Linking.addEventListener('url', handleDeepLink);

  //   // Clean up the event listener on component unmount
  //   return () => {
  //     Linking.removeEventListener('url', handleDeepLink);
  //   };
  // }, []);

  const handleDeepLink = (event: {url: string}) => {
    // Extract authentication information from the deep link URL
    const {token} = Linking.parse(event.url).queryParams;

    // TODO: Authenticate the user using the extracted token and navigate to the appropriate screen

    // Update app state or dispatch an action to reflect the authentication status
    // Navigate to the appropriate screen in your app
    navigateToHomeScreen();
  };

  const onLoginPress = async () => {
    const loginURL = 'http://localhost:3000/auth/login'; // Replace with your login URL
    const supported = await Linking.canOpenURL(loginURL);

    if (supported) {
      await Linking.openURL(loginURL);
    } else {
      console.log('Cannot open URL');
    }
  };

  const handleLoginPress = () => {
    setShowWebView(true);
  };

  const handleCloseWebView = () => {
    setShowWebView(false);
  };

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
        <TouchableOpacity onPress={handleLoginPress} style={styles.loginButton}>
          <Text style={styles.loginButtonTxt}>Log in</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={showWebView} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <AuthLogin token={token} onClose={handleCloseWebView} />
          </View>
        </View>
      </Modal>
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

  modalContainer: {
    flex: 1,

    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 0,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: '90%',
  },
});

export default LandingScreen;
