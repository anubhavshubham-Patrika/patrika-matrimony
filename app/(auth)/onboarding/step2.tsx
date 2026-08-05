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
    'Hindi',
    'Marwari / Rajasthani',
    'Punjabi',
    'Gujarati',
    'Marathi',
    'Bengali',
    'Tamil',
    'Telugu',
    'Kannada',
    'Malayalam',
    'Odia',
    'Assamese',
    'Urdu',
    'Sanskrit',
    'Kashmiri',
    'Sindhi',
    'Konkani',
    'Nepali',
    'Manipuri (Meitei)',
    'Bodo',
    'Dogri',
    'Santhali',
    'English',
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
          <Ionicons name="arrow-back" size={24} color="#111111" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <PatrikaRibbonLogo size={26} />
          <Text style={styles.headerBrand}>Patrika Matrimony</Text>
        </View>
        <Text style={styles.stepIndicator}>2/13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${(2 / 13) * 100}%` }]} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.title}>{t.step2Title}</Text>
        <Text style={styles.subtitle}>{t.step2Subtitle}</Text>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#666666" style={{ marginRight: 8 }} />
          <TextInput
            style={styles.searchInput}
            placeholder={t.searchLanguage}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999999"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#999999" />
            </TouchableOpacity>
          )}
        </View>

        {/* Selected Counter Pill */}
        <View style={styles.selectedCounterRow}>
          <Text style={styles.selectedCounterText}>
            Selected ({selectedLanguages.length}):{' '}
            <Text style={{ color: '#E31837', fontWeight: '700' }}>{selectedLanguages.join(', ')}</Text>
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
                  activeOpacity={0.8}
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

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextBtn, selectedLanguages.length === 0 && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={selectedLanguages.length === 0}
          activeOpacity={0.88}
        >
          <Text style={styles.nextBtnText}>{t.continue}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
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
    color: '#E31837',
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#F2F2F7',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#E31837',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
    marginBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#111111',
  },
  selectedCounterRow: {
    marginBottom: 12,
  },
  selectedCounterText: {
    fontSize: 13,
    color: '#666666',
  },
  listScrollView: {
    flex: 1,
  },
  listCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    overflow: 'hidden',
    marginBottom: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: '#F2F2F7',
  },
  listItemSelected: {
    backgroundColor: '#FFF5F6',
  },
  listText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333333',
  },
  listTextSelected: {
    color: '#E31837',
    fontWeight: '700',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxSelected: {
    backgroundColor: '#E31837',
    borderColor: '#E31837',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#F2F2F7',
  },
  nextBtn: {
    backgroundColor: '#E31837',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#E31837',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextBtnDisabled: {
    backgroundColor: '#F5A6B1',
    shadowOpacity: 0,
    elevation: 0,
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
