import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Modal 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import MintGlassBackground from '../../../src/components/MintGlassBackground';

export default function Step10() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [collegeName, setCollegeName] = useState(state.onboardingData?.collegeName || 'MNIT Jaipur');
  const [organizationName, setOrganizationName] = useState(state.onboardingData?.organizationName || 'TCS');
  const [designation, setDesignation] = useState(state.onboardingData?.occupation || 'Senior Software Engineer');
  const [annualIncome, setAnnualIncome] = useState(state.onboardingData?.annualIncomeRange || '₹10 - ₹15 Lakhs');

  const [showIncomeModal, setShowIncomeModal] = useState(false);

  const incomeOptions = [
    'Below ₹2 Lakhs',
    '₹2 - ₹3 Lakhs',
    '₹3 - ₹5 Lakhs',
    '₹5 - ₹7 Lakhs',
    '₹7 - ₹10 Lakhs',
    '₹10 - ₹15 Lakhs',
    '₹15 - ₹20 Lakhs',
    '₹20 - ₹30 Lakhs',
    '₹30 - ₹50 Lakhs',
    '₹50 Lakhs - ₹1 Crore',
    '₹1 Crore+',
  ];

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        collegeName,
        organizationName,
        occupation: designation,
        annualIncomeRange: annualIncome,
      },
    });
    router.push('/(auth)/onboarding/step11');
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#0F2E2B" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 10 of 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.glassCardContainer}>
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="domain" size={30} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step10Title}</Text>
              <Text style={styles.questionSubtitle}>Enter education, work & income details</Text>
            </View>

            {/* College Name */}
            <Text style={styles.sectionHeaderLabel}>College / University Name</Text>
            <View style={styles.glassInputWrapper}>
              <MaterialCommunityIcons name="school-outline" size={20} color="#0D9488" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputField}
                placeholder="e.g. MNIT Jaipur, Rajasthan University"
                value={collegeName}
                onChangeText={setCollegeName}
                placeholderTextColor="#8C9E9B"
              />
            </View>

            {/* Organization Name */}
            <Text style={styles.sectionHeaderLabel}>Current Company / Employer Name</Text>
            <View style={styles.glassInputWrapper}>
              <MaterialCommunityIcons name="office-building-outline" size={20} color="#0D9488" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputField}
                placeholder="e.g. Infosys, TCS, State Bank of India"
                value={organizationName}
                onChangeText={setOrganizationName}
                placeholderTextColor="#8C9E9B"
              />
            </View>

            {/* Current Designation */}
            <Text style={styles.sectionHeaderLabel}>Current Designation / Job Role</Text>
            <View style={styles.glassInputWrapper}>
              <MaterialCommunityIcons name="badge-account-outline" size={20} color="#0D9488" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputField}
                placeholder="e.g. Senior Software Engineer, Manager"
                value={designation}
                onChangeText={setDesignation}
                placeholderTextColor="#8C9E9B"
              />
            </View>

            {/* Annual Income Dropdown Trigger */}
            <Text style={styles.sectionHeaderLabel}>Annual Income (Per Annum)</Text>
            <TouchableOpacity
              style={styles.dropdownGlassTrigger}
              onPress={() => setShowIncomeModal(true)}
              activeOpacity={0.88}
            >
              <View style={styles.dropdownTriggerLeft}>
                <MaterialCommunityIcons name="cash-multiple" size={22} color="#0D9488" style={{ marginRight: 10 }} />
                <Text style={styles.dropdownValueText}>{annualIncome}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#8C9E9B" />
            </TouchableOpacity>
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Annual Income Dropdown Modal */}
        <Modal visible={showIncomeModal} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalGlassCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Annual Income (P.A.)</Text>
                <TouchableOpacity onPress={() => setShowIncomeModal(false)}>
                  <Ionicons name="close" size={24} color="#0F2E2B" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 360 }} showsVerticalScrollIndicator={false}>
                {incomeOptions.map((inc) => (
                  <TouchableOpacity
                    key={inc}
                    style={styles.modalOptionItem}
                    onPress={() => { setAnnualIncome(inc); setShowIncomeModal(false); }}
                  >
                    <Text style={[styles.modalOptionText, annualIncome === inc && styles.modalOptionTextSelected]}>{inc}</Text>
                    {annualIncome === inc && <Ionicons name="checkmark" size={20} color="#0D9488" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <View style={styles.footerContainer}>
          <View style={styles.progressRow}>
            <View style={styles.progressTrackBg}>
              <View style={[styles.progressBarFill, { width: `${(10 / 13) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>77%</Text>
          </View>

          <TouchableOpacity style={styles.continueBtn} onPress={handleNext} activeOpacity={0.88}>
            <Text style={styles.continueBtnText}>{t.continue} →</Text>
          </TouchableOpacity>
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
    color: '#0F2E2B',
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
    shadowColor: '#0F2E2B',
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
    backgroundColor: '#0F2E2B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F2E2B',
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
    color: '#0F2E2B',
    fontFamily: 'serif',
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
    color: '#0F2E2B',
    marginTop: 14,
    marginBottom: 8,
  },

  glassInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1.5,
    borderColor: 'rgba(15, 46, 43, 0.12)',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  inputField: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#0F2E2B',
  },

  dropdownGlassTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1.5,
    borderColor: 'rgba(15, 46, 43, 0.12)',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },
  dropdownTriggerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownValueText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F2E2B',
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalGlassCard: {
    backgroundColor: '#F3FAF8',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  modalOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 46, 43, 0.08)',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#4A6B66',
  },
  modalOptionTextSelected: {
    color: '#0D9488',
    fontWeight: '800',
  },

  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(235, 247, 245, 0.92)',
    borderTopWidth: 1,
    borderColor: 'rgba(15, 46, 43, 0.1)',
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
    backgroundColor: 'rgba(15, 46, 43, 0.12)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0D9488',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0D9488',
  },
  continueBtn: {
    backgroundColor: '#0F2E2B',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F2E2B',
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
