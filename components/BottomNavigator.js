import React from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import { createAppContainer,createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import HomeScreen from '../screens/HomeScreen'
import ExchangeScreen from '../screens/ExchangeScreen'
import LoginScreen from '../screens/LoginScreen'

export const BottomNavigator = createBottomTabNavigator({
   List:{
    screen:HomeScreen,
   navigationOptions:{
    tabBarIcon : <Image source={require("../assets/request-list.png")} style={{width:20, height:20}}/>,
  tabBarLabel : "All Goods",
   }

   } ,

    Exchange:{
   screen:ExchangeScreen,
   navigationOptions:{
   tabBarIcon : <Image source={require("../assets/request-book.png")} style={{width:20, height:20}}/>,
    tabBarLabel : "Add Item",
 }
   }
})
