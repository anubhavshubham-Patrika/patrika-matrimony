import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import PatrikaRibbonLogo from '../../../src/components/PatrikaRibbonLogo';

export default function Step7() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const familyStatuses = ['Middle Class', 'Upper Middle Class', 'Rich / Affluent', 'High Networth Family'];

  const [familyStatus, setFamilyStatus] = useState(state.onboardingData?.familyStatus || 'Upper Middle Class');
  const [ancestralOrigin, setAncestralOrigin] = useState(state.onboardingData?.ancestralOrigin || 'Jaipur');
  const [aboutMe, setAboutMe] = useState(state.onboardingData?.aboutMe || '');
  const [aboutFamily, setAboutFamily] = useState(state.onboardingData?.aboutFamily || '');

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: { familyStatus, ancestralOrigin, aboutMe, aboutFamily },
    });
    router.push('/(auth)/onboarding/step8');
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
        <Text style={styles.stepIndicator}>7/13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${(7 / 13) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.step7Title}</Text>
        <Text style={styles.subtitle}>{t.step7Subtitle}</Text>

        {/* Family Status */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.familyStatus}</Text>
          <View style={styles.radioGrid}>
            {familyStatuses.map((fs) => {
              const isSel = familyStatus === fs;
              return (
                <TouchableOpacity
                  key={fs}
                  style={[styles.radioCard, isSel && styles.radioCardSelected]}
                  onPress={() => setFamilyStatus(fs)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.radioCardText, isSel && styles.radioCardTextSelected]}>{fs}</Text>
                  <View style={[styles.radioDotOuter, isSel && styles.radioDotOuterSelected]}>
                    {isSel && <View style={styles.radioDotInner} />}
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Ancestral Origin */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.ancestralOrigin}</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Jodhpur / Udaipur / Shekhawati"
            value={ancestralOrigin}
            onChangeText={setAncestralOrigin}
            placeholderTextColor="#8C7B6B"
          />
        </View>

        {/* About Candidate */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.aboutMe}</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Write 2-3 sentences about your personality, values and aspirations..."
            value={aboutMe}
            onChangeText={setAboutMe}
            multiline
            numberOfLines={4}
            placeholderTextColor="#8C7B6B"
          />
        </View>

        {/* About Family */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.aboutFamily} (Optional)</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Describe your family background, values and roots..."
            value={aboutFamily}
            onChangeText={setAboutFamily}
            multiline
            numberOfLines={3}
            placeholderTextColor="#8C7B6B"
          />
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
  radioGrid: {
    gap: 10,
  },
  radioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2D7C7',
    backgroundColor: '#FFFDF9',
  },
  radioCardSelected: {
    borderColor: '#6B0000',
    backgroundColor: '#FFF5F6',
  },
  radioCardText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#200D08',
  },
  radioCardTextSelected: {
    color: '#6B0000',
    fontWeight: '700',
  },
  radioDotOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E2D7C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDotOuterSelected: {
    borderColor: '#6B0000',
  },
  radioDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6B0000',
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
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
