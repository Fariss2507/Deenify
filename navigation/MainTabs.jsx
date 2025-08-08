import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeelingScreen from '../screens/FeelingScreen';
import ChatScreen from '../screens/ChatScreen';
import AboutScreen from '../screens/AboutScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Feelings" component={FeelingScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}
