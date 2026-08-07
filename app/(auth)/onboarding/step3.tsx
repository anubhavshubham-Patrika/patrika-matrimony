import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import MintGlassBackground from '../../../src/components/MintGlassBackground';

export default function Step3() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [gender, setGender] = useState<'Male' | 'Female'>(state.onboardingData?.gender as any || 'Male');
  const [maritalStatus, setMaritalStatus] = useState(state.onboardingData?.maritalStatus || 'Never Married');
  const [height, setHeight] = useState(state.onboardingData?.height || "5'6\"");
  const [showHeightModal, setShowHeightModal] = useState(false);

  const heights = [
    "4'6\"", "4'7\"", "4'8\"", "4'9\"", "4'10\"", "4'11\"",
    "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"",
    "6'0\"", "6'1\"", "6'2\"", "6'3\"", "6'4\"", "6'5\"", "6'6\""
  ];

  const maritalOptions = [
    { id: 'Never Married', label: 'Never Married', icon: 'heart-outline' },
    { id: 'Divorced', label: 'Divorced', icon: 'swap-horizontal' },
    { id: 'Widowed', label: 'Widowed', icon: 'shield-outline' },
    { id: 'Separated', label: 'Separated', icon: 'remove-circle-outline' },
  ];

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        gender,
        maritalStatus,
        height,
        DOB: '1998-05-15',
      },
    });
    router.push('/(auth)/onboarding/step4');
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#0F2E2B" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 3 of 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.glassCardContainer}>
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="account-heart-outline" size={30} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step3Title}</Text>
              <Text style={styles.questionSubtitle}>{t.step3Subtitle}</Text>
            </View>

            {/* Gender Choice Section */}
            <Text style={styles.sectionHeaderLabel}>Gender</Text>
            <View style={styles.genderGridRow}>
              {(['Male', 'Female'] as const).map((g) => {
                const isSel = gender === g;
                return (
                  <TouchableOpacity
                    key={g}
                    style={[styles.genderGlassCard, isSel && styles.genderGlassCardSelected]}
                    onPress={() => setGender(g)}
                    activeOpacity={0.88}
                  >
                    <View style={[styles.genderIconBadge, isSel && styles.genderIconBadgeSelected]}>
                      <MaterialCommunityIcons
                        name={g === 'Male' ? 'gender-male' : 'gender-female'}
                        size={26}
                        color={isSel ? '#FFFFFF' : '#0D9488'}
                      />
                    </View>
                    <Text style={[styles.genderLabelText, isSel && styles.genderLabelTextSelected]}>{g}</Text>
                    {isSel && (
                      <View style={styles.genderCheckMark}>
                        <Ionicons name="checkmark-circle" size={18} color="#0F2E2B" />
                      </View>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Height Dropdown Trigger */}
            <Text style={styles.sectionHeaderLabel}>Height</Text>
            <TouchableOpacity
              style={styles.dropdownGlassTrigger}
              onPress={() => setShowHeightModal(true)}
              activeOpacity={0.88}
            >
              <View style={styles.dropdownTriggerLeft}>
                <MaterialCommunityIcons name="ruler" size={22} color="#0D9488" style={{ marginRight: 10 }} />
                <Text style={styles.dropdownValueText}>{height}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#8C9E9B" />
            </TouchableOpacity>

            {/* Marital Status Section */}
            <Text style={styles.sectionHeaderLabel}>Marital Status</Text>
            <View style={styles.maritalGrid}>
              {maritalOptions.map((item) => {
                const isSel = maritalStatus === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[styles.optionCardRow, isSel && styles.optionCardRowSelected]}
                    onPress={() => setMaritalStatus(item.id)}
                    activeOpacity={0.88}
                  >
                    <View style={[styles.iconCircleBadge, isSel && styles.iconCircleBadgeSelected]}>
                      <Ionicons name={item.icon as any} size={18} color={isSel ? '#FFFFFF' : '#0D9488'} />
                    </View>
                    <Text style={[styles.optionLabel, isSel && styles.optionLabelSelected]}>{item.label}</Text>
                    <View style={[styles.radioOuterCircle, isSel && styles.radioOuterCircleSelected]}>
                      {isSel && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Height Selection Modal */}
        <Modal visible={showHeightModal} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalGlassCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Height</Text>
                <TouchableOpacity onPress={() => setShowHeightModal(false)}>
                  <Ionicons name="close" size={24} color="#0F2E2B" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 320 }}>
                {heights.map((h) => (
                  <TouchableOpacity
                    key={h}
                    style={styles.modalOptionItem}
                    onPress={() => { setHeight(h); setShowHeightModal(false); }}
                  >
                    <Text style={[styles.modalOptionText, height === h && styles.modalOptionTextSelected]}>{h}</Text>
                    {height === h && <Ionicons name="checkmark" size={20} color="#0D9488" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        <View style={styles.footerContainer}>
          <View style={styles.progressRow}>
            <View style={styles.progressTrackBg}>
              <View style={[styles.progressBarFill, { width: `${(3 / 13) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>23%</Text>
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

  genderGridRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  genderGlassCard: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 18,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(15, 46, 43, 0.12)',
    position: 'relative',
  },
  genderGlassCardSelected: {
    borderColor: '#0F2E2B',
    backgroundColor: 'rgba(15, 46, 43, 0.08)',
  },
  genderIconBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  genderIconBadgeSelected: {
    backgroundColor: '#0F2E2B',
  },
  genderLabelText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0F2E2B',
  },
  genderLabelTextSelected: {
    color: '#0F2E2B',
    fontWeight: '800',
  },
  genderCheckMark: {
    position: 'absolute',
    top: 8,
    right: 8,
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

  maritalGrid: {
    gap: 9,
  },
  optionCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 46, 43, 0.12)',
  },
  optionCardRowSelected: {
    borderColor: '#0F2E2B',
    backgroundColor: 'rgba(15, 46, 43, 0.08)',
  },
  iconCircleBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconCircleBadgeSelected: {
    backgroundColor: '#0F2E2B',
  },
  optionLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#0F2E2B',
  },
  optionLabelSelected: {
    color: '#0F2E2B',
    fontWeight: '800',
  },
  radioOuterCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: 'rgba(15, 46, 43, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterCircleSelected: {
    backgroundColor: '#0F2E2B',
    borderColor: '#0F2E2B',
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
