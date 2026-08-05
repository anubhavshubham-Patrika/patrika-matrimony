import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import PatrikaRibbonLogo from '../../../src/components/PatrikaRibbonLogo';

export default function Step1() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [profileFor, setProfileFor] = useState(state.onboardingData?.profileFor || '');

  const options = [
    { id: 'Self', label: t.self, iconName: 'account-outline', iconType: 'material' },
    { id: 'Son', label: t.son, iconName: 'face-man-outline', iconType: 'material' },
    { id: 'Daughter', label: t.daughter, iconName: 'face-woman-outline', iconType: 'material' },
    { id: 'Brother', label: t.brother, iconName: 'account-tie-outline', iconType: 'material' },
    { id: 'Sister', label: t.sister, iconName: 'face-woman', iconType: 'material' },
    { id: 'Friend', label: t.friend, iconName: 'account-group-outline', iconType: 'material' },
    { id: 'Relative', label: t.relative, iconName: 'account-supervisor-outline', iconType: 'material' },
  ];

  const handleNext = () => {
    if (!profileFor) return;
    dispatch({ type: 'UPDATE_ONBOARDING', payload: { profileFor } });
    router.push('/(auth)/onboarding/step2');
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
        <Text style={styles.stepIndicator}>1/13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${(1 / 13) * 100}%` }]} />
      </View>

      {/* Content */}
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.step1Title}</Text>
        <Text style={styles.subtitle}>{t.step1Subtitle}</Text>

        <View style={styles.grid}>
          {options.map((item) => {
            const isSelected = profileFor === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.card, isSelected && styles.cardSelected]}
                onPress={() => setProfileFor(item.id)}
                activeOpacity={0.85}
              >
                <View style={[styles.iconCircle, isSelected && styles.iconCircleSelected]}>
                  <MaterialCommunityIcons
                    name={item.iconName as any}
                    size={32}
                    color={isSelected ? '#E31837' : '#666666'}
                  />
                </View>
                <Text style={[styles.cardLabel, isSelected && styles.cardLabelSelected]}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.nextBtn, !profileFor && styles.nextBtnDisabled]}
          onPress={handleNext}
          disabled={!profileFor}
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
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
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
    marginBottom: 28,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  card: {
    width: '47%',
    backgroundColor: '#FFFFFF',
    paddingVertical: 22,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#EFEFEF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  cardSelected: {
    borderColor: '#E31837',
    backgroundColor: '#FFF5F6',
    shadowColor: '#E31837',
    shadowOpacity: 0.15,
    elevation: 4,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  iconCircleSelected: {
    backgroundColor: '#FFEBF0',
  },
  cardLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  cardLabelSelected: {
    color: '#E31837',
    fontWeight: '800',
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
