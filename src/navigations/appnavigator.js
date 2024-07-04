import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation, BottomNavigationTab, Layout, Text,Icon } from '@ui-kitten/components';
import { HomeScreen } from '../screens/home';
import { ProfileScreen } from '../screens/profile';

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={index => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title='Cardapio' icon={<Icon name='book-open-outline'/>} />
    <BottomNavigationTab title='Mesas'    icon={<Icon name='edit-2-outline'/>}    />
    <BottomNavigationTab title='Perfil'   icon={<Icon name='person-outline'/>}    />
  </BottomNavigation>
);

const { Navigator, Screen } = createBottomTabNavigator();

export const AppNavigator = () => (
  <Navigator
    screenOptions={{ headerShown: false }}
    tabBar={props => <BottomTabBar {...props} />}
  >
    <Screen name='Cardapio' component={HomeScreen}    />
    <Screen name='Mesas'    component={HomeScreen}    />
    <Screen name='Perfil'   component={ProfileScreen} />
  </Navigator>
);
