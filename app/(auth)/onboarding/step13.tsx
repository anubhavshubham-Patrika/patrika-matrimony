import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import AnimatedGlassBackground from '../../../src/components/AnimatedGlassBackground';

export default function Step13() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [minAge, setMinAge] = useState('22');
  const [maxAge, setMaxAge] = useState('32');
  const [religionPref, setReligionPref] = useState('Hindu');
  const [castePref, setCastePref] = useState('Rajput');

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        caste: castePref,
        religion: religionPref,
      },
    });
    router.push('/(auth)/onboarding/welcome');
  };

  return (
    <AnimatedGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 13 of 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.glassCardContainer}>
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="target-account" size={32} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step13Title}</Text>
              <Text style={styles.questionSubtitle}>Define partner age, religion and community preferences</Text>
            </View>

            {/* Preferred Age Range */}
            <Text style={styles.sectionHeaderLabel}>Preferred Age Range</Text>
            <View style={styles.agePillRow}>
              <View style={styles.ageGlassBox}>
                <Text style={styles.agePillSub}>Min Age</Text>
                <Text style={styles.agePillValue}>{minAge} Years</Text>
              </View>
              <Text style={styles.ageToText}>to</Text>
              <View style={styles.ageGlassBox}>
                <Text style={styles.agePillSub}>Max Age</Text>
                <Text style={styles.agePillValue}>{maxAge} Years</Text>
              </View>
            </View>

            {/* Preferred Religion */}
            <Text style={styles.sectionHeaderLabel}>Preferred Religion</Text>
            <TouchableOpacity style={styles.dropdownGlassTrigger} activeOpacity={0.88}>
              <View style={styles.dropdownTriggerLeft}>
                <MaterialCommunityIcons name="flower" size={22} color="#FF4D6D" style={{ marginRight: 10 }} />
                <Text style={styles.dropdownValueText}>{religionPref}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#BDA6B2" />
            </TouchableOpacity>

            {/* Preferred Caste */}
            <Text style={styles.sectionHeaderLabel}>Preferred Caste / Community</Text>
            <TouchableOpacity style={styles.dropdownGlassTrigger} activeOpacity={0.88}>
              <View style={styles.dropdownTriggerLeft}>
                <MaterialCommunityIcons name="account-group" size={22} color="#FF4D6D" style={{ marginRight: 10 }} />
                <Text style={styles.dropdownValueText}>{castePref}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#BDA6B2" />
            </TouchableOpacity>
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>

        <View style={styles.footerContainer}>
          <View style={styles.progressRow}>
            <View style={styles.progressTrackBg}>
              <View style={[styles.progressBarFill, { width: '100%' }]} />
            </View>
            <Text style={styles.progressText}>100%</Text>
          </View>

          <TouchableOpacity style={styles.continueBtn} onPress={handleNext} activeOpacity={0.88}>
            <Text style={styles.continueBtnText}>Complete Profile & View Matches 🎉</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </AnimatedGlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  blurBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepPillBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  stepPillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  contentScroll: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  glassCardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 28,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },
  glowingVectorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E31E25',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerTitleBox: {
    alignItems: 'center',
    marginBottom: 14,
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 4,
  },
  questionSubtitle: {
    fontSize: 13,
    color: '#BDA6B2',
    textAlign: 'center',
    lineHeight: 18,
  },
  sectionHeaderLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 14,
    marginBottom: 8,
  },

  agePillRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  ageGlassBox: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    alignItems: 'center',
  },
  agePillSub: {
    fontSize: 11,
    color: '#BDA6B2',
    fontWeight: '600',
  },
  agePillValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FF4D6D',
    marginTop: 2,
  },
  ageToText: {
    marginHorizontal: 12,
    fontSize: 14,
    fontWeight: '700',
    color: '#BDA6B2',
  },

  dropdownGlassTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },
  dropdownTriggerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownValueText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(18, 7, 14, 0.85)',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 10,
  },
  progressTrackBg: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#E31E25',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FF4D6D',
  },
  continueBtn: {
    backgroundColor: '#E31E25',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
