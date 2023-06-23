import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import LandingScreen from '@screens/LandingScreen';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useSelector} from 'react-redux';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

export type Props = {};

const Stack = createNativeStackNavigator();
const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Landing" component={LandingScreen} />
    </Stack.Navigator>
  );
};

// const Tab = createBottomTabNavigator();
// function HomeTabs() {
//   return (
//     <Tab.Navigator>
//       <Tab.Screen name="Home" component={LandingScreen} />
//     </Tab.Navigator>
//   );
// }

// const Drawer = createDrawerNavigator();
// function DrawerNav() {
//   return (
//     <Drawer.Navigator initialRouteName="Home">
//       <Drawer.Screen name="Home" component={HomeTabs} />
//     </Drawer.Navigator>
//   );
// }

const AppNavigator: React.FC<Props> = (Props: Props) => {
  const [token, setToken] = useState(null);

  return (
    <NavigationContainer>
      {token === null ? <AuthStack /> : null}
    </NavigationContainer>
  );
};

export default AppNavigator;
