import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import PatrikaRibbonLogo from '../../../src/components/PatrikaRibbonLogo';

export default function Step13() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [prefAgeMin, setPrefAgeMin] = useState(21);
  const [prefAgeMax, setPrefAgeMax] = useState(32);

  const preferredReligions = ['Hindu', 'Jain', 'Sikh', 'Any'];
  const [selectedReligion, setSelectedReligion] = useState('Hindu');

  const preferredCastes = ['Rajput', 'Agarwal', 'Brahmin', 'Marwari', 'Jain', 'Any'];
  const [selectedCaste, setSelectedCaste] = useState('Rajput');

  const preferredDiets = ['Vegetarian', 'Jain', 'Eggetarian', 'Any'];
  const [selectedDiet, setSelectedDiet] = useState('Vegetarian');

  const handleFinish = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        religion: selectedReligion,
        caste: selectedCaste,
        diet: selectedDiet,
      },
    });
    router.push('/(auth)/onboarding/welcome');
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
        <Text style={styles.stepIndicator}>13/13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${(13 / 13) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.step13Title}</Text>
        <Text style={styles.subtitle}>Set desired age, caste & location criteria</Text>

        {/* Preferred Age Range */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.preferredAge}</Text>
          <View style={styles.rangeBox}>
            <Text style={styles.rangeText}>{prefAgeMin} yrs - {prefAgeMax} yrs</Text>
          </View>
        </View>

        {/* Preferred Religion */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Preferred Religion</Text>
          <View style={styles.chipGrid}>
            {preferredReligions.map((r) => {
              const isSel = selectedReligion === r;
              return (
                <TouchableOpacity
                  key={r}
                  style={[styles.chipGridItem, isSel && styles.chipGridItemSelected]}
                  onPress={() => setSelectedReligion(r)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, isSel && styles.chipTextSelected]}>{r}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Preferred Caste */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Preferred Caste / Community</Text>
          <View style={styles.chipGrid}>
            {preferredCastes.map((c) => {
              const isSel = selectedCaste === c;
              return (
                <TouchableOpacity
                  key={c}
                  style={[styles.chipGridItem, isSel && styles.chipGridItemSelected]}
                  onPress={() => setSelectedCaste(c)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, isSel && styles.chipTextSelected]}>{c}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Preferred Diet */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Preferred Diet</Text>
          <View style={styles.chipGrid}>
            {preferredDiets.map((d) => {
              const isSel = selectedDiet === d;
              return (
                <TouchableOpacity
                  key={d}
                  style={[styles.chipGridItem, isSel && styles.chipGridItemSelected]}
                  onPress={() => setSelectedDiet(d)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, isSel && styles.chipTextSelected]}>{d}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleFinish} activeOpacity={0.88}>
          <Text style={styles.nextBtnText}>Complete Profile Setup ✨</Text>
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
  rangeBox: {
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: '#E2D7C7',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  rangeText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#6B0000',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipGridItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#F5EFE6',
    borderWidth: 1,
    borderColor: '#E2D7C7',
  },
  chipGridItemSelected: {
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
