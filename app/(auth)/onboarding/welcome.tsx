import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import PatrikaRibbonLogo from '../../../src/components/PatrikaRibbonLogo';

export default function WelcomeScreen() {
  const router = useRouter();
  const { dispatch } = useApp();

  const handleStart = () => {
    dispatch({
      type: 'LOGIN',
      payload: {
        userId: 'U001',
        name: 'Arjun Singh',
        mobile: '+91-9876543210',
        email: 'arjun@example.com',
        profileId: 'P001',
      },
    });

    router.push('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <PatrikaRibbonLogo size={100} style={{ marginBottom: 28 }} />

        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={80} color="#27AE60" />
        </View>

        <Text style={styles.title}>Welcome to Patrika Matrimony!</Text>
        <Text style={styles.subtitle}>Your profile has been created successfully</Text>

        <View style={styles.tipsContainer}>
          <View style={styles.tipRow}>
            <Ionicons name="checkmark-circle" size={22} color="#E31837" style={styles.tipIcon} />
            <Text style={styles.tipText}>Complete verification to get 5x more responses</Text>
          </View>
          <View style={styles.tipRow}>
            <Ionicons name="checkmark-circle" size={22} color="#E31837" style={styles.tipIcon} />
            <Text style={styles.tipText}>Explore matches based on your preferences</Text>
          </View>
          <View style={styles.tipRow}>
            <Ionicons name="checkmark-circle" size={22} color="#E31837" style={styles.tipIcon} />
            <Text style={styles.tipText}>Link your Rajasthan Patrika newspaper ad</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={handleStart} activeOpacity={0.88}>
          <Text style={styles.btnText}>Start Exploring Matches</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111111',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
  },
  tipsContainer: {
    width: '100%',
    backgroundColor: '#FFF5F6',
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFE0E5',
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  tipIcon: {
    marginRight: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#333333',
    fontWeight: '600',
    flex: 1,
    lineHeight: 20,
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  btn: {
    backgroundColor: '#E31837',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#E31837',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
