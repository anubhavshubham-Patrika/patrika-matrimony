import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import AnimatedGlassBackground from '../../../src/components/AnimatedGlassBackground';

export default function Step1() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [profileFor, setProfileFor] = useState(state.onboardingData?.profileFor || '');

  const options = [
    { id: 'Self', label: t.self, iconName: 'account-outline', subtitle: 'Creating for myself' },
    { id: 'Son', label: t.son, iconName: 'face-man-outline', subtitle: 'Creating for my son' },
    { id: 'Daughter', label: t.daughter, iconName: 'face-woman-outline', subtitle: 'Creating for my daughter' },
    { id: 'Brother', label: t.brother, iconName: 'account-tie-outline', subtitle: 'Creating for my brother' },
    { id: 'Sister', label: t.sister, iconName: 'face-woman', subtitle: 'Creating for my sister' },
    { id: 'Friend', label: t.friend, iconName: 'account-group-outline', subtitle: 'Creating for a friend' },
    { id: 'Relative', label: t.relative, iconName: 'account-supervisor-outline', subtitle: 'Creating for a relative' },
  ];

  const handleNext = () => {
    if (!profileFor) return;
    dispatch({ type: 'UPDATE_ONBOARDING', payload: { profileFor } });
    router.push('/(auth)/onboarding/step2');
  };

  return (
    <AnimatedGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 1 of 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          {/* Glass Card Container (Matching Reference Screenshot) */}
          <View style={styles.glassCardContainer}>
            {/* Glowing 3D Vector Emblem Badge at Top */}
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="account-search-outline" size={32} color="#FFFFFF" />
              </View>
            </View>

            {/* Question Title & Subtitle */}
            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step1Title}</Text>
              <Text style={styles.questionSubtitle}>{t.step1Subtitle}</Text>
            </View>

            {/* Live Activity Callout */}
            <View style={styles.liveActivityGlassPill}>
              <Ionicons name="sparkles" size={16} color="#FF4D6D" style={{ marginRight: 6 }} />
              <Text style={styles.liveActivityText}>127 verified profiles joined in Rajasthan this week!</Text>
            </View>

            {/* Option Cards List (Matching Reference Screenshot Layout) */}
            <View style={styles.optionsList}>
              {options.map((item) => {
                const isSelected = profileFor === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.optionCardRow, isSelected && styles.optionCardRowSelected]}
                    onPress={() => setProfileFor(item.id)}
                    activeOpacity={0.88}
                  >
                    {/* Catchy Left Icon Circle Badge */}
                    <View style={[styles.iconCircleBadge, isSelected && styles.iconCircleBadgeSelected]}>
                      <MaterialCommunityIcons
                        name={item.iconName as any}
                        size={22}
                        color={isSelected ? '#FFFFFF' : '#FF85A1'}
                      />
                    </View>

                    {/* Option Text Info */}
                    <View style={styles.optionTextCol}>
                      <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                        {item.label}
                      </Text>
                      <Text style={styles.optionSub}>{item.subtitle}</Text>
                    </View>

                    {/* Right Radio Indicator */}
                    <View style={[styles.radioOuterCircle, isSelected && styles.radioOuterCircleSelected]}>
                      {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Sticky Bottom Glass Footer */}
        <View style={styles.footerContainer}>
          <View style={styles.progressRow}>
            <View style={styles.progressTrackBg}>
              <View style={[styles.progressBarFill, { width: `${(1 / 13) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>8%</Text>
          </View>

          <TouchableOpacity
            style={[styles.continueBtn, !profileFor && styles.continueBtnDisabled]}
            onPress={handleNext}
            disabled={!profileFor}
            activeOpacity={0.88}
          >
            <Text style={styles.continueBtnText}>{t.continue} →</Text>
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
    marginBottom: 16,
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
  liveActivityGlassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 77, 109, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 109, 0.3)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginBottom: 18,
  },
  liveActivityText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
    flex: 1,
  },

  optionsList: {
    gap: 10,
  },
  optionCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  optionCardRowSelected: {
    borderColor: '#E31E25',
    backgroundColor: 'rgba(227, 30, 37, 0.18)',
  },
  iconCircleBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 77, 109, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 109, 0.3)',
  },
  iconCircleBadgeSelected: {
    backgroundColor: '#E31E25',
    borderColor: '#E31E25',
  },
  optionTextCol: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  optionLabelSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  optionSub: {
    fontSize: 12,
    color: '#BDA6B2',
    marginTop: 2,
  },
  radioOuterCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterCircleSelected: {
    backgroundColor: '#E31E25',
    borderColor: '#E31E25',
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
  continueBtnDisabled: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderColor: 'transparent',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
