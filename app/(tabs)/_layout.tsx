import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#C0392B',
        tabBarInactiveTintColor: '#999999',
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? 'home' : 'home-outline'} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? 'magnify' : 'magnify'} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color, focused }) => (
            <View>
              <MaterialCommunityIcons 
                name={focused ? 'chat' : 'chat-outline'} 
                size={24} 
                color={color} 
              />
              <View style={styles.badge} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="shortlist"
        options={{
          title: 'Shortlist',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? 'heart' : 'heart-outline'} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons 
              name={focused ? 'account' : 'account-outline'} 
              size={24} 
              color={color} 
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    height: 60,
    paddingBottom: Platform.OS === 'ios' ? 20 : 8,
    paddingTop: 8,
    borderTopWidth: 0,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -4,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#C0392B',
    borderWidth: 1,
    borderColor: '#FFF',
  },
});
