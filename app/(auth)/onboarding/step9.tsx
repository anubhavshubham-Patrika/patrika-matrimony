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
          <Ionicons name="arrow-back" size={24} color="#2C1A1D" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <PatrikaRibbonLogo size={28} />
          <Text style={styles.headerBrand}>Patrika Matrimony</Text>
        </View>
        <Text style={styles.stepIndicator}>Step 9 of 13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${(9 / 13) * 100}%` }]} />
        </View>
        <Text style={styles.progressPercentText}>69% Complete</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <View style={styles.cardHeaderBanner}>
            <Text style={styles.cardHeaderTitle}>{t.step9Title}</Text>
            <Text style={styles.cardHeaderSubtitle}>Enter time, place of birth & nakshatra for Guna Milan</Text>
          </View>

          <View style={styles.cardBody}>
            {/* Green Live Activity Callout Pill */}
            <View style={styles.liveCalloutPill}>
              <Ionicons name="trending-up" size={16} color="#1E8449" style={{ marginRight: 6 }} />
              <Text style={styles.liveCalloutText}>127 verified profiles joined in the last 3 days!</Text>
            </View>

            {/* Time of Birth */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.timeOfBirth}</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. 10:30 AM"
                value={timeOfBirth}
                onChangeText={setTimeOfBirth}
                placeholderTextColor="#8C7A7C"
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
                placeholderTextColor="#8C7A7C"
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
                      activeOpacity={0.85}
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
          </View>
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.prevBtn} onPress={() => router.back()}>
          <Text style={styles.prevBtnText}>← Previous</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.88}>
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
    color: '#E31E25',
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
    backgroundColor: '#E31E25',
    borderRadius: 3,
  },
  progressPercentText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5A4A4D',
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  cardHeaderBanner: {
    backgroundColor: '#E31E25',
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
    padding: 20,
  },
  liveCalloutPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8F5',
    borderWidth: 1,
    borderColor: '#A3E4D7',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
  },
  liveCalloutText: {
    fontSize: 13,
    color: '#1E8449',
    fontWeight: '700',
    flex: 1,
  },
  fieldGroup: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C1A1D',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FAF5F7',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#2C1A1D',
  },
  chipScroll: {
    gap: 8,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#FAF5F7',
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  chipSelected: {
    backgroundColor: '#FFF0F3',
    borderColor: '#E91E63',
  },
  chipText: {
    fontSize: 13,
    color: '#2C1A1D',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#E91E63',
    fontWeight: '800',
  },
  skipBtn: {
    alignSelf: 'center',
    paddingVertical: 12,
    marginTop: 10,
  },
  skipBtnText: {
    color: '#E91E63',
    fontSize: 14,
    fontWeight: '700',
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
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
