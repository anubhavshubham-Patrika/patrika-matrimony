import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, StyleSheet, Platform } from 'react-native';
import { Colors } from '../../src/constants/theme';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontFamily: 'Inter_500Medium',
          fontSize: 11,
          marginTop: 4,
          marginBottom: Platform.OS === 'ios' ? 0 : 8,
        },
        tabBarStyle: {
          backgroundColor: Colors.surface,
          position: 'absolute',
          bottom: Platform.OS === 'ios' ? 30 : 20,
          left: 20,
          right: 20,
          height: Platform.OS === 'ios' ? 80 : 70,
          borderRadius: 35,
          borderTopWidth: 0,
          elevation: 10,
          shadowColor: Colors.primaryDark,
          shadowOffset: { width: 0, height: 10 },
          shadowOpacity: 0.15,
          shadowRadius: 20,
          paddingHorizontal: 10,
          paddingTop: Platform.OS === 'ios' ? 12 : 8,
          paddingBottom: Platform.OS === 'ios' ? 20 : 8,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'home' : 'home-outline'} focused={focused} IconComponent={Ionicons} />
          ),
        }}
      />

      <Tabs.Screen
        name="search"
        options={{
          title: 'Matches',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'search' : 'search-outline'} focused={focused} IconComponent={Ionicons} />
          ),
        }}
      />

      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'chatbubble' : 'chatbubble-outline'} focused={focused} IconComponent={Ionicons} />
          ),
        }}
      />

      <Tabs.Screen
        name="shortlist"
        options={{
          title: 'Saved',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'star' : 'star-outline'} focused={focused} IconComponent={Ionicons} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} focused={focused} IconComponent={Ionicons} />
          ),
        }}
      />
    </Tabs>
  );
}

function TabIcon({ name, focused, IconComponent }: { name: any, focused: boolean, IconComponent: any }) {
  return (
    <View
      style={[
        styles.iconContainer,
        focused && styles.iconContainerFocused,
      ]}
    >
      <IconComponent 
        name={name} 
        size={22} 
        color={focused ? Colors.textOnPrimary : Colors.textMuted} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  iconContainerFocused: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primaryLight,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
});
