import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Platform } from 'react-native';
import { Colors } from '../../src/constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textSecondary,
        tabBarStyle: styles.tabBar,
        headerShown: false,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Patrika',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconPill]}>
              <MaterialCommunityIcons 
                name={focused ? 'castle' : 'castle'} 
                size={22} 
                color={focused ? Colors.primary : Colors.textSecondary} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconPill]}>
              <MaterialCommunityIcons 
                name="magnify" 
                size={22} 
                color={focused ? Colors.primary : Colors.textSecondary} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconPill]}>
              <MaterialCommunityIcons 
                name={focused ? 'chat' : 'chat-outline'} 
                size={22} 
                color={focused ? Colors.primary : Colors.textSecondary} 
              />
              <View style={styles.badge} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="shortlist"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconPill]}>
              <MaterialCommunityIcons 
                name={focused ? 'heart' : 'heart-outline'} 
                size={22} 
                color={focused ? Colors.primary : Colors.textSecondary} 
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <View style={[styles.iconContainer, focused && styles.activeIconPill]}>
              <MaterialCommunityIcons 
                name={focused ? 'account' : 'account-outline'} 
                size={22} 
                color={focused ? Colors.primary : Colors.textSecondary} 
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
    backgroundColor: '#FFFDF9',
    height: Platform.OS === 'ios' ? 74 : 64,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderColor: '#E8DFD3',
    elevation: 12,
    shadowColor: '#6B0000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: '700',
    marginTop: 2,
  },
  iconContainer: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeIconPill: {
    backgroundColor: '#FCD04B', // Royal Gold Active Pill (Matching Reference Image 3)
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 12,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#6B0000',
    borderWidth: 1,
    borderColor: '#FFFDF9',
  },
});
