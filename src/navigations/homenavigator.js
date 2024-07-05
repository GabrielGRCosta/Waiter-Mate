import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../screens/home";
import { ProfileScreen } from "../screens/profile";
import { LoginScreen } from "../screens/login";

const { Navigator, Screen } = createStackNavigator();

export const HomeNavigator = () => (
  <Navigator>
    <Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Screen
      name="Profile"
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </Navigator>
);
