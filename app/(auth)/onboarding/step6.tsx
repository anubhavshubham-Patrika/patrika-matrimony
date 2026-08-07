import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, TextInput, Modal 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';

export default function Step6() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [education, setEducation] = useState(state.onboardingData?.education?.degree || 'B.Tech / B.E.');
  const [field, setField] = useState(state.onboardingData?.education?.field || 'Engineering / Tech');
  const [employmentType, setEmploymentType] = useState(state.onboardingData?.employmentType || 'Private');
  const [occupation, setOccupation] = useState(state.onboardingData?.occupation || 'Software Engineer');
  const [annualIncomeRange, setAnnualIncomeRange] = useState(state.onboardingData?.annualIncomeRange || '10-20L');

  const [showEduModal, setShowEduModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  const educationOptions = ['B.Tech / B.E.', 'MBBS / MD', 'MBA / PGDM', 'B.Com / M.Com', 'B.Sc / M.Sc', 'CA / CS', 'LLB / LLM', 'PhD', '12th Pass', 'Other'];
  const incomeOptions = ['Below 2L', '2-5L', '5-10L', '10-20L', '20-30L', '30-50L', '50L+'];
  const employmentTypes = ['Private', 'Govt / Public', 'Business / Self-Employed', 'Defence', 'Civil Services', 'Not Working'];

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
      {/* Hero Banner */}
      <View style={styles.heroBannerContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop' }}
          style={styles.heroBannerImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />

        <View style={styles.topNavRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 6 of 13</Text>
          </View>
        </View>

        <View style={styles.curvedArchMask} />
      </View>

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerTitleBox}>
          <Text style={styles.questionTitle}>{t.step6Title}</Text>
          <Text style={styles.questionSubtitle}>{t.step6Subtitle}</Text>
        </View>

        {/* Highest Education */}
        <Text style={styles.sectionHeaderLabel}>Highest Education Degree</Text>
        <TouchableOpacity
          style={styles.dropdownTrigger}
          onPress={() => setShowEduModal(true)}
          activeOpacity={0.88}
        >
          <View style={styles.dropdownTriggerLeft}>
            <MaterialCommunityIcons name="school-outline" size={22} color="#E31E25" style={{ marginRight: 10 }} />
            <Text style={styles.dropdownValueText}>{education}</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#8C7A7C" />
        </TouchableOpacity>

        {/* Employment Type */}
        <Text style={styles.sectionHeaderLabel}>Employment Type</Text>
        <View style={styles.empGrid}>
          {employmentTypes.map((type) => {
            const isSel = employmentType === type;
            return (
              <TouchableOpacity
                key={type}
                style={[styles.empCard, isSel && styles.empCardSelected]}
                onPress={() => setEmploymentType(type)}
                activeOpacity={0.88}
              >
                <Text style={[styles.empLabel, isSel && styles.empLabelSelected]}>{type}</Text>
                <View style={[styles.radioOuterCircle, isSel && styles.radioOuterCircleSelected]}>
                  {isSel && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Occupation Field */}
        <Text style={styles.sectionHeaderLabel}>Occupation / Job Title</Text>
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="briefcase-outline" size={20} color="#8C7A7C" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.inputField}
            placeholder="Enter job title (e.g. Senior Software Engineer)"
            value={occupation}
            onChangeText={setOccupation}
            placeholderTextColor="#8C7A7C"
          />
        </View>

        {/* Annual Income */}
        <Text style={styles.sectionHeaderLabel}>Annual Income Range</Text>
        <TouchableOpacity
          style={styles.dropdownTrigger}
          onPress={() => setShowIncomeModal(true)}
          activeOpacity={0.88}
        >
          <View style={styles.dropdownTriggerLeft}>
            <MaterialCommunityIcons name="currency-inr" size={22} color="#E31E25" style={{ marginRight: 10 }} />
            <Text style={styles.dropdownValueText}>₹{annualIncomeRange} per annum</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#8C7A7C" />
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Education Modal */}
      <Modal visible={showEduModal} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Highest Education</Text>
              <TouchableOpacity onPress={() => setShowEduModal(false)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 320 }}>
              {educationOptions.map((e) => (
                <TouchableOpacity
                  key={e}
                  style={styles.modalOptionItem}
                  onPress={() => { setEducation(e); setShowEduModal(false); }}
                >
                  <Text style={[styles.modalOptionText, education === e && styles.modalOptionTextSelected]}>{e}</Text>
                  {education === e && <Ionicons name="checkmark" size={20} color="#E31E25" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Income Modal */}
      <Modal visible={showIncomeModal} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Annual Income Range</Text>
              <TouchableOpacity onPress={() => setShowIncomeModal(false)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 320 }}>
              {incomeOptions.map((inc) => (
                <TouchableOpacity
                  key={inc}
                  style={styles.modalOptionItem}
                  onPress={() => { setAnnualIncomeRange(inc); setShowIncomeModal(false); }}
                >
                  <Text style={[styles.modalOptionText, annualIncomeRange === inc && styles.modalOptionTextSelected]}>₹{inc} per annum</Text>
                  {annualIncomeRange === inc && <Ionicons name="checkmark" size={20} color="#E31E25" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Sticky Bottom Navigation Footer */}
      <View style={styles.footerContainer}>
        <View style={styles.progressRow}>
          <View style={styles.progressTrackBg}>
            <View style={[styles.progressBarFill, { width: `${(6 / 13) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>46%</Text>
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

  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 10,
  },
  dropdownTriggerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownValueText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C1A1D',
  },

  empGrid: {
    gap: 8,
    marginBottom: 6,
  },
  empCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
  },
  empCardSelected: {
    borderColor: '#E31E25',
    backgroundColor: '#FFF0F1',
  },
  empLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C1A1D',
  },
  empLabelSelected: {
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

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  inputField: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#2C1A1D',
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
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
    color: '#2C1A1D',
    fontFamily: 'serif',
  },
  modalOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#2C1A1D',
  },
  modalOptionTextSelected: {
    color: '#E31E25',
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
