import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home';
import { BillScreen } from '../screens/bill';
import { BottomTab } from '../components/bottomtab';

const { Navigator, Screen } = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Home' component={ HomeScreen }/>
      <Screen name='Bill' component={ BillScreen }/>
    </Navigator>
    <BottomTab />
  </NavigationContainer>
);
