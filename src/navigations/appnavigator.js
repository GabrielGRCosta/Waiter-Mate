import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home';
import { DetailsScreen } from '../screens/details';
import { BottomTab } from '../components/bottomtab';

const { Navigator, Screen } = createStackNavigator();

export const AppNavigator = () => (
  <NavigationContainer>
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name='Home' component={ HomeScreen }/>
      <Screen name='Details' component={ DetailsScreen }/>
    </Navigator>
    <BottomTab />
  </NavigationContainer>
);
