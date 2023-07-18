import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Linking,
  Modal,
} from 'react-native';
import Colors from '@utils/constants/Colors';
import {transparentLogo} from '../../utils/images/ImageAssets';
import {googleLogo} from '../../utils/images/ImageAssets';
import Zocial from 'react-native-vector-icons/Zocial';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoginScreen from './LoginScreen';
import AddPersonalDetailsScreen from './AddPersonalDetailsScreen';
import VerifyPhScreen from './VerifyPhScreen';
import EnterCodeScreen from './EnterCodeScreen';

export type Props = {};
interface User {
  [key: string]: any;
}

const AuthScreen: React.FC<Props> = (Props: Props) => {
  const [isLoginVisible, setIsLoginVisible] = useState<boolean>(false);
  const [isPdVisible, setIsPdVisible] = useState<boolean>(false);
  const [isPhVisible, setIsPhVisible] = useState<boolean>(false);
  const [isCodeVisible, setIsCodeVisible] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [phoneNumber, setPhoneNumber] = useState<string>('');

  const handleVerify = (phoneNumber: string) => {
    setPhoneNumber(phoneNumber);
  };

  const handleLoginSuccess = (user: User) => {
    setLoggedInUser(user);
    if (user.registrationStep === 'phoneNumberVerified') {
      setIsLoginVisible(false);
    } else if (user.registrationStep === 'emailVerified') {
      setIsLoginVisible(false);
      setIsPdVisible(true);
    } else if (user.registrationStep === 'personalInfoVerified') {
      setIsLoginVisible(false);
      setIsPhVisible(true);
    }
  };

  const handlePdScreenNext = () => {
    setIsPdVisible(false);
    setIsPhVisible(true); // Open VerifyPhScreen modal
  };

  const handlePhScreenNext = () => {
    setIsPhVisible(false);
    setIsCodeVisible(true); // Open EnterCodeScreen modal
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
        <TouchableOpacity
          onPress={() => setIsLoginVisible(true)}
          style={styles.loginButton}>
          <Text style={styles.loginButtonTxt}>Log in</Text>
        </TouchableOpacity>
      </View>

      <TouchableWithoutFeedback onPress={() => setIsLoginVisible(false)}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={isLoginVisible}
          onRequestClose={() => setIsLoginVisible(false)}>
          <TouchableOpacity
            activeOpacity={1}
            // onPress={() => setIsLoginVisible(false)}
            style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <LoginScreen
                onLoginSuccess={handleLoginSuccess}
                onPress={() => setIsLoginVisible(false)}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => setIsPdVisible(false)}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={isPdVisible}
          onRequestClose={() => setIsPdVisible(false)}>
          <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <AddPersonalDetailsScreen
                onNext={handlePdScreenNext}
                user={loggedInUser}
                onBackPress={() => setIsPdVisible(false)}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => setIsPhVisible(false)}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={isPhVisible}
          onRequestClose={() => setIsPhVisible(false)}>
          <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <VerifyPhScreen
                onVerify={handleVerify}
                onNext={handlePhScreenNext}
                bgColor="black"
                textColor="white"
                user={loggedInUser}
                inputBgColor={Colors.darkInputBg}
                onBackPress={() => setIsPhVisible(false)}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableWithoutFeedback>

      <TouchableWithoutFeedback onPress={() => setIsCodeVisible(false)}>
        <Modal
          animationType={'slide'}
          transparent={true}
          visible={isCodeVisible}
          onRequestClose={() => setIsCodeVisible(false)}>
          <TouchableOpacity activeOpacity={1} style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <EnterCodeScreen
                phoneNumber={phoneNumber}
                bgColor="black"
                textColor="white"
                inputBgColor={Colors.darkInputBg}
                user={loggedInUser}
                onBackPress={() => setIsCodeVisible(false)}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </TouchableWithoutFeedback>
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
    height: '60%',
    // flex: 1,
    // width: '100%',
  },
});

export default AuthScreen;
