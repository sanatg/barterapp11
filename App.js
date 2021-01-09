import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {BottomNavigator} from './components/BottomNavigator';
import LoginScreen from './screens/LoginScreen'
import { AppDrawerNavigator } from './components/AppDrawerNavigator';

export default function App() {
  return (
      <AppContainer/>
  );
}

 const SwitchNavigator = createSwitchNavigator({
   LoginScreen: { screen: LoginScreen},   
   Drawer: { screen: AppDrawerNavigator}


 })

 const AppContainer = createAppContainer(SwitchNavigator);
