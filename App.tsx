import React, {useState, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {SafeAreaView, View} from 'react-native';
import AppNavigator from '@navigation/AppNavigator';
import {EventRegister} from 'react-native-event-listeners';
import themeContext from '@utils/config/themeContext';
import theme from '@utils/config/theme';

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
    <themeContext.Provider value={mode === true ? theme.dark : theme.light}>
      <AppNavigator />
    </themeContext.Provider>
  );
}

export default App;
