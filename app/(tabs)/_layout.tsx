import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Platform, Text } from 'react-native';

const PRIMARY_RED = '#6B0000';
const INACTIVE_COLOR = '#5C4A3E'; // Dark warm brown - clear contrast on cream background
const PARCHMENT_BG = '#FFFDF9';
const ACTIVE_BG = '#FFF0F2'; // Soft Royal Crimson Tint Pill

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: PRIMARY_RED,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <MaterialCommunityIcons 
                name={focused ? 'home' : 'home-outline'} 
                size={24} 
                color={focused ? PRIMARY_RED : INACTIVE_COLOR} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <MaterialCommunityIcons 
                name="magnify" 
                size={24} 
                color={focused ? PRIMARY_RED : INACTIVE_COLOR} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <MaterialCommunityIcons 
                name={focused ? 'chat' : 'chat-outline'} 
                size={24} 
                color={focused ? PRIMARY_RED : INACTIVE_COLOR} 
              />
              <View style={styles.badgeDot} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="shortlist"
        options={{
          title: 'Matches',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <MaterialCommunityIcons 
                name={focused ? 'heart' : 'heart-outline'} 
                size={24} 
                color={focused ? PRIMARY_RED : INACTIVE_COLOR} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => (
            <View style={[styles.iconBox, focused && styles.activeIconBox]}>
              <MaterialCommunityIcons 
                name={focused ? 'account' : 'account-outline'} 
                size={24} 
                color={focused ? PRIMARY_RED : INACTIVE_COLOR} 
              />
            </View>
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: PARCHMENT_BG,
    height: Platform.OS === 'ios' ? 88 : 72,
    paddingBottom: Platform.OS === 'ios' ? 26 : 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#E2D7C7',
    elevation: 12,
    shadowColor: '#6B0000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabBarItem: {
    paddingVertical: 2,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '700',
    marginTop: 4,
    marginBottom: 2,
  },
  iconBox: {
    width: 48,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  activeIconBox: {
    backgroundColor: ACTIVE_BG,
    borderWidth: 1,
    borderColor: '#F3D6DA',
  },
  badgeDot: {
    position: 'absolute',
    top: 2,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: PRIMARY_RED,
    borderWidth: 1.5,
    borderColor: PARCHMENT_BG,
  },
});
