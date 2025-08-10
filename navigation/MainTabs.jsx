import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FeelingScreen from '../screens/FeelingScreen';
import ChatScreen from '../screens/ChatScreen';
import AboutScreen from '../screens/AboutScreen';
import RecitationScreen from '../screens/RecitationScreen';

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#0D1B2A',
          borderTopWidth: 0,
          paddingBottom: 6,
          paddingTop: 6,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: '600',
        },
        tabBarActiveTintColor: '#00B4D8',
        tabBarInactiveTintColor: '#90A4AE',
      }}
    >
      <Tab.Screen name="Feelings" component={FeelingScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Recitation" component={RecitationScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}
