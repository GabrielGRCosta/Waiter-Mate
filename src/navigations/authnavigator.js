import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { LoginScreen } from '../screens/login'; 

const { Navigator, Screen } = createStackNavigator();

export const AuthNavigator = () => (
  <Navigator>
    <Screen name='Login' component={LoginScreen} />
  </Navigator>
);
