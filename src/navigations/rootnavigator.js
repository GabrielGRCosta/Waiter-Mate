import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthNavigator } from './authnavigator';
import { AppNavigator } from './appnavigator'; 
import { BillNavigator } from './billnavigator';
import { AuthContext } from '../context/auth'; 

const { Navigator, Screen } = createStackNavigator();

export const RootNavigator = () => {
  const { signed } = React.useContext(AuthContext); //use this instead of 'true' if you want it to work properly

  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        {signed ? (
          <>
            <Screen name='AppNav'  component={AppNavigator} />
            <Screen name='BillNav' component={BillNavigator} />
          </>
        ) : (
          <Screen name='AuthNav' component={AuthNavigator} />
        )}
      </Navigator>
    </NavigationContainer>
  );
};
