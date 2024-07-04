// AuthNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {LoginScreen} from '../screens/login'; 

const Stack = createStackNavigator();

export const AuthNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);