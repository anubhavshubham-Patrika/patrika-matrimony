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
          <Ionicons name="arrow-back" size={24} color="#111111" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <PatrikaRibbonLogo size={26} />
          <Text style={styles.headerBrand}>Patrika Matrimony</Text>
        </View>
        <Text style={styles.stepIndicator}>3/13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${(3 / 13) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.step3Title}</Text>
        <Text style={styles.subtitle}>{t.step3Subtitle}</Text>

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
                  activeOpacity={0.8}
                >
                  <MaterialCommunityIcons
                    name={g === 'Male' ? 'gender-male' : 'gender-female'}
                    size={24}
                    color={isSel ? '#E31837' : '#666666'}
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
            activeOpacity={0.8}
          >
            <View style={styles.pickerTriggerLeft}>
              <Ionicons name="calendar-outline" size={22} color="#E31837" style={{ marginRight: 10 }} />
              <Text style={styles.pickerValueText}>{formattedDob}</Text>
            </View>
            <Text style={styles.ageBadge}>{calculatedAge} yrs old</Text>
          </TouchableOpacity>
        </View>

        {/* Height Feet & Inches Field */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.height}</Text>
          <TouchableOpacity
            style={styles.pickerTriggerCard}
            onPress={() => setShowHeightModal(true)}
            activeOpacity={0.8}
          >
            <View style={styles.pickerTriggerLeft}>
              <MaterialCommunityIcons name="ruler" size={22} color="#E31837" style={{ marginRight: 10 }} />
              <Text style={styles.pickerValueText}>{formattedHeight}</Text>
            </View>
            <Ionicons name="chevron-down" size={20} color="#666666" />
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
                  activeOpacity={0.8}
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
                  activeOpacity={0.8}
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
      </ScrollView>

      {/* Date of Birth Picker Modal */}
      <Modal visible={showDobModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Date of Birth</Text>
              <TouchableOpacity onPress={() => setShowDobModal(false)}>
                <Ionicons name="close" size={24} color="#111111" />
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
                <Ionicons name="close" size={24} color="#111111" />
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
  genderRow: {
    flexDirection: 'row',
    gap: 14,
  },
  genderCard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: '#EFEFEF',
    gap: 8,
  },
  genderCardSelected: {
    borderColor: '#E31837',
    backgroundColor: '#FFF5F6',
  },
  genderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666666',
  },
  genderTextSelected: {
    color: '#E31837',
    fontWeight: '800',
  },
  pickerTriggerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  pickerTriggerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerValueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111111',
  },
  ageBadge: {
    backgroundColor: '#FFEBF0',
    color: '#E31837',
    fontSize: 12,
    fontWeight: '700',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    gap: 12,
  },
  togglePill: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  togglePillSelected: {
    borderColor: '#E31837',
    backgroundColor: '#FFF5F6',
  },
  togglePillText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '500',
  },
  togglePillTextSelected: {
    color: '#E31837',
    fontWeight: '700',
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
    borderColor: '#EFEFEF',
    backgroundColor: '#FFFFFF',
  },
  radioCardSelected: {
    borderColor: '#E31837',
    backgroundColor: '#FFF5F6',
  },
  radioCardText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333333',
  },
  radioCardTextSelected: {
    color: '#E31837',
    fontWeight: '700',
  },
  radioDotOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D0D0D0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDotOuterSelected: {
    borderColor: '#E31837',
  },
  radioDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E31837',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
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
    color: '#111111',
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
    color: '#666666',
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
    backgroundColor: '#E31837',
  },
  pickerItemText: {
    fontSize: 15,
    color: '#333333',
  },
  pickerItemTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  modalDoneBtn: {
    backgroundColor: '#E31837',
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: 'center',
  },
  modalDoneBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
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
