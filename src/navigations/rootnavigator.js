// RootNavigator.js
import React, { useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './authnavigator';
import { AppNavigator } from './appnavigator'; 
import { BillNavigator } from './billnavigator';
import { AuthContext } from '../context/auth'; 

const RootStack = createStackNavigator();

export const RootNavigator = () => {
  const { signed } = useContext(AuthContext); 

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {signed ? (
          <>
            <RootStack.Screen name="App" component={AppNavigator} />
            <RootStack.Screen name="Bill" component={BillNavigator} />
          </>
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};