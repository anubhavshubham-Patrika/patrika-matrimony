import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import AnimatedGlassBackground from '../../../src/components/AnimatedGlassBackground';

export default function Step8() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [selectedHobbies, setSelectedHobbies] = useState<string[]>(
    state.onboardingData?.hobbies?.length ? state.onboardingData.hobbies : ['Reading', 'Travel', 'Music']
  );
  const [diet, setDiet] = useState(state.onboardingData?.diet || 'Vegetarian');
  const [smoking, setSmoking] = useState(state.onboardingData?.smoking || 'No');
  const [drinking, setDrinking] = useState(state.onboardingData?.drinking || 'No');

  const hobbyOptions = [
    { id: 'Running', label: 'Running', icon: 'run' },
    { id: 'Reading', label: 'Reading', icon: 'book-open-variant' },
    { id: 'Music', label: 'Music', icon: 'music' },
    { id: 'Movies', label: 'Movies', icon: 'filmstrip' },
    { id: 'Travel', label: 'Travel', icon: 'airplane' },
    { id: 'Cooking', label: 'Cooking', icon: 'silverware-fork-knife' },
    { id: 'Photography', label: 'Photography', icon: 'camera' },
    { id: 'Cricket', label: 'Cricket', icon: 'cricket' },
    { id: 'Yoga', label: 'Yoga', icon: 'yoga' },
    { id: 'Dancing', label: 'Dancing', icon: 'human-female-dance' },
  ];

  const dietOptions = [
    { id: 'Vegetarian', label: 'Vegetarian', icon: 'leaf' },
    { id: 'Jain', label: 'Jain Vegetarian', icon: 'flower' },
    { id: 'Eggetarian', label: 'Eggetarian', icon: 'egg' },
    { id: 'Non-Vegetarian', label: 'Non-Vegetarian', icon: 'food-drumstick' },
  ];

  const toggleHobby = (hobbyId: string) => {
    if (selectedHobbies.includes(hobbyId)) {
      setSelectedHobbies(selectedHobbies.filter((h) => h !== hobbyId));
    } else {
      setSelectedHobbies([...selectedHobbies, hobbyId]);
    }
  };

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        hobbies: selectedHobbies,
        diet,
        smoking,
        drinking,
      },
    });
    router.push('/(auth)/onboarding/step9');
  };

  return (
    <AnimatedGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 8 of 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.glassCardContainer}>
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="palette-outline" size={32} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step8Title}</Text>
              <Text style={styles.questionSubtitle}>Select your lifestyle preferences and hobbies</Text>
            </View>

            {/* Hobbies Selection */}
            <Text style={styles.sectionHeaderLabel}>Hobbies & Interests (Select multiple)</Text>
            <View style={styles.hobbiesGrid}>
              {hobbyOptions.map((item) => {
                const isSel = selectedHobbies.includes(item.id);
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.hobbyGlassChip, isSel && styles.hobbyGlassChipSelected]}
                    onPress={() => toggleHobby(item.id)}
                    activeOpacity={0.85}
                  >
                    <MaterialCommunityIcons name={item.icon as any} size={18} color={isSel ? '#FFFFFF' : '#FF85A1'} style={{ marginRight: 6 }} />
                    <Text style={[styles.hobbyChipText, isSel && styles.hobbyChipTextSelected]}>{item.label}</Text>
                    {isSel && <Ionicons name="checkmark" size={14} color="#FFFFFF" style={{ marginLeft: 4 }} />}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Diet Options */}
            <Text style={styles.sectionHeaderLabel}>Dietary Habits</Text>
            <View style={styles.dietGrid}>
              {dietOptions.map((item) => {
                const isSel = diet === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.optionCardRow, isSel && styles.optionCardRowSelected]}
                    onPress={() => setDiet(item.id)}
                    activeOpacity={0.88}
                  >
                    <View style={[styles.iconCircleBadge, isSel && styles.iconCircleBadgeSelected]}>
                      <MaterialCommunityIcons name={item.icon as any} size={20} color={isSel ? '#FFFFFF' : '#FF85A1'} />
                    </View>
                    <Text style={[styles.optionLabel, isSel && styles.optionLabelSelected]}>{item.label}</Text>
                    <View style={[styles.radioOuterCircle, isSel && styles.radioOuterCircleSelected]}>
                      {isSel && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Smoking & Drinking Toggles */}
            <Text style={styles.sectionHeaderLabel}>Smoking & Drinking</Text>
            <View style={styles.toggleRowContainer}>
              <View style={styles.toggleItem}>
                <Text style={styles.toggleLabel}>Smoking</Text>
                <View style={styles.toggleBtnGroup}>
                  {(['No', 'Yes'] as const).map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={[styles.toggleBtn, smoking === opt && styles.toggleBtnActive]}
                      onPress={() => setSmoking(opt)}
                    >
                      <Text style={[styles.toggleBtnText, smoking === opt && styles.toggleBtnTextActive]}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              <View style={styles.toggleItem}>
                <Text style={styles.toggleLabel}>Drinking</Text>
                <View style={styles.toggleBtnGroup}>
                  {(['No', 'Yes'] as const).map((opt) => (
                    <TouchableOpacity
                      key={opt}
                      style={[styles.toggleBtn, drinking === opt && styles.toggleBtnActive]}
                      onPress={() => setDrinking(opt)}
                    >
                      <Text style={[styles.toggleBtnText, drinking === opt && styles.toggleBtnTextActive]}>{opt}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>

        <View style={styles.footerContainer}>
          <View style={styles.progressRow}>
            <View style={styles.progressTrackBg}>
              <View style={[styles.progressBarFill, { width: `${(8 / 13) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>61%</Text>
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
  sectionHeaderLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 14,
    marginBottom: 8,
  },

  hobbiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  hobbyGlassChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  hobbyGlassChipSelected: {
    borderColor: '#E31E25',
    backgroundColor: 'rgba(227, 30, 37, 0.25)',
  },
  hobbyChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#BDA6B2',
  },
  hobbyChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  dietGrid: {
    gap: 8,
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
  },
  iconCircleBadgeSelected: {
    backgroundColor: '#E31E25',
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
  radioOuterCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterCircleSelected: {
    backgroundColor: '#E31E25',
    borderColor: '#E31E25',
  },

  toggleRowContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  toggleItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
  toggleLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  toggleBtnGroup: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    padding: 3,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 10,
  },
  toggleBtnActive: {
    backgroundColor: '#E31E25',
  },
  toggleBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#BDA6B2',
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
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
