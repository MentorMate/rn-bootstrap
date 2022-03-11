import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomePage } from 'features/home/page/HomePage';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = ()=> {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomePage} />
    </Tab.Navigator>
  );
}