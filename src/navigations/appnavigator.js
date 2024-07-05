import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Layout,
  Text,
  Icon,
} from "@ui-kitten/components";
import { MenuScreen } from "../screens/menu";
import { HomeScreen } from "../screens/home";
import { ProfileScreen } from "../screens/profile";
import { BillScreen } from "../screens/bill";

const BottomTabBar = ({ navigation, state }) => (
  <BottomNavigation
    selectedIndex={state.index}
    onSelect={(index) => navigation.navigate(state.routeNames[index])}
  >
    <BottomNavigationTab title="Comanda" icon={<Icon name="list" />} />
    <BottomNavigationTab
      title="Cardapio"
      icon={<Icon name="book-open-outline" />}
    />
  </BottomNavigation>
);

const { Navigator, Screen } = createBottomTabNavigator();

export const AppNavigator = () => (
  <Navigator
    screenOptions={{ headerShown: false }}
    tabBar={(props) => <BottomTabBar {...props} />}
  >
    <Screen name="Comanda" component={BillScreen} />
    <Screen name="Cardapio" component={MenuScreen} />
  </Navigator>
);
