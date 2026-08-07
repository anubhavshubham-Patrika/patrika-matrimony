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
          <Ionicons name="arrow-back" size={24} color="#2C1A1D" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <PatrikaRibbonLogo size={28} />
          <Text style={styles.headerBrand}>Patrika Matrimony</Text>
        </View>
        <Text style={styles.stepIndicator}>Step 6 of 13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${(6 / 13) * 100}%` }]} />
        </View>
        <Text style={styles.progressPercentText}>46% Complete</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <View style={styles.cardHeaderBanner}>
            <Text style={styles.cardHeaderTitle}>{t.step6Title}</Text>
            <Text style={styles.cardHeaderSubtitle}>{t.step6Subtitle}</Text>
          </View>

          <View style={styles.cardBody}>
            {/* Green Live Activity Callout Pill */}
            <View style={styles.liveCalloutPill}>
              <Ionicons name="trending-up" size={16} color="#1E8449" style={{ marginRight: 6 }} />
              <Text style={styles.liveCalloutText}>127 verified profiles joined in the last 3 days!</Text>
            </View>

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
                      activeOpacity={0.85}
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
                      activeOpacity={0.85}
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
                      activeOpacity={0.85}
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
                placeholderTextColor="#8C7A7C"
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
                      activeOpacity={0.85}
                    >
                      <Text style={[styles.chipText, isSel && styles.chipTextSelected]}>{inc}</Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
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
    backgroundColor: '#FFF9F6',
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
    color: '#E31E25',
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
    backgroundColor: '#E31E25',
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
  chipScroll: {
    gap: 8,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#FAF5F7',
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  chipSelected: {
    backgroundColor: '#FFF0F3',
    borderColor: '#E91E63',
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
  input: {
    backgroundColor: '#FAF5F7',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 15,
    color: '#2C1A1D',
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
