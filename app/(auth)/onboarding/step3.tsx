import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, Modal 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';

export default function Step3() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [gender, setGender] = useState<'Male' | 'Female'>(state.onboardingData?.gender as any || 'Male');
  const [maritalStatus, setMaritalStatus] = useState(state.onboardingData?.maritalStatus || 'Never Married');
  const [height, setHeight] = useState(state.onboardingData?.height || "5'6\"");
  const [physicalStatus, setPhysicalStatus] = useState(state.onboardingData?.physicalStatus || 'Normal');
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
        physicalStatus,
        DOB: '1998-05-15',
      },
    });
    router.push('/(auth)/onboarding/step4');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hero Banner */}
      <View style={styles.heroBannerContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop' }}
          style={styles.heroBannerImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />

        <View style={styles.topNavRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 3 of 13</Text>
          </View>
        </View>

        <View style={styles.curvedArchMask} />
      </View>

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
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
                style={[styles.genderCard, isSel && styles.genderCardSelected]}
                onPress={() => setGender(g)}
                activeOpacity={0.88}
              >
                <View style={[styles.genderIconBadge, isSel && styles.genderIconBadgeSelected]}>
                  <MaterialCommunityIcons
                    name={g === 'Male' ? 'gender-male' : 'gender-female'}
                    size={28}
                    color={isSel ? '#E31E25' : '#8C7A7C'}
                  />
                </View>
                <Text style={[styles.genderLabelText, isSel && styles.genderLabelTextSelected]}>{g}</Text>
                {isSel && (
                  <View style={styles.genderCheckMark}>
                    <Ionicons name="checkmark-circle" size={18} color="#E31E25" />
                  </View>
                )}
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Height Dropdown Trigger */}
        <Text style={styles.sectionHeaderLabel}>Height</Text>
        <TouchableOpacity
          style={styles.dropdownTrigger}
          onPress={() => setShowHeightModal(true)}
          activeOpacity={0.88}
        >
          <View style={styles.dropdownTriggerLeft}>
            <MaterialCommunityIcons name="ruler" size={22} color="#E31E25" style={{ marginRight: 10 }} />
            <Text style={styles.dropdownValueText}>{height}</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#8C7A7C" />
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
                  <Ionicons name={item.icon as any} size={20} color={isSel ? '#E31E25' : '#8C7A7C'} />
                </View>
                <Text style={[styles.optionLabel, isSel && styles.optionLabelSelected]}>{item.label}</Text>
                <View style={[styles.radioOuterCircle, isSel && styles.radioOuterCircleSelected]}>
                  {isSel && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Height Selection Modal */}
      <Modal visible={showHeightModal} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Height</Text>
              <TouchableOpacity onPress={() => setShowHeightModal(false)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
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
                  {height === h && <Ionicons name="checkmark" size={20} color="#E31E25" />}
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
            <View style={[styles.progressBarFill, { width: `${(3 / 13) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>23%</Text>
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

  /* Gender Grid */
  genderGridRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 10,
  },
  genderCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 5,
    elevation: 2,
    position: 'relative',
  },
  genderCardSelected: {
    borderColor: '#E31E25',
    backgroundColor: '#FFF0F1',
  },
  genderIconBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FFF9F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  genderIconBadgeSelected: {
    backgroundColor: '#FFE4E6',
  },
  genderLabelText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2C1A1D',
  },
  genderLabelTextSelected: {
    color: '#E31E25',
    fontWeight: '800',
  },
  genderCheckMark: {
    position: 'absolute',
    top: 10,
    right: 10,
  },

  /* Dropdown Trigger */
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

  /* Marital Grid */
  maritalGrid: {
    gap: 10,
  },
  optionCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
  },
  optionCardRowSelected: {
    borderColor: '#E31E25',
    backgroundColor: '#FFF0F1',
  },
  iconCircleBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF9F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconCircleBadgeSelected: {
    backgroundColor: '#FFE4E6',
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#2C1A1D',
  },
  optionLabelSelected: {
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

  /* Modal */
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
