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
        <View style={styles.formCard}>
          <View style={styles.cardHeaderBanner}>
            <PatrikaRibbonLogo size={80} style={{ alignSelf: 'center', marginBottom: 10 }} />
            <Text style={styles.cardHeaderTitle}>Welcome to Patrika Matrimony!</Text>
            <Text style={styles.cardHeaderSubtitle}>Your profile has been created successfully</Text>
          </View>

          <View style={styles.cardBody}>
            <View style={styles.iconContainer}>
              <Ionicons name="checkmark-circle" size={72} color="#1E8449" />
            </View>

            <View style={styles.tipsContainer}>
              <View style={styles.tipRow}>
                <Ionicons name="checkmark-circle" size={20} color="#E31E25" style={styles.tipIcon} />
                <Text style={styles.tipText}>Complete verification to get 5x more responses</Text>
              </View>
              <View style={styles.tipRow}>
                <Ionicons name="checkmark-circle" size={20} color="#E31E25" style={styles.tipIcon} />
                <Text style={styles.tipText}>Explore matches based on your preferences</Text>
              </View>
              <View style={styles.tipRow}>
                <Ionicons name="checkmark-circle" size={20} color="#E31E25" style={styles.tipIcon} />
                <Text style={styles.tipText}>Link your Rajasthan Patrika newspaper ad</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={handleStart} activeOpacity={0.88}>
          <Text style={styles.btnText}>Start Exploring Matches →</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF4F6',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  cardHeaderBanner: {
    backgroundColor: '#E31E25',
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  cardHeaderTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardHeaderSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
  },
  cardBody: {
    padding: 20,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  tipsContainer: {
    width: '100%',
    backgroundColor: '#FAF5F7',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  tipRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipIcon: {
    marginRight: 10,
  },
  tipText: {
    fontSize: 13,
    color: '#2C1A1D',
    fontWeight: '600',
    flex: 1,
    lineHeight: 18,
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#EFE6DD',
  },
  btn: {
    backgroundColor: '#E31E25',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  btnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
