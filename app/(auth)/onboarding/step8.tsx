import React, { useState } from 'react';
import PremiumButton from '../../../src/components/ui/PremiumButton';
import PremiumCard from '../../../src/components/ui/PremiumCard';
import { Typography } from '../../../src/constants/theme';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import MintGlassBackground from '../../../src/components/MintGlassBackground';

export default function Step8() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [diet, setDiet] = useState(state.onboardingData?.diet || 'Vegetarian');
  const [smoking, setSmoking] = useState(state.onboardingData?.smoking || 'No');
  const [drinking, setDrinking] = useState(state.onboardingData?.drinking || 'No');
  const [hobbies, setHobbies] = useState<string[]>(state.onboardingData?.hobbies || ['Reading', 'Travel', 'Music']);

  const diets = ['Vegetarian', 'Jain', 'Eggetarian', 'Non-Vegetarian'];
  const optionsYN = ['No', 'Yes'];
  const allHobbies = ['Running', 'Reading', 'Music', 'Movies', 'Travel', 'Cooking', 'Photography', 'Cricket', 'Yoga', 'Dancing', 'Painting', 'Gaming'];

  const toggleHobby = (h: string) => {
    if (hobbies.includes(h)) {
      setHobbies(hobbies.filter((item) => item !== h));
    } else {
      setHobbies([...hobbies, h]);
    }
  };

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        diet,
        smoking,
        drinking,
        hobbies,
      },
    });
    router.push('/(auth)/onboarding/step9');
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#183B82" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>08 / 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <PremiumCard variant="glass" style={styles.glassCardContainer}>
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="silverware-fork-knife" size={30} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step8Title}</Text>
              <Text style={styles.questionSubtitle}>Select your lifestyle habits & hobbies</Text>
            </View>

            {/* Diet */}
            <Text style={styles.sectionHeaderLabel}>Dietary Habits</Text>
            <View style={styles.chipsWrapRow}>
              {diets.map((d) => (
                <TouchableOpacity
                  key={d}
                  style={[styles.glassChip, diet === d && styles.glassChipSelected]}
                  onPress={() => setDiet(d)}
                >
                  <Text style={[styles.glassChipText, diet === d && styles.glassChipTextSelected]}>{d}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Smoking */}
            <Text style={styles.sectionHeaderLabel}>Smoking Habits</Text>
            <View style={styles.chipsWrapRow}>
              {optionsYN.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.glassChip, smoking === s && styles.glassChipSelected]}
                  onPress={() => setSmoking(s)}
                >
                  <Text style={[styles.glassChipText, smoking === s && styles.glassChipTextSelected]}>{s}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Drinking */}
            <Text style={styles.sectionHeaderLabel}>Drinking Habits</Text>
            <View style={styles.chipsWrapRow}>
              {optionsYN.map((dr) => (
                <TouchableOpacity
                  key={dr}
                  style={[styles.glassChip, drinking === dr && styles.glassChipSelected]}
                  onPress={() => setDrinking(dr)}
                >
                  <Text style={[styles.glassChipText, drinking === dr && styles.glassChipTextSelected]}>{dr}</Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Hobbies Grid */}
            <Text style={styles.sectionHeaderLabel}>Hobbies & Interests (Select multiple)</Text>
            <View style={styles.chipsWrapRow}>
              {allHobbies.map((h) => {
                const isSel = hobbies.includes(h);
                return (
                  <TouchableOpacity
                    key={h}
                    style={[styles.glassChip, isSel && styles.glassChipSelected]}
                    onPress={() => toggleHobby(h)}
                  >
                    <Text style={[styles.glassChipText, isSel && styles.glassChipTextSelected]}>{h}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </PremiumCard>
          <View style={{ height: 20 }} />
        </ScrollView>

        <View style={styles.footerContainer}>
          <PremiumButton title="Save & Continue →" onPress={handleNext} variant="primary" />
        </View>
      </SafeAreaView>
    </MintGlassBackground>
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
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepPillBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
  },
  stepPillText: {
    color: '#183B82',
    fontSize: 12,
    fontWeight: '700',
  },

  contentScroll: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  glassCardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 28,
    padding: 20,
    shadowColor: '#183B82',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },
  glowingVectorCircle: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#183B82',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#183B82',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  headerTitleBox: {
    alignItems: 'center',
    marginBottom: 14,
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#183B82',
    fontFamily: Typography.fontFamily.serif,
    textAlign: 'center',
    marginBottom: 4,
  },
  questionSubtitle: {
    fontSize: 13,
    color: '#4A6B66',
    textAlign: 'center',
    lineHeight: 18,
  },
  sectionHeaderLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#183B82',
    marginTop: 14,
    marginBottom: 8,
  },

  chipsWrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  glassChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(15, 46, 43, 0.14)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  glassChipSelected: {
    backgroundColor: '#183B82',
    borderColor: '#183B82',
  },
  glassChipText: {
    fontSize: 12,
    color: '#183B82',
    fontWeight: '600',
  },
  glassChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(243, 247, 255, 0.92)',
    borderTopWidth: 1,
    borderColor: 'rgba(24, 59, 130, 0.1)',
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
    backgroundColor: 'rgba(24, 59, 130, 0.12)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4169D8',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4169D8',
  },
  continueBtn: {
    backgroundColor: '#183B82',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#183B82',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
