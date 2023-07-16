import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, View} from 'react-native';
import AppNavigator from '@navigation/AppNavigator';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from '@utils/config/themeContext';
import theme from '@utils/config/theme';
import {Provider} from 'react-redux';
import {store} from './src/store';

function App(): JSX.Element {
  const [mode, setMode] = useState(false);

  useEffect(() => {
    let eventListener = EventRegister.addEventListener('changeTheme', data => {
      setMode(data);
    });
    return () => {
      EventRegister.removeEventListener(eventListener);
    };
  }, []);

  return (
    <Provider store={store}>
      <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
        <AppNavigator />
      </themeContext.Provider>
    </Provider>
  );
}

export default App;
