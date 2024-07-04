import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BillScreen } from '../screens/bill'; 

const { Navigator, Screen } = createStackNavigator();

export const BillNavigator = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name='Bill' component={BillScreen} />
  </Navigator>
);
