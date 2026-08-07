import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import AnimatedGlassBackground from '../../../src/components/AnimatedGlassBackground';

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
    <AnimatedGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 2 of 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.glassCardContainer}>
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="translate" size={32} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step2Title}</Text>
              <Text style={styles.questionSubtitle}>{t.step2Subtitle}</Text>
            </View>

            <View style={styles.selectedCounterGlassRow}>
              <Ionicons name="checkmark-done-circle-outline" size={18} color="#FF4D6D" style={{ marginRight: 6 }} />
              <Text style={styles.selectedCounterText}>
                Selected ({selectedLanguages.length}):{' '}
                <Text style={{ color: '#FF4D6D', fontWeight: '800' }}>{selectedLanguages.join(', ')}</Text>
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
                        color={isSelected ? '#FFFFFF' : '#FF85A1'}
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
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>

        <View style={styles.footerContainer}>
          <View style={styles.progressRow}>
            <View style={styles.progressTrackBg}>
              <View style={[styles.progressBarFill, { width: `${(2 / 13) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>15%</Text>
          </View>

          <TouchableOpacity style={styles.continueBtn} onPress={handleNext} activeOpacity={0.88}>
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
  selectedCounterGlassRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 77, 109, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 109, 0.3)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginBottom: 16,
  },
  selectedCounterText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  optionsList: {
    gap: 9,
  },
  optionCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  optionCardRowSelected: {
    borderColor: '#E31E25',
    backgroundColor: 'rgba(227, 30, 37, 0.18)',
  },
  iconCircleBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
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
  optionLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  optionLabelSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  checkboxSquare: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSquareSelected: {
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
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
