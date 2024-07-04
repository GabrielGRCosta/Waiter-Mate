import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { BillScreen } from '../screens/bill';
import { OrderScreen } from '../screens/order';

const { Navigator, Screen } = createStackNavigator();

export const BillNavigator = () => (
  <Navigator screenOptions={{ headerShown: false }}>
    <Screen name='Bill' component={BillScreen} />
    <Screen name='Order' component={OrderScreen} />
  </Navigator>
);
