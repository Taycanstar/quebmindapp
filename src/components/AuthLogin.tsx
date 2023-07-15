import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, SafeAreaView, ActivityIndicator} from 'react-native';
import BrowserHeader from './BrowserHeader';
import {WebView} from 'react-native-webview';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthLogin = ({token, onClose}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const webViewRef = useRef<WebView>(null);
  const [receivedMessage, setReceivedMessage] = useState<string>('');

  const handleWebViewLoad = () => {
    setIsLoading(false);
  };
  const handleBrowserClose = () => {
    onClose();
  };

  const handleWebViewMessage = async event => {
    console.log(event.nativeEvent.data);
    const token = event.nativeEvent.data; // Assuming the data is the token
    try {
      await AsyncStorage.setItem('userToken', token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={styles.container}>
      <BrowserHeader onClose={handleBrowserClose} />

      <WebView
        ref={webViewRef}
        cacheEnabled={false}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        renderLoading={() => {
          return (
            <View
              style={{
                height: '100%',
                width: '100%',
                paddingTop: 100,
                justifyContent: 'flex-start',
                alignItems: 'center',
              }}>
              <ActivityIndicator size="small" />
            </View>
          );
        }}
        source={{uri: 'http://localhost:3000/auth/login'}}
        style={styles.webview}
        onLoadStart={event => {
          setTimeout(() => {
            setIsLoading(false);
          }, 500);
        }}
        onLoad={handleWebViewLoad}
        onMessage={handleWebViewMessage}
        onNavigationStateChange={navState => {
          // Check if the new URL is 'http://localhost:3000/platform/apps'

          setTimeout(() => {
            if (navState.url === 'http://localhost:3000/platform/apps') {
              // Close the WebView and navigate to another screen
              handleBrowserClose();
            }
          }, 2000);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    overflow: 'hidden',
    opacity: 0.99,
  },
  webview: {
    flex: 1,
    width: '100%',
    padding: 16,
    height: '100%',
    overflow: 'hidden',
    opacity: 0.99,
  },
  loadingContainer: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default AuthLogin;
