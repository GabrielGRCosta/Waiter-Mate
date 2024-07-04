// BillNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import BillScreen from '../screens/bill'; // Supondo que você tenha uma tela para a cobrança

const Stack = createStackNavigator();

export const BillNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Bill" component={BillScreen} />
  </Stack.Navigator>
);