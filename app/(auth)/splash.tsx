import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, SafeAreaView, Dimensions, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function SplashScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  const communities = ['Rajput', 'Marwari', 'Jain', 'Brahmin'];

  return (
    <LinearGradient colors={['#C0392B', '#96281B']} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <Animated.View style={[styles.logoContainer, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
            <View style={styles.logoBadge}>
              <Text style={styles.logoBadgeText}>P</Text>
            </View>
            <Text style={styles.logoHindi}>पत्रिका</Text>
            <Text style={styles.title}>Patrika Matrimony</Text>
            <Text style={styles.tagline}>Trusted matches from Rajasthan Patrika</Text>
          </Animated.View>
        </View>

        <View style={styles.bottomSection}>
          <View style={styles.communitiesContainer}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.communitiesScroll}>
              {communities.map((community, index) => (
                <TouchableOpacity key={index} style={styles.communityChip} onPress={() => router.push('/(auth)/onboarding/step1')}>
                  <Text style={styles.communityChipText}>{community}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={() => router.push('/(auth)/onboarding/step1')}>
            <Text style={styles.primaryButtonText}>Create Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.secondaryButtonText}>Login</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <MaterialCommunityIcons name="newspaper-variant-outline" size={16} color="rgba(255,255,255,0.7)" />
            <Text style={styles.footerText}>For Matrimonial Ads in Rajasthan Patrika</Text>
          </View>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoBadge: {
    width: 100,
    height: 100,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  logoBadgeText: {
    fontSize: 50,
    fontWeight: 'bold',
    color: '#C0392B',
  },
  logoHindi: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  communitiesContainer: {
    marginBottom: 24,
  },
  communitiesScroll: {
    paddingVertical: 8,
    gap: 12,
  },
  communityChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
  },
  communityChipText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  primaryButton: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  primaryButtonText: {
    color: '#C0392B',
    fontSize: 16,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    marginBottom: 24,
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
  },
});
