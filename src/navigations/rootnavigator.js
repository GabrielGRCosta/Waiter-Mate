// RootNavigator.js
import React, { useContext} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './authnavigator'; // Supondo que você criou este arquivo
import { AppNavigator } from './appnavigator'; // Seu atual AppNavigator
import { BillNavigator } from './billnavigator'; // Supondo que você criou este arquivo
import { AuthContext } from '../context/auth'; // Supondo que você criou este contexto

const RootStack = createStackNavigator();

export const RootNavigator = () => {
  const { signed } = useContext(AuthContext); // Supondo que `user` seja null se não estiver logado

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