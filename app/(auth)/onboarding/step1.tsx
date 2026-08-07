import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';

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
    <SafeAreaView style={styles.container}>
      {/* Top Hero Banner with Curved Image (Inspiration Screenshot 1) */}
      <View style={styles.heroBannerContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop' }}
          style={styles.heroBannerImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />

        {/* Floating Top Nav Over Image */}
        <View style={styles.topNavRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 1 of 13</Text>
          </View>
        </View>

        {/* Curved Wave Mask at Bottom of Hero Image */}
        <View style={styles.curvedArchMask} />
      </View>

      {/* Main Content Area */}
      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        {/* Title Header */}
        <View style={styles.headerTitleBox}>
          <Text style={styles.questionTitle}>{t.step1Title}</Text>
          <Text style={styles.questionSubtitle}>{t.step1Subtitle}</Text>
        </View>

        {/* Community Live Activity Callout */}
        <View style={styles.liveActivityPill}>
          <Ionicons name="sparkles" size={16} color="#E31E25" style={{ marginRight: 6 }} />
          <Text style={styles.liveActivityText}>127 verified profiles joined in Rajasthan this week!</Text>
        </View>

        {/* Option Cards List (Inspiration Screenshot 1 Layout) */}
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
                {/* Catchy Left Icon Circle Badge (Inspiration Screenshot 1) */}
                <View style={[styles.iconCircleBadge, isSelected && styles.iconCircleBadgeSelected]}>
                  <MaterialCommunityIcons
                    name={item.iconName as any}
                    size={24}
                    color={isSelected ? '#E31E25' : '#8C7A7C'}
                  />
                </View>

                {/* Option Text Info */}
                <View style={styles.optionTextCol}>
                  <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                    {item.label}
                  </Text>
                  <Text style={styles.optionSub}>{item.subtitle}</Text>
                </View>

                {/* Right Selection Radio Indicator (Inspiration Screenshot 1) */}
                <View style={[styles.radioOuterCircle, isSelected && styles.radioOuterCircleSelected]}>
                  {isSelected ? (
                    <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                  ) : (
                    <View style={styles.radioInnerUnselected} />
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Sticky Bottom Navigation Footer (Inspiration Screenshot 1) */}
      <View style={styles.footerContainer}>
        {/* Progress Indicator Track */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F6',
  },
  /* Hero Image Banner with Arch Mask */
  heroBannerContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  heroBannerImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(44, 26, 29, 0.35)',
  },
  topNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    zIndex: 10,
  },
  blurBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepPillBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  stepPillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  curvedArchMask: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 24,
    backgroundColor: '#FFF9F6',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  /* Content Scroll View */
  contentScroll: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  headerTitleBox: {
    marginBottom: 16,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
    marginBottom: 4,
  },
  questionSubtitle: {
    fontSize: 14,
    color: '#5A4A4D',
    lineHeight: 20,
  },
  liveActivityPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F1',
    borderWidth: 1,
    borderColor: '#FCD4D7',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
  },
  liveActivityText: {
    fontSize: 13,
    color: '#E31E25',
    fontWeight: '700',
    flex: 1,
  },

  /* Options List Card (Screenshot 1 Layout) */
  optionsList: {
    gap: 12,
  },
  optionCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  optionCardRowSelected: {
    borderColor: '#E31E25',
    backgroundColor: '#FFF0F1',
  },
  iconCircleBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFF9F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  iconCircleBadgeSelected: {
    backgroundColor: '#FFE4E6',
    borderColor: '#E31E25',
  },
  optionTextCol: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C1A1D',
  },
  optionLabelSelected: {
    color: '#E31E25',
    fontWeight: '800',
  },
  optionSub: {
    fontSize: 12,
    color: '#8C7A7C',
    marginTop: 2,
  },
  radioOuterCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#A39396',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterCircleSelected: {
    backgroundColor: '#E31E25',
    borderColor: '#E31E25',
  },
  radioInnerUnselected: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
  },

  /* Footer Navigation */
  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#EFE6DD',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  progressTrackBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#EFE6DD',
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
    color: '#E31E25',
  },
  continueBtn: {
    backgroundColor: '#E31E25',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  continueBtnDisabled: {
    backgroundColor: '#EFE6DD',
    shadowOpacity: 0,
    elevation: 0,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
