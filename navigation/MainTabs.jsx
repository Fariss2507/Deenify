import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeelingScreen from '../screens/FeelingScreen';
import ChatScreen from '../screens/ChatScreen';
import AboutScreen from '../screens/AboutScreen';
import RecitationScreen from '../screens/RecitationScreen'; 

const Tab = createBottomTabNavigator();

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
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
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Feelings') {
            iconName = 'happy-outline';
          } else if (route.name === 'Chat') {
            iconName = 'chatbubble-ellipses-outline';
          } else if (route.name === 'Recitation') {
            iconName = 'musical-notes-outline';
          } else if (route.name === 'About') {
            iconName = 'information-circle-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Feelings" component={FeelingScreen} />
      <Tab.Screen name="Chat" component={ChatScreen} />
      <Tab.Screen name="Recitation" component={RecitationScreen} /> 
      <Tab.Screen name="About" component={AboutScreen} />
    </Tab.Navigator>
  );
}
