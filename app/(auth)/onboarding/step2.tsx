import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';

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
    <SafeAreaView style={styles.container}>
      {/* Hero Banner with Curved Arch Mask */}
      <View style={styles.heroBannerContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop' }}
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
            <Text style={styles.stepPillText}>Step 2 of 13</Text>
          </View>
        </View>

        <View style={styles.curvedArchMask} />
      </View>

      {/* Main Content Area */}
      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerTitleBox}>
          <Text style={styles.questionTitle}>{t.step2Title}</Text>
          <Text style={styles.questionSubtitle}>{t.step2Subtitle}</Text>
        </View>

        {/* Selected Languages Counter Pill */}
        <View style={styles.selectedCounterRow}>
          <Ionicons name="checkmark-done-circle-outline" size={18} color="#E31E25" style={{ marginRight: 6 }} />
          <Text style={styles.selectedCounterText}>
            Selected ({selectedLanguages.length}):{' '}
            <Text style={{ color: '#E31E25', fontWeight: '800' }}>{selectedLanguages.join(', ')}</Text>
          </Text>
        </View>

        {/* Popular Languages Cards List */}
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
                    size={22}
                    color={isSelected ? '#E31E25' : '#8C7A7C'}
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

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Sticky Bottom Navigation Footer */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F6',
  },
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

  contentScroll: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  headerTitleBox: {
    marginBottom: 14,
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
  selectedCounterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F1',
    borderWidth: 1,
    borderColor: '#FCD4D7',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 16,
  },
  selectedCounterText: {
    fontSize: 13,
    color: '#2C1A1D',
    fontWeight: '600',
  },
  optionsList: {
    gap: 10,
  },
  optionCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
  },
  optionCardRowSelected: {
    borderColor: '#E31E25',
    backgroundColor: '#FFF0F1',
  },
  iconCircleBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF9F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  iconCircleBadgeSelected: {
    backgroundColor: '#FFE4E6',
    borderColor: '#E31E25',
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#2C1A1D',
  },
  optionLabelSelected: {
    color: '#E31E25',
    fontWeight: '800',
  },
  checkboxSquare: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#A39396',
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
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
