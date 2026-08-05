import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import PatrikaRibbonLogo from '../../../src/components/PatrikaRibbonLogo';

export default function Step4() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const religionsList = [
    'Hindu', 'Muslim', 'Sikh', 'Jain', 'Christian', 'Buddhist', 'Parsi / Zoroastrian', 'Jewish', 'Bahá\'í', 'Other'
  ];

  const casteMap: Record<string, string[]> = {
    Hindu: [
      'Rajput (Rathore/Chauhan/Sisodia)', 'Agarwal', 'Brahmin (Gaur/Saraswat/Khandelwal)', 'Marwari',
      'Yadav', 'Jat', 'Gujjar', 'Kayastha', 'Maheshwari', 'Khandelwal', 'Saini', 'Kurmi', 'Khatri',
      'Meena', 'Maratha', 'Reddy', 'Nair', 'Lingayat', 'Other'
    ],
    Jain: ['Jain - Digambar', 'Jain - Svetambar', 'Jain - Agarwal', 'Jain - Oswal', 'Jain - Khandelwal', 'Other'],
    Sikh: ['Sikh - Jat', 'Sikh - Ramgarhia', 'Sikh - Khatri', 'Sikh - Arora', 'Sikh - Ahluwalia', 'Other'],
    Muslim: ['Sunni', 'Shia', 'Pathan', 'Syed', 'Sheikh', 'Other'],
    Christian: ['Roman Catholic', 'Protestant', 'Syrian Christian', 'Other'],
  };

  const defaultCastes = [
    'Rajput', 'Agarwal', 'Brahmin', 'Marwari', 'Jain', 'Sindhi', 'Kayastha', 'Yadav', 'Jat', 'Other'
  ];

  const [religion, setReligion] = useState(state.onboardingData?.religion || 'Hindu');
  const [caste, setCaste] = useState(state.onboardingData?.caste || 'Rajput');
  const [subCaste, setSubCaste] = useState(state.onboardingData?.subCaste || '');
  const [gotra, setGotra] = useState(state.onboardingData?.gotra || '');
  const [manglikStatus, setManglikStatus] = useState(state.onboardingData?.manglikStatus || 'Non-Manglik');

  const [showReligionModal, setShowReligionModal] = useState(false);
  const [showCasteModal, setShowCasteModal] = useState(false);
  const [casteSearch, setCasteSearch] = useState('');

  const currentCasteOptions = casteMap[religion] || defaultCastes;
  const filteredCastes = currentCasteOptions.filter((c) =>
    c.toLowerCase().includes(casteSearch.toLowerCase())
  );

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: { religion, caste, subCaste, gotra, manglikStatus },
    });
    router.push('/(auth)/onboarding/step5');
  };

  const isHinduJain = ['Hindu', 'Jain'].includes(religion);

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
        <Text style={styles.stepIndicator}>Step 4 of 13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${(4 / 13) * 100}%` }]} />
        </View>
        <Text style={styles.progressPercentText}>30% Complete</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <View style={styles.cardHeaderBanner}>
            <Text style={styles.cardHeaderTitle}>{t.step4Title}</Text>
            <Text style={styles.cardHeaderSubtitle}>{t.step4Subtitle}</Text>
          </View>

          <View style={styles.cardBody}>
            {/* Green Live Activity Callout Pill */}
            <View style={styles.liveCalloutPill}>
              <Ionicons name="trending-up" size={16} color="#1E8449" style={{ marginRight: 6 }} />
              <Text style={styles.liveCalloutText}>127 verified profiles joined in the last 3 days!</Text>
            </View>

            {/* Religion Selection Dropdown Trigger */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.religion}</Text>
              <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() => setShowReligionModal(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.dropdownValueText}>{religion || t.selectReligion}</Text>
                <Ionicons name="chevron-down" size={20} color="#8C7A7C" />
              </TouchableOpacity>
            </View>

            {/* Caste Selection Dropdown Trigger */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.caste}</Text>
              <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() => setShowCasteModal(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.dropdownValueText}>{caste || t.selectCaste}</Text>
                <Ionicons name="chevron-down" size={20} color="#8C7A7C" />
              </TouchableOpacity>
            </View>

            {/* Sub-Caste Input */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.subCaste} (Optional)</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. Rathore / Shekhawat / Garg"
                value={subCaste}
                onChangeText={setSubCaste}
                placeholderTextColor="#8C7A7C"
              />
            </View>

            {/* Gotra Input */}
            {isHinduJain && (
              <View style={styles.fieldGroup}>
                <Text style={styles.fieldLabel}>{t.gotra} (Optional)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="e.g. Bhardwaj / Kashyap / Vatsa"
                  value={gotra}
                  onChangeText={setGotra}
                  placeholderTextColor="#8C7A7C"
                />
              </View>
            )}

            {/* Manglik Status */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.manglikStatus}</Text>
              <View style={styles.radioGrid}>
                {['Non-Manglik', 'Manglik', 'Partial Manglik', 'Don\'t Know'].map((m) => {
                  const isSel = manglikStatus === m;
                  return (
                    <TouchableOpacity
                      key={m}
                      style={[styles.radioCard, isSel && styles.radioCardSelected]}
                      onPress={() => setManglikStatus(m)}
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

      {/* Religion Selection Modal */}
      <Modal visible={showReligionModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Religion</Text>
              <TouchableOpacity onPress={() => setShowReligionModal(false)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 300 }}>
              {religionsList.map((r) => (
                <TouchableOpacity
                  key={r}
                  style={[styles.modalOptionItem, religion === r && styles.modalOptionSelected]}
                  onPress={() => {
                    setReligion(r);
                    setCaste(casteMap[r]?.[0] || 'Other');
                    setShowReligionModal(false);
                  }}
                >
                  <Text style={[styles.modalOptionText, religion === r && styles.modalOptionTextSelected]}>{r}</Text>
                  {religion === r && <Ionicons name="checkmark" size={20} color="#E91E63" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Caste Selection Modal */}
      <Modal visible={showCasteModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Caste / Community</Text>
              <TouchableOpacity onPress={() => setShowCasteModal(false)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={18} color="#8C7A7C" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search caste..."
                value={casteSearch}
                onChangeText={setCasteSearch}
                placeholderTextColor="#8C7A7C"
              />
            </View>

            <ScrollView style={{ maxHeight: 320 }}>
              {filteredCastes.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.modalOptionItem, caste === c && styles.modalOptionSelected]}
                  onPress={() => {
                    setCaste(c);
                    setShowCasteModal(false);
                  }}
                >
                  <Text style={[styles.modalOptionText, caste === c && styles.modalOptionTextSelected]}>{c}</Text>
                  {caste === c && <Ionicons name="checkmark" size={20} color="#E91E63" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

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
    backgroundColor: '#FFF4F6',
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
  dropdownTrigger: {
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
  dropdownValueText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2C1A1D',
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
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAF5F7',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#2C1A1D',
  },
  modalOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#EFE6DD',
  },
  modalOptionSelected: {
    backgroundColor: '#FFF0F3',
  },
  modalOptionText: {
    fontSize: 15,
    color: '#2C1A1D',
  },
  modalOptionTextSelected: {
    color: '#E91E63',
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
