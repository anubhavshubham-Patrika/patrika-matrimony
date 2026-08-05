import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import PatrikaRibbonLogo from '../../../src/components/PatrikaRibbonLogo';

export default function Step9() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const nakshatras = [
    'Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashirsha', 'Ardra', 'Punarvasu',
    'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra',
    'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha',
    'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'
  ];

  const [timeOfBirth, setTimeOfBirth] = useState(state.onboardingData?.horoscope?.timeOfBirth || '10:30 AM');
  const [placeOfBirth, setPlaceOfBirth] = useState(state.onboardingData?.horoscope?.placeOfBirth || 'Jaipur');
  const [star, setStar] = useState(state.onboardingData?.horoscope?.star || 'Rohini');

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: { horoscope: { timeOfBirth, placeOfBirth, star } },
    });
    router.push('/(auth)/onboarding/step10');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#200D08" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <PatrikaRibbonLogo size={26} />
          <Text style={styles.headerBrand}>Patrika Matrimony</Text>
        </View>
        <Text style={styles.stepIndicator}>9/13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${(9 / 13) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.step9Title}</Text>
        <Text style={styles.subtitle}>Enter time, place of birth & nakshatra for Guna Milan</Text>

        {/* Time of Birth */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.timeOfBirth}</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 10:30 AM"
            value={timeOfBirth}
            onChangeText={setTimeOfBirth}
            placeholderTextColor="#8C7B6B"
          />
        </View>

        {/* Place of Birth */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.placeOfBirth}</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Jaipur, Rajasthan"
            value={placeOfBirth}
            onChangeText={setPlaceOfBirth}
            placeholderTextColor="#8C7B6B"
          />
        </View>

        {/* Star / Nakshatra */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.nakshatra}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
            {nakshatras.map((n) => {
              const isSel = star === n;
              return (
                <TouchableOpacity
                  key={n}
                  style={[styles.chip, isSel && styles.chipSelected]}
                  onPress={() => setStar(n)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, isSel && styles.chipTextSelected]}>{n}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <TouchableOpacity style={styles.skipBtn} onPress={handleNext}>
          <Text style={styles.skipBtnText}>{t.skip}</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.88}>
          <Text style={styles.nextBtnText}>{t.continue}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFDF9',
    borderBottomWidth: 1,
    borderBottomColor: '#E2D7C7',
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
    color: '#6B0000',
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8C7B6B',
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#E8DFD3',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6B0000',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#200D08',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#665544',
    marginTop: 6,
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 22,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#200D08',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: '#E2D7C7',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#200D08',
  },
  chipScroll: {
    gap: 8,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F5EFE6',
    borderWidth: 1,
    borderColor: '#E2D7C7',
  },
  chipSelected: {
    backgroundColor: '#FFF5F6',
    borderColor: '#6B0000',
  },
  chipText: {
    fontSize: 14,
    color: '#200D08',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#6B0000',
    fontWeight: '700',
  },
  skipBtn: {
    alignSelf: 'center',
    paddingVertical: 12,
    marginTop: 10,
  },
  skipBtnText: {
    color: '#8C7B6B',
    fontSize: 15,
    fontWeight: '600',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFDF9',
    borderTopWidth: 1,
    borderColor: '#E2D7C7',
  },
  nextBtn: {
    backgroundColor: '#6B0000',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#6B0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextBtnText: {
    color: '#FFFDF9',
    fontSize: 17,
    fontWeight: '700',
  },
});
