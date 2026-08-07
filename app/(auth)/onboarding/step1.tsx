import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import MintGlassBackground from '../../../src/components/MintGlassBackground';

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
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#0F2E2B" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 1 of 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          {/* Glass Card Container */}
          <View style={styles.glassCardContainer}>
            {/* Glowing 3D Vector Emblem Badge at Top */}
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="account-search-outline" size={30} color="#FFFFFF" />
              </View>
            </View>

            {/* Question Title & Subtitle */}
            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step1Title}</Text>
              <Text style={styles.questionSubtitle}>{t.step1Subtitle}</Text>
            </View>

            {/* Live Activity Callout */}
            <View style={styles.liveActivityGlassPill}>
              <Ionicons name="sparkles" size={16} color="#0D9488" style={{ marginRight: 6 }} />
              <Text style={styles.liveActivityText}>127 verified profiles joined in Rajasthan this week!</Text>
            </View>

            {/* Option Cards List */}
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
                    {/* Left Icon Circle Badge */}
                    <View style={[styles.iconCircleBadge, isSelected && styles.iconCircleBadgeSelected]}>
                      <MaterialCommunityIcons
                        name={item.iconName as any}
                        size={20}
                        color={isSelected ? '#FFFFFF' : '#0D9488'}
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
    </MintGlassBackground>
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
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepPillBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
  },
  stepPillText: {
    color: '#0F2E2B',
    fontSize: 12,
    fontWeight: '700',
  },

  contentScroll: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  glassCardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 28,
    padding: 20,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },
  glowingVectorCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#0F2E2B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  headerTitleBox: {
    alignItems: 'center',
    marginBottom: 16,
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 4,
  },
  questionSubtitle: {
    fontSize: 13,
    color: '#4A6B66',
    textAlign: 'center',
    lineHeight: 18,
  },
  liveActivityGlassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginBottom: 18,
  },
  liveActivityText: {
    fontSize: 12,
    color: '#0F2E2B',
    fontWeight: '700',
    flex: 1,
  },

  optionsList: {
    gap: 10,
  },
  optionCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 46, 43, 0.12)',
  },
  optionCardRowSelected: {
    borderColor: '#0F2E2B',
    backgroundColor: 'rgba(15, 46, 43, 0.08)',
  },
  iconCircleBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconCircleBadgeSelected: {
    backgroundColor: '#0F2E2B',
  },
  optionTextCol: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F2E2B',
  },
  optionLabelSelected: {
    color: '#0F2E2B',
    fontWeight: '800',
  },
  optionSub: {
    fontSize: 12,
    color: '#4A6B66',
    marginTop: 2,
  },
  radioOuterCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(15, 46, 43, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterCircleSelected: {
    backgroundColor: '#0F2E2B',
    borderColor: '#0F2E2B',
  },

  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(235, 247, 245, 0.92)',
    borderTopWidth: 1,
    borderColor: 'rgba(15, 46, 43, 0.1)',
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
    backgroundColor: 'rgba(15, 46, 43, 0.12)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0D9488',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0D9488',
  },
  continueBtn: {
    backgroundColor: '#0F2E2B',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  continueBtnDisabled: {
    backgroundColor: 'rgba(15, 46, 43, 0.2)',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
