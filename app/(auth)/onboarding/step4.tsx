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
          <Ionicons name="arrow-back" size={24} color="#200D08" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <PatrikaRibbonLogo size={26} />
          <Text style={styles.headerBrand}>Patrika Matrimony</Text>
        </View>
        <Text style={styles.stepIndicator}>4/13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${(4 / 13) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.step4Title}</Text>
        <Text style={styles.subtitle}>{t.step4Subtitle}</Text>

        {/* Religion Selection Dropdown Trigger */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.religion}</Text>
          <TouchableOpacity
            style={styles.dropdownTrigger}
            onPress={() => setShowReligionModal(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.dropdownValueText}>{religion || t.selectReligion}</Text>
            <Ionicons name="chevron-down" size={20} color="#8C7B6B" />
          </TouchableOpacity>
        </View>

        {/* Caste Selection Dropdown Trigger */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.caste}</Text>
          <TouchableOpacity
            style={styles.dropdownTrigger}
            onPress={() => setShowCasteModal(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.dropdownValueText}>{caste || t.selectCaste}</Text>
            <Ionicons name="chevron-down" size={20} color="#8C7B6B" />
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
            placeholderTextColor="#8C7B6B"
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
              placeholderTextColor="#8C7B6B"
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

      {/* Religion Selection Modal */}
      <Modal visible={showReligionModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Religion</Text>
              <TouchableOpacity onPress={() => setShowReligionModal(false)}>
                <Ionicons name="close" size={24} color="#200D08" />
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
                  {religion === r && <Ionicons name="checkmark" size={20} color="#6B0000" />}
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
                <Ionicons name="close" size={24} color="#200D08" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={18} color="#8C7B6B" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search caste..."
                value={casteSearch}
                onChangeText={setCasteSearch}
                placeholderTextColor="#8C7B6B"
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
                  {caste === c && <Ionicons name="checkmark" size={20} color="#6B0000" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
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
    backgroundColor: '#FAF6F0',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FFFDF9',
    borderBottomWidth: 1,
    borderBottomColor: '#E2D7C7',
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
    color: '#6B0000',
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '700',
    color: '#8C7B6B',
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#E8DFD3',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6B0000',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#200D08',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#665544',
    marginTop: 6,
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 22,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#200D08',
    marginBottom: 10,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: '#E2D7C7',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  dropdownValueText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#200D08',
  },
  input: {
    backgroundColor: '#FFFDF9',
    borderWidth: 1,
    borderColor: '#E2D7C7',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#200D08',
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
    borderColor: '#E2D7C7',
    backgroundColor: '#FFFDF9',
  },
  radioCardSelected: {
    borderColor: '#6B0000',
    backgroundColor: '#FFF5F6',
  },
  radioCardText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#200D08',
  },
  radioCardTextSelected: {
    color: '#6B0000',
    fontWeight: '700',
  },
  radioDotOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#E2D7C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioDotOuterSelected: {
    borderColor: '#6B0000',
  },
  radioDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#6B0000',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(32,13,8,0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFDF9',
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
    color: '#200D08',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F4EEE5',
    borderWidth: 1,
    borderColor: '#E2D7C7',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 14,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#200D08',
  },
  modalOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#E8DFD3',
  },
  modalOptionSelected: {
    backgroundColor: '#FFF5F6',
  },
  modalOptionText: {
    fontSize: 15,
    color: '#200D08',
  },
  modalOptionTextSelected: {
    color: '#6B0000',
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFDF9',
    borderTopWidth: 1,
    borderColor: '#E2D7C7',
  },
  nextBtn: {
    backgroundColor: '#6B0000',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#6B0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextBtnText: {
    color: '#FFFDF9',
    fontSize: 17,
    fontWeight: '700',
  },
});
