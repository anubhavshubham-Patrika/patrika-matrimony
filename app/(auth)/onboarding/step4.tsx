import React, { useState } from 'react';
import PremiumButton from '../../../src/components/ui/PremiumButton';
import PremiumCard from '../../../src/components/ui/PremiumCard';
import { Typography } from '../../../src/constants/theme';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import MintGlassBackground from '../../../src/components/MintGlassBackground';

export default function Step4() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [religion, setReligion] = useState(state.onboardingData?.religion || 'Hindu');
  const [caste, setCaste] = useState(state.onboardingData?.caste || 'Rajput');
  const [subCaste, setSubCaste] = useState(state.onboardingData?.subCaste || 'Rathore');
  const [gotra, setGotra] = useState(state.onboardingData?.gotra || '');
  const [manglikStatus, setManglikStatus] = useState(state.onboardingData?.manglikStatus || 'Non-Manglik');

  const [showReligionModal, setShowReligionModal] = useState(false);
  const [showCasteModal, setShowCasteModal] = useState(false);
  const [showSubCasteModal, setShowSubCasteModal] = useState(false);

  const religions = ['Hindu', 'Muslim', 'Sikh', 'Jain', 'Christian', 'Parsi', 'Buddhist', 'Other'];
  const popularCastes = ['Rajput', 'Agarwal', 'Brahmin', 'Marwari', 'Jain', 'Sindhi', 'Jat', 'Gupta', 'Maheshwari', 'Other'];
  
  const popularSubCastes = [
    'Rathore', 'Chauhan', 'Shekhawat', 'Sisodia', 'Kachhwaha', 'Parmar', 'Solanki', 'Bhati',
    'Garg', 'Bansal', 'Mittal', 'Goyal', 'Kansal', 'Singhal',
    'Gaur', 'Sharma', 'Vashistha', 'Khandelwal', 'Oswal', 'Jha', 'Mishra',
    'Other / Don\'t wish to specify'
  ];

  const manglikOptions = ['Non-Manglik', 'Manglik', 'Partial Manglik', "Don't Know"];

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        religion,
        caste,
        subCaste,
        gotra,
        manglikStatus,
      },
    });
    router.push('/(auth)/onboarding/step5');
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#183B82" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>04 / 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <PremiumCard variant="glass" style={styles.glassCardContainer}>
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="flower-tulip-outline" size={30} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step4Title}</Text>
              <Text style={styles.questionSubtitle}>Select religion, caste, sub-caste & gotra</Text>
            </View>

            {/* Religion Trigger */}
            <Text style={styles.sectionHeaderLabel}>Religion</Text>
            <TouchableOpacity
              style={styles.dropdownGlassTrigger}
              onPress={() => setShowReligionModal(true)}
              activeOpacity={0.88}
            >
              <View style={styles.dropdownTriggerLeft}>
                <MaterialCommunityIcons name="flower" size={22} color="#4169D8" style={{ marginRight: 10 }} />
                <Text style={styles.dropdownValueText}>{religion}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#8C9E9B" />
            </TouchableOpacity>

            {/* Caste Trigger */}
            <Text style={styles.sectionHeaderLabel}>Caste / Community</Text>
            <TouchableOpacity
              style={styles.dropdownGlassTrigger}
              onPress={() => setShowCasteModal(true)}
              activeOpacity={0.88}
            >
              <View style={styles.dropdownTriggerLeft}>
                <MaterialCommunityIcons name="account-group" size={22} color="#4169D8" style={{ marginRight: 10 }} />
                <Text style={styles.dropdownValueText}>{caste}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#8C9E9B" />
            </TouchableOpacity>

            {/* Sub-Caste Trigger */}
            <Text style={styles.sectionHeaderLabel}>Sub-Caste</Text>
            <TouchableOpacity
              style={styles.dropdownGlassTrigger}
              onPress={() => setShowSubCasteModal(true)}
              activeOpacity={0.88}
            >
              <View style={styles.dropdownTriggerLeft}>
                <MaterialCommunityIcons name="account-multiple-outline" size={22} color="#4169D8" style={{ marginRight: 10 }} />
                <Text style={styles.dropdownValueText}>{subCaste}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#8C9E9B" />
            </TouchableOpacity>

            {/* Gotra Input */}
            <Text style={styles.sectionHeaderLabel}>Gotra (Optional)</Text>
            <View style={styles.glassInputWrapper}>
              <MaterialCommunityIcons name="star-outline" size={20} color="#4169D8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputField}
                placeholder="Enter your Gotra (e.g. Kashyap, Vashistha)"
                value={gotra}
                onChangeText={setGotra}
                placeholderTextColor="#8C9E9B"
              />
            </View>

            {/* Manglik Options */}
            <Text style={styles.sectionHeaderLabel}>Manglik Status</Text>
            <View style={styles.manglikGrid}>
              {manglikOptions.map((item) => {
                const isSel = manglikStatus === item;
                return (
                  <TouchableOpacity
                    key={item}
                    style={[styles.manglikCard, isSel && styles.manglikCardSelected]}
                    onPress={() => setManglikStatus(item)}
                    activeOpacity={0.88}
                  >
                    <Text style={[styles.manglikLabel, isSel && styles.manglikLabelSelected]}>{item}</Text>
                    <View style={[styles.radioOuterCircle, isSel && styles.radioOuterCircleSelected]}>
                      {isSel && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </PremiumCard>
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Religion Modal */}
        <Modal visible={showReligionModal} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalGlassCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Religion</Text>
                <TouchableOpacity onPress={() => setShowReligionModal(false)}>
                  <Ionicons name="close" size={24} color="#183B82" />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 320 }}>
                {religions.map((r) => (
                  <TouchableOpacity
                    key={r}
                    style={styles.modalOptionItem}
                    onPress={() => { setReligion(r); setShowReligionModal(false); }}
                  >
                    <Text style={[styles.modalOptionText, religion === r && styles.modalOptionTextSelected]}>{r}</Text>
                    {religion === r && <Ionicons name="checkmark" size={20} color="#4169D8" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Caste Modal */}
        <Modal visible={showCasteModal} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalGlassCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Caste / Community</Text>
                <TouchableOpacity onPress={() => setShowCasteModal(false)}>
                  <Ionicons name="close" size={24} color="#183B82" />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 320 }}>
                {popularCastes.map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={styles.modalOptionItem}
                    onPress={() => { setCaste(c); setShowCasteModal(false); }}
                  >
                    <Text style={[styles.modalOptionText, caste === c && styles.modalOptionTextSelected]}>{c}</Text>
                    {caste === c && <Ionicons name="checkmark" size={20} color="#4169D8" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* Sub-Caste Modal */}
        <Modal visible={showSubCasteModal} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalGlassCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Sub-Caste</Text>
                <TouchableOpacity onPress={() => setShowSubCasteModal(false)}>
                  <Ionicons name="close" size={24} color="#183B82" />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 340 }}>
                {popularSubCastes.map((sc) => (
                  <TouchableOpacity
                    key={sc}
                    style={styles.modalOptionItem}
                    onPress={() => { setSubCaste(sc); setShowSubCasteModal(false); }}
                  >
                    <Text style={[styles.modalOptionText, subCaste === sc && styles.modalOptionTextSelected]}>{sc}</Text>
                    {subCaste === sc && <Ionicons name="checkmark" size={20} color="#4169D8" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

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

  dropdownGlassTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1.5,
    borderColor: 'rgba(24, 59, 130, 0.12)',
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
    color: '#183B82',
  },

  glassInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1.5,
    borderColor: 'rgba(24, 59, 130, 0.12)',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  inputField: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#183B82',
  },

  manglikGrid: {
    gap: 9,
  },
  manglikCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 13,
    borderWidth: 1.5,
    borderColor: 'rgba(24, 59, 130, 0.12)',
  },
  manglikCardSelected: {
    borderColor: '#183B82',
    backgroundColor: 'rgba(24, 59, 130, 0.08)',
  },
  manglikLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#183B82',
  },
  manglikLabelSelected: {
    color: '#183B82',
    fontWeight: '800',
  },
  radioOuterCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(24, 59, 130, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterCircleSelected: {
    backgroundColor: '#183B82',
    borderColor: '#183B82',
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
    color: '#183B82',
    fontFamily: Typography.fontFamily.serif,
  },
  modalOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(24, 59, 130, 0.08)',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#4A6B66',
  },
  modalOptionTextSelected: {
    color: '#4169D8',
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
