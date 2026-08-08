import React, { useState } from 'react';
import PremiumButton from '../../../src/components/ui/PremiumButton';
import PremiumCard from '../../../src/components/ui/PremiumCard';
import { Typography } from '../../../src/constants/theme';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import MintGlassBackground from '../../../src/components/MintGlassBackground';

export default function Step2() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    state.onboardingData?.motherTongue ? [state.onboardingData.motherTongue] : ['Hindi']
  );

  const popularLanguages = [
    { id: 'Hindi', label: 'Hindi (हिंदी)', icon: 'translate' },
    { id: 'Marwari', label: 'Marwari / Rajasthani (मारवाड़ी)', icon: 'crown-outline' },
    { id: 'Punjabi', label: 'Punjabi (ਪੰਜਾਬੀ)', icon: 'star-outline' },
    { id: 'Gujarati', label: 'Gujarati (ગુજરાતી)', icon: 'flower-outline' },
    { id: 'Marathi', label: 'Marathi (मराठी)', icon: 'book-open-outline' },
    { id: 'Bengali', label: 'Bengali (বাংলা)', icon: 'feather' },
    { id: 'Tamil', label: 'Tamil (தமிழ்)', icon: 'script-text-outline' },
    { id: 'Telugu', label: 'Telugu (తెలుగు)', icon: 'music-note-outline' },
    { id: 'English', label: 'English', icon: 'earth' },
  ];

  const toggleLanguageSelect = (langId: string) => {
    if (selectedLanguages.includes(langId)) {
      if (selectedLanguages.length > 1) {
        setSelectedLanguages(selectedLanguages.filter((l) => l !== langId));
      }
    } else {
      setSelectedLanguages([...selectedLanguages, langId]);
    }
  };

  const handleNext = () => {
    if (!selectedLanguages.length) return;
    dispatch({ type: 'UPDATE_ONBOARDING', payload: { motherTongue: selectedLanguages.join(', ') } });
    router.push('/(auth)/onboarding/step3');
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#183B82" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>02 / 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <PremiumCard variant="glass" style={styles.glassCardContainer}>
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="translate" size={30} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step2Title}</Text>
              <Text style={styles.questionSubtitle}>{t.step2Subtitle}</Text>
            </View>

            <View style={styles.selectedCounterGlassRow}>
              <Ionicons name="checkmark-done-circle-outline" size={18} color="#4169D8" style={{ marginRight: 6 }} />
              <Text style={styles.selectedCounterText}>
                Selected ({selectedLanguages.length}):{' '}
                <Text style={{ color: '#4169D8', fontWeight: '800' }}>{selectedLanguages.join(', ')}</Text>
              </Text>
            </View>

            <View style={styles.optionsList}>
              {popularLanguages.map((item) => {
                const isSelected = selectedLanguages.includes(item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.optionCardRow, isSelected && styles.optionCardRowSelected]}
                    onPress={() => toggleLanguageSelect(item.id)}
                    activeOpacity={0.88}
                  >
                    <View style={[styles.iconCircleBadge, isSelected && styles.iconCircleBadgeSelected]}>
                      <MaterialCommunityIcons
                        name={item.icon as any}
                        size={20}
                        color={isSelected ? '#FFFFFF' : '#4169D8'}
                      />
                    </View>

                    <Text style={[styles.optionLabel, isSelected && styles.optionLabelSelected]}>
                      {item.label}
                    </Text>

                    <View style={[styles.checkboxSquare, isSelected && styles.checkboxSquareSelected]}>
                      {isSelected && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </PremiumCard>
          <View style={{ height: 20 }} />
        </ScrollView>

        <View style={styles.footerContainer}>
          <PremiumButton title="Save & Continue →" onPress={handleNext} variant="primary" />
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
    color: '#183B82',
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
    shadowColor: '#183B82',
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
    backgroundColor: '#183B82',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#183B82',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  headerTitleBox: {
    alignItems: 'center',
    marginBottom: 14,
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#183B82',
    fontFamily: Typography.fontFamily.serif,
    textAlign: 'center',
    marginBottom: 4,
  },
  questionSubtitle: {
    fontSize: 13,
    color: '#4A6B66',
    textAlign: 'center',
    lineHeight: 18,
  },
  selectedCounterGlassRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(65, 105, 216, 0.12)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginBottom: 16,
  },
  selectedCounterText: {
    fontSize: 12,
    color: '#183B82',
    fontWeight: '600',
  },
  optionsList: {
    gap: 9,
  },
  optionCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(24, 59, 130, 0.12)',
  },
  optionCardRowSelected: {
    borderColor: '#183B82',
    backgroundColor: 'rgba(24, 59, 130, 0.08)',
  },
  iconCircleBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(65, 105, 216, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconCircleBadgeSelected: {
    backgroundColor: '#183B82',
  },
  optionLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#183B82',
  },
  optionLabelSelected: {
    color: '#183B82',
    fontWeight: '800',
  },
  checkboxSquare: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(24, 59, 130, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSquareSelected: {
    backgroundColor: '#183B82',
    borderColor: '#183B82',
  },

  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(243, 247, 255, 0.92)',
    borderTopWidth: 1,
    borderColor: 'rgba(24, 59, 130, 0.1)',
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
    backgroundColor: 'rgba(24, 59, 130, 0.12)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4169D8',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4169D8',
  },
  continueBtn: {
    backgroundColor: '#183B82',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#183B82',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
