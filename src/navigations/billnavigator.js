// BillNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BillScreen from '../screens/bill'; 

const Stack = createStackNavigator();

export const BillNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Bill" component={BillScreen} />
  </Stack.Navigator>
);