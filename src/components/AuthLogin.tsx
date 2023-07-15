import React, {useState, useEffect, useRef} from 'react';
import {StyleSheet, View, SafeAreaView, ActivityIndicator} from 'react-native';
import BrowserHeader from './BrowserHeader';
import {WebView} from 'react-native-webview';

const AuthLogin = ({token, onClose}) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const webViewRef = useRef<WebView>(null);
  const [receivedMessage, setReceivedMessage] = useState('');

  const handleWebViewLoad = () => {
    setIsLoading(false);
  };
  const handleBrowserClose = () => {
    onClose();
  };

  const handleWebViewMessage = event => {
    const data = JSON.parse(event.nativeEvent.data);
    console.log(data); // Process the message data as needed
    // Rest of your logic...
  };

  useEffect(() => {
    // Add an event listener to receive messages from the WebView
    // Note: The `onMessage` prop of WebView already adds an event listener
    // So, you don't need to manually add/remove event listeners.

    // Clean up the event listener on component unmount
    return () => {
      // No need to remove the event listener here since it's handled internally by the WebView component.
    };
  }, []);
  console.log(receivedMessage, 'msg');
  return (
    <View style={styles.container}>
      <BrowserHeader onClose={handleBrowserClose} />

      <WebView
        ref={webViewRef}
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
        onLoad={handleWebViewLoad}
        onMessage={event => handleWebViewMessage(event)}
        onNavigationStateChange={navState => {
          // Check if the new URL is 'http://localhost:3000/platform/apps'
          if (navState.url === 'http://localhost:3000/platform/apps') {
            // Close the WebView and navigate to another screen
            handleBrowserClose();
          }
        }}
        //       injectedJavaScript={`
        //     window.postMessage(JSON.stringify({ token: '${token}' }));
        //   `

        // }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    overflow: 'hidden',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  webview: {
    flex: 1,
    width: '100%',
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AuthLogin;
