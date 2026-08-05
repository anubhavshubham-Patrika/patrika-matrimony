import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import PatrikaRibbonLogo from '../../../src/components/PatrikaRibbonLogo';

export default function Step8() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const hobbiesList = ['Running', 'Reading', 'Music', 'Movies', 'Travel', 'Cooking', 'Photography', 'Cricket', 'Yoga', 'Dancing', 'Painting', 'Gaming', 'Gardening', 'Fitness'];

  const [hobbies, setHobbies] = useState<string[]>(state.onboardingData?.hobbies || ['Reading', 'Travel']);
  const [diet, setDiet] = useState(state.onboardingData?.diet || 'Vegetarian');
  const [smoking, setSmoking] = useState(state.onboardingData?.smoking || 'No');
  const [drinking, setDrinking] = useState(state.onboardingData?.drinking || 'No');

  const toggleHobby = (hobby: string) => {
    if (hobbies.includes(hobby)) {
      setHobbies(hobbies.filter((h) => h !== hobby));
    } else {
      setHobbies([...hobbies, hobby]);
    }
  };

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: { hobbies, diet, smoking, drinking },
    });
    router.push('/(auth)/onboarding/step9');
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
        <Text style={styles.stepIndicator}>8/13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${(8 / 13) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.step8Title}</Text>

        {/* Diet */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.diet}</Text>
          <View style={styles.chipGrid}>
            {['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Jain'].map((d) => {
              const isSel = diet === d;
              return (
                <TouchableOpacity
                  key={d}
                  style={[styles.chip, isSel && styles.chipSelected]}
                  onPress={() => setDiet(d)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, isSel && styles.chipTextSelected]}>{d}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Smoking */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.smoking}</Text>
          <View style={styles.row}>
            {['No', 'Yes', 'Occasionally'].map((s) => {
              const isSel = smoking === s;
              return (
                <TouchableOpacity
                  key={s}
                  style={[styles.toggleBtn, isSel && styles.toggleBtnSelected]}
                  onPress={() => setSmoking(s)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.toggleText, isSel && styles.toggleTextSelected]}>{s}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Drinking */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.drinking}</Text>
          <View style={styles.row}>
            {['No', 'Yes', 'Occasionally'].map((d) => {
              const isSel = drinking === d;
              return (
                <TouchableOpacity
                  key={d}
                  style={[styles.toggleBtn, isSel && styles.toggleBtnSelected]}
                  onPress={() => setDrinking(d)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.toggleText, isSel && styles.toggleTextSelected]}>{d}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Hobbies & Interests */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.hobbies}</Text>
          <View style={styles.chipGrid}>
            {hobbiesList.map((h) => {
              const isSel = hobbies.includes(h);
              return (
                <TouchableOpacity
                  key={h}
                  style={[styles.chip, isSel && styles.chipSelected]}
                  onPress={() => toggleHobby(h)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, isSel && styles.chipTextSelected]}>{h}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
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
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: -0.5,
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 22,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 10,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: '#FFF5F6',
    borderColor: '#E31837',
  },
  chipText: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#E31837',
    fontWeight: '700',
  },
  row: {
    flexDirection: 'row',
    gap: 10,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  toggleBtnSelected: {
    borderColor: '#E31837',
    backgroundColor: '#FFF5F6',
  },
  toggleText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  toggleTextSelected: {
    color: '#E31837',
    fontWeight: '700',
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
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
