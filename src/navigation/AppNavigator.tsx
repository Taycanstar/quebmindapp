import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthScreen from '../screens/auth/AuthScreen';
import AddPersonalDetailsScreen from '../screens/auth/AddPersonalDetailsScreen';
import LoginScreen from '../screens/auth/LoginScreen';
import HomeScreen from '../screens/HomeScreen';
import {useSelector} from 'react-redux';

export type Props = {};

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {/* <Stack.Screen name="Login" component={LoginScreen} /> */}
      <Stack.Screen name="Auth" component={AuthScreen} />
    </Stack.Navigator>
  );
};

const MainTab = () => (
  <Tab.Navigator>
    <Tab.Screen name="Home" component={HomeScreen} />
  </Tab.Navigator>
);

const MainStack = () => (
  // <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
  <Drawer.Navigator>
    <Drawer.Screen name="MainTab" component={MainTab} />
    {/* Add more screens in your main stack if needed */}
  </Drawer.Navigator>
);

const AppNavigator: React.FC<Props> = (Props: Props) => {
  const userStatus = useSelector((state: any) => state.user.status);
  return (
    <NavigationContainer>
      {userStatus === 'loggedIn' ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;
