import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';

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
    <SafeAreaView style={styles.container}>
      {/* Hero Banner */}
      <View style={styles.heroBannerContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop' }}
          style={styles.heroBannerImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />

        <View style={styles.topNavRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 8 of 13</Text>
          </View>
        </View>

        <View style={styles.curvedArchMask} />
      </View>

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
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
                style={[styles.hobbyChipCard, isSel && styles.hobbyChipCardSelected]}
                onPress={() => toggleHobby(item.id)}
                activeOpacity={0.85}
              >
                <MaterialCommunityIcons name={item.icon as any} size={18} color={isSel ? '#E31E25' : '#8C7A7C'} style={{ marginRight: 6 }} />
                <Text style={[styles.hobbyChipText, isSel && styles.hobbyChipTextSelected]}>{item.label}</Text>
                {isSel && <Ionicons name="checkmark" size={14} color="#E31E25" style={{ marginLeft: 4 }} />}
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
                  <MaterialCommunityIcons name={item.icon as any} size={20} color={isSel ? '#E31E25' : '#8C7A7C'} />
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

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Sticky Bottom Navigation Footer */}
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F6',
  },
  heroBannerContainer: {
    height: 180,
    width: '100%',
    position: 'relative',
  },
  heroBannerImage: {
    width: '100%',
    height: '100%',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(44, 26, 29, 0.35)',
  },
  topNavRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 12,
    zIndex: 10,
  },
  blurBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepPillBadge: {
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  stepPillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  curvedArchMask: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    right: 0,
    height: 24,
    backgroundColor: '#FFF9F6',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },

  contentScroll: {
    paddingHorizontal: 20,
    paddingTop: 4,
  },
  headerTitleBox: {
    marginBottom: 16,
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
    marginBottom: 4,
  },
  questionSubtitle: {
    fontSize: 14,
    color: '#5A4A4D',
    lineHeight: 20,
  },
  sectionHeaderLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2C1A1D',
    marginTop: 14,
    marginBottom: 8,
  },

  hobbiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  hobbyChipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  hobbyChipCardSelected: {
    borderColor: '#E31E25',
    backgroundColor: '#FFF0F1',
  },
  hobbyChipText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2C1A1D',
  },
  hobbyChipTextSelected: {
    color: '#E31E25',
    fontWeight: '800',
  },

  dietGrid: {
    gap: 8,
  },
  optionCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
  },
  optionCardRowSelected: {
    borderColor: '#E31E25',
    backgroundColor: '#FFF0F1',
  },
  iconCircleBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconCircleBadgeSelected: {
    backgroundColor: '#FFE4E6',
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#2C1A1D',
  },
  optionLabelSelected: {
    color: '#E31E25',
    fontWeight: '800',
  },
  radioOuterCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#A39396',
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
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
  },
  toggleLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2C1A1D',
    marginBottom: 8,
  },
  toggleBtnGroup: {
    flexDirection: 'row',
    backgroundColor: '#FFF9F6',
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
    fontSize: 13,
    fontWeight: '600',
    color: '#5A4A4D',
  },
  toggleBtnTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#EFE6DD',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 12,
  },
  progressTrackBg: {
    flex: 1,
    height: 6,
    backgroundColor: '#EFE6DD',
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
    color: '#E31E25',
  },
  continueBtn: {
    backgroundColor: '#E31E25',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
