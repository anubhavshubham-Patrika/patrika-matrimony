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
          <Ionicons name="arrow-back" size={24} color="#2C1A1D" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <PatrikaRibbonLogo size={28} />
          <Text style={styles.headerBrand}>Patrika Matrimony</Text>
        </View>
        <Text style={styles.stepIndicator}>Step 8 of 13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${(8 / 13) * 100}%` }]} />
        </View>
        <Text style={styles.progressPercentText}>61% Complete</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <View style={styles.cardHeaderBanner}>
            <Text style={styles.cardHeaderTitle}>{t.step8Title}</Text>
            <Text style={styles.cardHeaderSubtitle}>Select diet, lifestyle & personal interests</Text>
          </View>

          <View style={styles.cardBody}>
            {/* Green Live Activity Callout Pill */}
            <View style={styles.liveCalloutPill}>
              <Ionicons name="trending-up" size={16} color="#1E8449" style={{ marginRight: 6 }} />
              <Text style={styles.liveCalloutText}>127 verified profiles joined in the last 3 days!</Text>
            </View>

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
                      activeOpacity={0.85}
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
                      activeOpacity={0.85}
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
                      activeOpacity={0.85}
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
                      activeOpacity={0.85}
                    >
                      <Text style={[styles.chipText, isSel && styles.chipTextSelected]}>{h}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
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
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipGridItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#FAF5F7',
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  chipGridItemSelected: {
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
  toggleRow: {
    flexDirection: 'row',
    gap: 10,
  },
  togglePill: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
    backgroundColor: '#FAF5F7',
  },
  togglePillSelected: {
    borderColor: '#E91E63',
    backgroundColor: '#FFF0F3',
  },
  togglePillText: {
    fontSize: 14,
    color: '#5A4A4D',
    fontWeight: '600',
  },
  togglePillTextSelected: {
    color: '#E91E63',
    fontWeight: '800',
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
