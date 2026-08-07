import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, TextInput, Modal 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';

export default function Step4() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [religion, setReligion] = useState(state.onboardingData?.religion || 'Hindu');
  const [caste, setCaste] = useState(state.onboardingData?.caste || 'Rajput');
  const [subCaste, setSubCaste] = useState(state.onboardingData?.subCaste || '');
  const [gotra, setGotra] = useState(state.onboardingData?.gotra || '');
  const [manglikStatus, setManglikStatus] = useState(state.onboardingData?.manglikStatus || 'Non-Manglik');

  const [showReligionModal, setShowReligionModal] = useState(false);
  const [showCasteModal, setShowCasteModal] = useState(false);

  const religions = ['Hindu', 'Muslim', 'Sikh', 'Jain', 'Christian', 'Parsi', 'Buddhist', 'Other'];
  const popularCastes = ['Rajput', 'Agarwal', 'Brahmin', 'Marwari', 'Jain', 'Sindhi', 'Jat', 'Gupta', 'Maheshwari', 'Other'];
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
    <SafeAreaView style={styles.container}>
      {/* Hero Banner */}
      <View style={styles.heroBannerContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop' }}
          style={styles.heroBannerImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />

        <View style={styles.topNavRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 4 of 13</Text>
          </View>
        </View>

        <View style={styles.curvedArchMask} />
      </View>

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerTitleBox}>
          <Text style={styles.questionTitle}>{t.step4Title}</Text>
          <Text style={styles.questionSubtitle}>{t.step4Subtitle}</Text>
        </View>

        {/* Religion Selection Trigger */}
        <Text style={styles.sectionHeaderLabel}>Religion</Text>
        <TouchableOpacity
          style={styles.dropdownTrigger}
          onPress={() => setShowReligionModal(true)}
          activeOpacity={0.88}
        >
          <View style={styles.dropdownTriggerLeft}>
            <MaterialCommunityIcons name="flower" size={22} color="#E31E25" style={{ marginRight: 10 }} />
            <Text style={styles.dropdownValueText}>{religion}</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#8C7A7C" />
        </TouchableOpacity>

        {/* Caste Selection Trigger */}
        <Text style={styles.sectionHeaderLabel}>Caste / Community</Text>
        <TouchableOpacity
          style={styles.dropdownTrigger}
          onPress={() => setShowCasteModal(true)}
          activeOpacity={0.88}
        >
          <View style={styles.dropdownTriggerLeft}>
            <MaterialCommunityIcons name="account-group" size={22} color="#E31E25" style={{ marginRight: 10 }} />
            <Text style={styles.dropdownValueText}>{caste}</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#8C7A7C" />
        </TouchableOpacity>

        {/* Gotra / Sub-caste Text Field */}
        <Text style={styles.sectionHeaderLabel}>Gotra (Optional)</Text>
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="star-outline" size={20} color="#8C7A7C" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.inputField}
            placeholder="Enter your Gotra (e.g. Kashyap, Vashistha)"
            value={gotra}
            onChangeText={setGotra}
            placeholderTextColor="#8C7A7C"
          />
        </View>

        {/* Manglik Status Options */}
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

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Religion Modal */}
      <Modal visible={showReligionModal} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Religion</Text>
              <TouchableOpacity onPress={() => setShowReligionModal(false)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
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
                  {religion === r && <Ionicons name="checkmark" size={20} color="#E31E25" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Caste Modal */}
      <Modal visible={showCasteModal} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Caste / Community</Text>
              <TouchableOpacity onPress={() => setShowCasteModal(false)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
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
                  {caste === c && <Ionicons name="checkmark" size={20} color="#E31E25" />}
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
            <View style={[styles.progressBarFill, { width: `${(4 / 13) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>31%</Text>
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

  manglikGrid: {
    gap: 10,
  },
  manglikCard: {
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
  manglikCardSelected: {
    borderColor: '#E31E25',
    backgroundColor: '#FFF0F1',
  },
  manglikLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C1A1D',
  },
  manglikLabelSelected: {
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
