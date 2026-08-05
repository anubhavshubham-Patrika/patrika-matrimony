import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import PatrikaRibbonLogo from '../../../src/components/PatrikaRibbonLogo';

export default function Step6() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const educations = ['B.Tech / B.E.', 'MBBS / MD', 'MBA / PGDM', 'B.Com / M.Com', 'B.Sc / M.Sc', 'BCA / MCA', 'CA / CS', 'Law / LLB', 'PhD / Doctorate', '12th Pass', 'Other'];
  const fields = ['Engineering / Tech', 'Medicine / Healthcare', 'Management / Business', 'Banking / Finance', 'Arts / Humanities', 'Science / Biotech', 'Law / Legal', 'Civil Services / Govt', 'Other'];
  const employments = ['Private Company', 'Government / PSU', 'Business / Self-Employed', 'Defence / Armed Forces', 'Civil Services', 'Not Working'];
  const incomes = ['Below 3 Lakhs', '3 - 5 Lakhs', '5 - 10 Lakhs', '10 - 15 Lakhs', '15 - 25 Lakhs', '25 - 50 Lakhs', '50 Lakhs+'];

  const [education, setEducation] = useState(state.onboardingData?.education?.degree || 'B.Tech / B.E.');
  const [field, setField] = useState(state.onboardingData?.education?.field || 'Engineering / Tech');
  const [employmentType, setEmploymentType] = useState(state.onboardingData?.employmentType || 'Private Company');
  const [occupation, setOccupation] = useState(state.onboardingData?.occupation || '');
  const [annualIncomeRange, setAnnualIncomeRange] = useState(state.onboardingData?.annualIncomeRange || '10 - 15 Lakhs');

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        education: { degree: education, field },
        employmentType,
        occupation,
        annualIncomeRange,
      },
    });
    router.push('/(auth)/onboarding/step7');
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
        <Text style={styles.stepIndicator}>6/13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${(6 / 13) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.step6Title}</Text>
        <Text style={styles.subtitle}>{t.step6Subtitle}</Text>

        {/* Highest Education */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.highestDegree}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
            {educations.map((e) => {
              const isSel = education === e;
              return (
                <TouchableOpacity
                  key={e}
                  style={[styles.chip, isSel && styles.chipSelected]}
                  onPress={() => setEducation(e)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, isSel && styles.chipTextSelected]}>{e}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Field of Study */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.educationField}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
            {fields.map((f) => {
              const isSel = field === f;
              return (
                <TouchableOpacity
                  key={f}
                  style={[styles.chip, isSel && styles.chipSelected]}
                  onPress={() => setField(f)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, isSel && styles.chipTextSelected]}>{f}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Employment Type */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.employmentType}</Text>
          <View style={styles.chipGrid}>
            {employments.map((emp) => {
              const isSel = employmentType === emp;
              return (
                <TouchableOpacity
                  key={emp}
                  style={[styles.chipGridItem, isSel && styles.chipGridItemSelected]}
                  onPress={() => setEmploymentType(emp)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, isSel && styles.chipTextSelected]}>{emp}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Occupation Input */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.occupation}</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. Software Engineer / Senior Doctor / Manager"
            value={occupation}
            onChangeText={setOccupation}
            placeholderTextColor="#999999"
          />
        </View>

        {/* Annual Income */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.annualIncome}</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipScroll}>
            {incomes.map((inc) => {
              const isSel = annualIncomeRange === inc;
              return (
                <TouchableOpacity
                  key={inc}
                  style={[styles.chip, isSel && styles.chipSelected]}
                  onPress={() => setAnnualIncomeRange(inc)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, isSel && styles.chipTextSelected]}>{inc}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
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
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 6,
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
  chipScroll: {
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
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chipGridItem: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chipGridItemSelected: {
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
  input: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111111',
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
