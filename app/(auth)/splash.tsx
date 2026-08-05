import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, SafeAreaView, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../../src/context/AppContext';
import { Translations } from '../../src/constants/translations';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';
import LanguageToggle from '../../src/components/LanguageToggle';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../src/constants/theme';

export default function SplashScreen() {
  const router = useRouter();
  const { state } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.95)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, [fadeAnim, scaleAnim]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.topHeader}>
        <View style={styles.royalStarBadge}>
          <Ionicons name="star" size={14} color="#FCD04B" />
        </View>
        <View style={{ flex: 1 }} />
        <LanguageToggle />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Animated Royal Header (Matching Reference Image 1) */}
        <Animated.View style={[styles.headerSection, { opacity: fadeAnim, transform: [{ scale: scaleAnim }] }]}>
          <PatrikaRibbonLogo size={80} style={{ alignSelf: 'center', marginBottom: 16 }} />

          <Text style={styles.royalTitle}>Find Your Royal Match</Text>
          <Text style={styles.royalSubtitle}>
            Trusted Matches from Rajasthan Patrika. Begin a legacy of love deeply rooted in heritage and tradition.
          </Text>
        </Animated.View>

        {/* Quick Search Royal Card Container (Matching Reference Image 1) */}
        <View style={styles.quickSearchCard}>
          <View style={styles.quickSearchPill}>
            <Text style={styles.quickSearchPillText}>QUICK SEARCH</Text>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.fieldLabel}>LOOKING FOR</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>Bride / Groom</Text>
              <Ionicons name="chevron-down" size={18} color="#665544" />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.fieldLabel}>COMMUNITY</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputText}>Rajput, Agarwal, Brahmin, Marwari...</Text>
              <Ionicons name="chevron-down" size={18} color="#665544" />
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.fieldLabel}>LOCATION</Text>
            <View style={styles.inputBox}>
              <Text style={styles.inputPlaceholder}>e.g. Jaipur, Jodhpur, Udaipur</Text>
            </View>
          </View>

          {/* Primary Find Matches CTA (Matching Reference Image 1) */}
          <TouchableOpacity
            style={styles.findMatchesBtn}
            onPress={() => router.push('/(auth)/onboarding/step1')}
            activeOpacity={0.88}
          >
            <Ionicons name="search" size={18} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.findMatchesText}>Find Matches</Text>
          </TouchableOpacity>
        </View>

        {/* Login Link */}
        <TouchableOpacity
          style={styles.secondaryLink}
          onPress={() => router.push('/(auth)/login')}
          activeOpacity={0.7}
        >
          <Text style={styles.secondaryLinkText}>
            {t.alreadyHaveAccount}{' '}
            <Text style={styles.secondaryBold}>{t.login}</Text>
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B0000', // Deep Royal Crimson Maroon (Matching Reference Image 1)
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  royalStarBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#500000',
    borderWidth: 1,
    borderColor: '#786C10',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 40,
    alignItems: 'center',
  },
  headerSection: {
    alignItems: 'center',
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  royalTitle: {
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.5,
    marginBottom: 10,
  },
  royalSubtitle: {
    fontSize: 14,
    color: '#E5B869', // Warm Amber Gold Highlight Text (Matching Reference Image 1)
    textAlign: 'center',
    lineHeight: 22,
    fontWeight: '500',
  },
  quickSearchCard: {
    width: '100%',
    backgroundColor: '#FFFDF9', // Warm Parchment Cream Card (Matching Reference Image 1)
    borderRadius: 20,
    padding: 20,
    paddingTop: 28,
    borderWidth: 1,
    borderColor: '#E2D7C7',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 8,
    position: 'relative',
    marginTop: 14,
  },
  quickSearchPill: {
    position: 'absolute',
    top: -14,
    alignSelf: 'center',
    backgroundColor: '#6B5B00', // Olive Gold Badge Header (Matching Reference Image 1)
    paddingHorizontal: 18,
    paddingVertical: 6,
    borderRadius: 14,
    elevation: 4,
  },
  quickSearchPillText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
    letterSpacing: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#6B5B00', // Small Caps Gold Label (Matching Reference Image 1)
    marginBottom: 6,
    letterSpacing: 0.8,
  },
  inputBox: {
    backgroundColor: '#F4EEE5', // Soft Warm Cream Input Background (Matching Reference Image 1)
    borderWidth: 1,
    borderColor: '#E8DFD3',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputText: {
    fontSize: 15,
    color: '#200D08',
    fontWeight: '600',
  },
  inputPlaceholder: {
    fontSize: 14,
    color: '#8C7B6B',
  },
  findMatchesBtn: {
    backgroundColor: '#6B0000', // Deep Royal Burgundy Maroon CTA (Matching Reference Image 1)
    borderRadius: 12,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#6B0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  findMatchesText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  secondaryLink: {
    marginTop: 20,
    paddingVertical: 10,
  },
  secondaryLinkText: {
    color: '#E5B869',
    fontSize: 14,
  },
  secondaryBold: {
    color: '#FFFFFF',
    fontWeight: '800',
    textDecorationLine: 'underline',
  },
});
