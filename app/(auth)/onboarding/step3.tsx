import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import PatrikaRibbonLogo from '../../../src/components/PatrikaRibbonLogo';

export default function Step3() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  // State
  const [gender, setGender] = useState(state.onboardingData?.gender || 'Male');
  const [physicalStatus, setPhysicalStatus] = useState(state.onboardingData?.physicalStatus || 'Normal');
  const [maritalStatus, setMaritalStatus] = useState(state.onboardingData?.maritalStatus || 'Never Married');

  // Height Feet & Inches
  const [feet, setFeet] = useState(5);
  const [inches, setInches] = useState(8);

  // Date of birth
  const [day, setDay] = useState(15);
  const [month, setMonth] = useState(8);
  const [year, setYear] = useState(1996);

  const [showDobModal, setShowDobModal] = useState(false);
  const [showHeightModal, setShowHeightModal] = useState(false);

  const feetOptions = [4, 5, 6, 7];
  const inchOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

  const monthsList = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const yearsList = Array.from({ length: 55 }, (_, i) => 2007 - i); // ages 18 to 72
  const daysList = Array.from({ length: 31 }, (_, i) => i + 1);

  const formattedDob = `${day < 10 ? '0' + day : day} ${monthsList[month - 1]} ${year}`;
  const calculatedAge = new Date().getFullYear() - year;
  const formattedHeight = `${feet}' ${inches}" (${Math.round((feet * 12 + inches) * 2.54)} cm)`;

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        gender,
        DOB: `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`,
        age: calculatedAge,
        height: `${feet}'${inches}"`,
        physicalStatus,
        maritalStatus,
      },
    });
    router.push('/(auth)/onboarding/step4');
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
        <Text style={styles.stepIndicator}>Step 3 of 13</Text>
      </View>

      {/* Progress Bar & Percentage */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${(3 / 13) * 100}%` }]} />
        </View>
        <Text style={styles.progressPercentText}>23% Complete</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {/* Floating White Card */}
        <View style={styles.formCard}>
          {/* Card Accent Header */}
          <View style={styles.cardHeaderBanner}>
            <Text style={styles.cardHeaderTitle}>{t.step3Title}</Text>
            <Text style={styles.cardHeaderSubtitle}>{t.step3Subtitle}</Text>
          </View>

          <View style={styles.cardBody}>
            {/* Green Live Activity Callout Pill */}
            <View style={styles.liveCalloutPill}>
              <Ionicons name="trending-up" size={16} color="#1E8449" style={{ marginRight: 6 }} />
              <Text style={styles.liveCalloutText}>127 verified profiles joined in the last 3 days!</Text>
            </View>

            {/* Gender Selection */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.gender}</Text>
              <View style={styles.genderRow}>
                {['Male', 'Female'].map((g) => {
                  const isSel = gender === g;
                  return (
                    <TouchableOpacity
                      key={g}
                      style={[styles.genderCard, isSel && styles.genderCardSelected]}
                      onPress={() => setGender(g)}
                      activeOpacity={0.85}
                    >
                      <MaterialCommunityIcons
                        name={g === 'Male' ? 'gender-male' : 'gender-female'}
                        size={24}
                        color={isSel ? '#E31E25' : '#8C7A7C'}
                      />
                      <Text style={[styles.genderText, isSel && styles.genderTextSelected]}>{g}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Date of Birth Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.dob}</Text>
              <TouchableOpacity
                style={styles.pickerTriggerCard}
                onPress={() => setShowDobModal(true)}
                activeOpacity={0.85}
              >
                <View style={styles.pickerTriggerLeft}>
                  <Ionicons name="calendar-outline" size={22} color="#E31E25" style={{ marginRight: 10 }} />
                  <Text style={styles.pickerValueText}>{formattedDob}</Text>
                </View>
                <View style={styles.ageBadge}>
                  <Text style={styles.ageBadgeText}>{calculatedAge} yrs old</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* Height Feet & Inches Field */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.height}</Text>
              <TouchableOpacity
                style={styles.pickerTriggerCard}
                onPress={() => setShowHeightModal(true)}
                activeOpacity={0.85}
              >
                <View style={styles.pickerTriggerLeft}>
                  <MaterialCommunityIcons name="ruler" size={22} color="#E31E25" style={{ marginRight: 10 }} />
                  <Text style={styles.pickerValueText}>{formattedHeight}</Text>
                </View>
                <Ionicons name="chevron-down" size={20} color="#8C7A7C" />
              </TouchableOpacity>
            </View>

            {/* Physical Status */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.physicalStatus}</Text>
              <View style={styles.toggleRow}>
                {['Normal', 'Differently Abled'].map((s) => {
                  const isSel = physicalStatus === s;
                  return (
                    <TouchableOpacity
                      key={s}
                      style={[styles.togglePill, isSel && styles.togglePillSelected]}
                      onPress={() => setPhysicalStatus(s)}
                      activeOpacity={0.85}
                    >
                      <Text style={[styles.togglePillText, isSel && styles.togglePillTextSelected]}>{s}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>

            {/* Marital Status */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.maritalStatus}</Text>
              <View style={styles.radioGrid}>
                {['Never Married', 'Divorced', 'Widowed', 'Separated'].map((m) => {
                  const isSel = maritalStatus === m;
                  return (
                    <TouchableOpacity
                      key={m}
                      style={[styles.radioCard, isSel && styles.radioCardSelected]}
                      onPress={() => setMaritalStatus(m)}
                      activeOpacity={0.85}
                    >
                      <Text style={[styles.radioCardText, isSel && styles.radioCardTextSelected]}>{m}</Text>
                      <View style={[styles.radioDotOuter, isSel && styles.radioDotOuterSelected]}>
                        {isSel && <View style={styles.radioDotInner} />}
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Date of Birth Picker Modal */}
      <Modal visible={showDobModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date of Birth</Text>
              <TouchableOpacity onPress={() => setShowDobModal(false)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
              </TouchableOpacity>
            </View>

            <View style={styles.datePickerColumns}>
              {/* Day Column */}
              <View style={styles.dateCol}>
                <Text style={styles.colHeader}>Day</Text>
                <ScrollView style={{ height: 180 }}>
                  {daysList.map((d) => (
                    <TouchableOpacity
                      key={d}
                      style={[styles.pickerItem, day === d && styles.pickerItemSelected]}
                      onPress={() => setDay(d)}
                    >
                      <Text style={[styles.pickerItemText, day === d && styles.pickerItemTextSelected]}>{d}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Month Column */}
              <View style={styles.dateCol}>
                <Text style={styles.colHeader}>Month</Text>
                <ScrollView style={{ height: 180 }}>
                  {monthsList.map((m, idx) => (
                    <TouchableOpacity
                      key={m}
                      style={[styles.pickerItem, month === idx + 1 && styles.pickerItemSelected]}
                      onPress={() => setMonth(idx + 1)}
                    >
                      <Text style={[styles.pickerItemText, month === idx + 1 && styles.pickerItemTextSelected]}>{m}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Year Column */}
              <View style={styles.dateCol}>
                <Text style={styles.colHeader}>Year</Text>
                <ScrollView style={{ height: 180 }}>
                  {yearsList.map((y) => (
                    <TouchableOpacity
                      key={y}
                      style={[styles.pickerItem, year === y && styles.pickerItemSelected]}
                      onPress={() => setYear(y)}
                    >
                      <Text style={[styles.pickerItemText, year === y && styles.pickerItemTextSelected]}>{y}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <TouchableOpacity style={styles.modalDoneBtn} onPress={() => setShowDobModal(false)}>
              <Text style={styles.modalDoneBtnText}>Done ({formattedDob})</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Height Feet & Inches Modal */}
      <Modal visible={showHeightModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Height (Feet & Inches)</Text>
              <TouchableOpacity onPress={() => setShowHeightModal(false)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
              </TouchableOpacity>
            </View>

            <View style={styles.heightPickerRow}>
              {/* Feet Picker Column */}
              <View style={styles.heightCol}>
                <Text style={styles.colHeader}>Feet</Text>
                <ScrollView style={{ height: 180 }}>
                  {feetOptions.map((f) => (
                    <TouchableOpacity
                      key={f}
                      style={[styles.pickerItem, feet === f && styles.pickerItemSelected]}
                      onPress={() => setFeet(f)}
                    >
                      <Text style={[styles.pickerItemText, feet === f && styles.pickerItemTextSelected]}>{f} ft</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>

              {/* Inches Picker Column */}
              <View style={styles.heightCol}>
                <Text style={styles.colHeader}>Inches</Text>
                <ScrollView style={{ height: 180 }}>
                  {inchOptions.map((i) => (
                    <TouchableOpacity
                      key={i}
                      style={[styles.pickerItem, inches === i && styles.pickerItemSelected]}
                      onPress={() => setInches(i)}
                    >
                      <Text style={[styles.pickerItemText, inches === i && styles.pickerItemTextSelected]}>{i} in</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

            <TouchableOpacity style={styles.modalDoneBtn} onPress={() => setShowHeightModal(false)}>
              <Text style={styles.modalDoneBtnText}>Done ({formattedHeight})</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Footer Navigation */}
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
  genderRow: {
    flexDirection: 'row',
    gap: 12,
  },
  genderCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: '#FAF5F7',
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
    gap: 8,
  },
  genderCardSelected: {
    borderColor: '#E91E63',
    backgroundColor: '#FFF0F3',
  },
  genderText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5A4A4D',
  },
  genderTextSelected: {
    color: '#E91E63',
    fontWeight: '800',
  },
  pickerTriggerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF5F7',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  pickerTriggerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerValueText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C1A1D',
  },
  ageBadge: {
    backgroundColor: '#FFF0F3',
    borderWidth: 1,
    borderColor: '#E91E63',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ageBadgeText: {
    color: '#E91E63',
    fontSize: 11,
    fontWeight: '800',
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
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
  radioGrid: {
    gap: 10,
  },
  radioCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
    backgroundColor: '#FAF5F7',
  },
  radioCardSelected: {
    borderColor: '#E91E63',
    backgroundColor: '#FFF0F3',
  },
  radioCardText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2C1A1D',
  },
  radioCardTextSelected: {
    color: '#E91E63',
    fontWeight: '800',
  },
  radioDotOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#EFE6DD',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDotOuterSelected: {
    borderColor: '#E91E63',
  },
  radioDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E91E63',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(44,26,29,0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
  },
  datePickerColumns: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dateCol: {
    flex: 1,
    marginHorizontal: 4,
  },
  colHeader: {
    fontSize: 13,
    fontWeight: '700',
    color: '#8C7A7C',
    textAlign: 'center',
    marginBottom: 6,
  },
  heightPickerRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  heightCol: {
    flex: 1,
    marginHorizontal: 12,
  },
  pickerItem: {
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: 2,
  },
  pickerItemSelected: {
    backgroundColor: '#E91E63',
  },
  pickerItemText: {
    fontSize: 15,
    color: '#2C1A1D',
  },
  pickerItemTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  modalDoneBtn: {
    backgroundColor: '#E91E63',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  modalDoneBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
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
