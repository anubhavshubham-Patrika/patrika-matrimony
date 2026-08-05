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

  const diets = ['Vegetarian', 'Jain', 'Eggetarian', 'Non-Vegetarian'];
  const hobbiesList = [
    'Reading', 'Music', 'Travel', 'Cooking', 'Fitness / Yoga', 'Cricket',
    'Movies / Series', 'Photography', 'Dancing', 'Painting', 'Gardening', 'Writing'
  ];

  const [diet, setDiet] = useState(state.onboardingData?.diet || 'Vegetarian');
  const [smoking, setSmoking] = useState(state.onboardingData?.smoking || 'No');
  const [drinking, setDrinking] = useState(state.onboardingData?.drinking || 'No');
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(
    state.onboardingData?.hobbies || ['Reading', 'Travel', 'Cooking']
  );

  const toggleHobby = (h: string) => {
    if (selectedHobbies.includes(h)) {
      setSelectedHobbies(selectedHobbies.filter((item) => item !== h));
    } else {
      setSelectedHobbies([...selectedHobbies, h]);
    }
  };

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: { diet, smoking, drinking, hobbies: selectedHobbies },
    });
    router.push('/(auth)/onboarding/step9');
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
        <Text style={styles.stepIndicator}>8/13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${(8 / 13) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.step8Title}</Text>
        <Text style={styles.subtitle}>Select diet, lifestyle & personal interests</Text>

        {/* Diet Selection */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.diet}</Text>
          <View style={styles.chipGrid}>
            {diets.map((d) => {
              const isSel = diet === d;
              return (
                <TouchableOpacity
                  key={d}
                  style={[styles.chipGridItem, isSel && styles.chipGridItemSelected]}
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
          <View style={styles.toggleRow}>
            {['No', 'Occasionally', 'Yes'].map((s) => {
              const isSel = smoking === s;
              return (
                <TouchableOpacity
                  key={s}
                  style={[styles.togglePill, isSel && styles.togglePillSelected]}
                  onPress={() => setSmoking(s)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.togglePillText, isSel && styles.togglePillTextSelected]}>{s}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Drinking */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.drinking}</Text>
          <View style={styles.toggleRow}>
            {['No', 'Occasionally', 'Yes'].map((d) => {
              const isSel = drinking === d;
              return (
                <TouchableOpacity
                  key={d}
                  style={[styles.togglePill, isSel && styles.togglePillSelected]}
                  onPress={() => setDrinking(d)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.togglePillText, isSel && styles.togglePillTextSelected]}>{d}</Text>
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
              const isSel = selectedHobbies.includes(h);
              return (
                <TouchableOpacity
                  key={h}
                  style={[styles.chipGridItem, isSel && styles.chipGridItemSelected]}
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
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  togglePill: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E2D7C7',
    backgroundColor: '#FFFDF9',
  },
  togglePillSelected: {
    borderColor: '#6B0000',
    backgroundColor: '#FFF5F6',
  },
  togglePillText: {
    fontSize: 14,
    color: '#665544',
    fontWeight: '500',
  },
  togglePillTextSelected: {
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
