import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import PatrikaRibbonLogo from '../../../src/components/PatrikaRibbonLogo';

export default function Step2() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  // All 22 official languages of India + Marwari/Rajasthani + English
  const allLanguages = [
    'Hindi', 'Marwari / Rajasthani', 'Punjabi', 'Gujarati', 'Marathi',
    'Bengali', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Odia',
    'Assamese', 'Urdu', 'Sanskrit', 'Kashmiri', 'Sindhi', 'Konkani',
    'Nepali', 'Manipuri (Meitei)', 'Bodo', 'Dogri', 'Santhali', 'English'
  ];

  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    state.onboardingData?.motherTongue ? state.onboardingData.motherTongue.split(', ') : ['Hindi']
  );
  const [searchQuery, setSearchQuery] = useState('');

  const toggleLanguage = (item: string) => {
    if (selectedLanguages.includes(item)) {
      if (selectedLanguages.length > 1) {
        setSelectedLanguages(selectedLanguages.filter((l) => l !== item));
      }
    } else {
      setSelectedLanguages([...selectedLanguages, item]);
    }
  };

  const filteredLanguages = allLanguages.filter((l) =>
    l.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleNext = () => {
    if (selectedLanguages.length === 0) return;
    const motherTongue = selectedLanguages.join(', ');
    dispatch({ type: 'UPDATE_ONBOARDING', payload: { motherTongue } });
    router.push('/(auth)/onboarding/step3');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#2C1A1D" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <PatrikaRibbonLogo size={28} />
          <Text style={styles.headerBrand}>Patrika Matrimony</Text>
        </View>
        <Text style={styles.stepIndicator}>Step 2 of 13</Text>
      </View>

      {/* Progress Bar & Percentage */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${(2 / 13) * 100}%` }]} />
        </View>
        <Text style={styles.progressPercentText}>15% Complete</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        <View style={styles.formCard}>
          {/* Accent Banner */}
          <View style={styles.cardHeaderBanner}>
            <Text style={styles.cardHeaderTitle}>{t.step2Title}</Text>
            <Text style={styles.cardHeaderSubtitle}>{t.step2Subtitle}</Text>
          </View>

          <View style={styles.cardBody}>
            {/* Search Box */}
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={20} color="#8C7A7C" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder={t.searchLanguage}
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor="#8C7A7C"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')}>
                  <Ionicons name="close-circle" size={18} color="#8C7A7C" />
                </TouchableOpacity>
              )}
            </View>

            {/* Selected Counter Pill */}
            <View style={styles.selectedCounterRow}>
              <Text style={styles.selectedCounterText}>
                Selected ({selectedLanguages.length}):{' '}
                <Text style={{ color: '#E31E25', fontWeight: '800' }}>{selectedLanguages.join(', ')}</Text>
              </Text>
            </View>

            {/* Scrollable Language List */}
            <ScrollView style={styles.listScrollView} showsVerticalScrollIndicator={false}>
              <View style={styles.listCard}>
                {filteredLanguages.map((item, index) => {
                  const isSelected = selectedLanguages.includes(item);
                  return (
                    <TouchableOpacity
                      key={item}
                      style={[
                        styles.listItem,
                        index === filteredLanguages.length - 1 && { borderBottomWidth: 0 },
                        isSelected && styles.listItemSelected,
                      ]}
                      onPress={() => toggleLanguage(item)}
                      activeOpacity={0.85}
                    >
                      <Text style={[styles.listText, isSelected && styles.listTextSelected]}>{item}</Text>

                      <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
                        {isSelected && <MaterialCommunityIcons name="check" size={16} color="#FFFFFF" />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>
      </View>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.prevBtn} onPress={() => router.back()}>
          <Text style={styles.prevBtnText}>← Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.nextBtn, selectedLanguages.length === 0 && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={selectedLanguages.length === 0}
          activeOpacity={0.88}
        >
          <Text style={styles.nextBtnText}>{t.continue} →</Text>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
  },
  backBtn: {
    padding: 4,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerBrand: {
    fontSize: 18,
    fontWeight: '800',
    color: '#E91E63',
    fontFamily: 'serif',
  },
  stepIndicator: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8C7A7C',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  progressTrack: {
    flex: 1,
    height: 6,
    backgroundColor: '#EFE6DD',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#E91E63',
    borderRadius: 3,
  },
  progressPercentText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5A4A4D',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  formCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    marginBottom: 16,
  },
  cardHeaderBanner: {
    backgroundColor: '#E91E63',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  cardHeaderTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
  },
  cardHeaderSubtitle: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.85)',
  },
  cardBody: {
    flex: 1,
    padding: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5F7',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#2C1A1D',
  },
  selectedCounterRow: {
    marginBottom: 10,
  },
  selectedCounterText: {
    fontSize: 12,
    color: '#5A4A4D',
  },
  listScrollView: {
    flex: 1,
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#EFE6DD',
    overflow: 'hidden',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#EFE6DD',
  },
  listItemSelected: {
    backgroundColor: '#FFF0F3',
  },
  listText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#2C1A1D',
  },
  listTextSelected: {
    color: '#E91E63',
    fontWeight: '800',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#EFE6DD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#E91E63',
    borderColor: '#E91E63',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#EFE6DD',
  },
  prevBtn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: '#F5EFE6',
  },
  prevBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#5A4A4D',
  },
  nextBtn: {
    backgroundColor: '#E91E63',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 14,
    shadowColor: '#E91E63',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextBtnDisabled: {
    backgroundColor: '#EFE6DD',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
