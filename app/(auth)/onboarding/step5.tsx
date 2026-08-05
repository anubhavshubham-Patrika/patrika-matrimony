import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import PatrikaRibbonLogo from '../../../src/components/PatrikaRibbonLogo';

export default function Step5() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const countriesList = [
    'India', 'USA', 'UK', 'Canada', 'UAE', 'Australia', 'Singapore', 'Germany', 'Saudi Arabia', 'Kuwait', 'Qatar', 'New Zealand', 'Other'
  ];

  const statesList = [
    'Rajasthan', 'Maharashtra', 'Delhi NCR', 'Punjab', 'Gujarat', 'Uttar Pradesh', 'Madhya Pradesh',
    'Haryana', 'Karnataka', 'Telangana', 'Tamil Nadu', 'West Bengal', 'Bihar', 'Kerala', 'Assam',
    'Odisha', 'Himachal Pradesh', 'Uttarakhand', 'Goa', 'Jammu & Kashmir', 'Other'
  ];

  const popularCities = [
    'Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Sikar', 'Delhi', 'Mumbai', 'Bengaluru', 'Pune', 'Ahmedabad'
  ];

  const [country, setCountry] = useState(state.onboardingData?.country || 'India');
  const [residentState, setResidentState] = useState(state.onboardingData?.residentState || 'Rajasthan');
  const [residentCity, setResidentCity] = useState(state.onboardingData?.residentCity || 'Jaipur');

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);
  const [showCityModal, setShowCityModal] = useState(false);
  const [citySearch, setCitySearch] = useState('');

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: { country, residentState, residentCity },
    });
    router.push('/(auth)/onboarding/step6');
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
        <Text style={styles.stepIndicator}>Step 5 of 13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${(5 / 13) * 100}%` }]} />
        </View>
        <Text style={styles.progressPercentText}>38% Complete</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <View style={styles.cardHeaderBanner}>
            <Text style={styles.cardHeaderTitle}>{t.step5Title}</Text>
            <Text style={styles.cardHeaderSubtitle}>{t.step5Subtitle}</Text>
          </View>

          <View style={styles.cardBody}>
            {/* Green Live Activity Callout Pill */}
            <View style={styles.liveCalloutPill}>
              <Ionicons name="trending-up" size={16} color="#1E8449" style={{ marginRight: 6 }} />
              <Text style={styles.liveCalloutText}>127 verified profiles joined in the last 3 days!</Text>
            </View>

            {/* Country Dropdown */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.country}</Text>
              <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() => setShowCountryModal(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.dropdownValueText}>{country || t.selectCountry}</Text>
                <Ionicons name="chevron-down" size={20} color="#8C7A7C" />
              </TouchableOpacity>
            </View>

            {/* State Dropdown */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.state}</Text>
              <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() => setShowStateModal(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.dropdownValueText}>{residentState || t.selectState}</Text>
                <Ionicons name="chevron-down" size={20} color="#8C7A7C" />
              </TouchableOpacity>
            </View>

            {/* City Input & Dropdown */}
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>{t.city}</Text>
              <TouchableOpacity
                style={styles.dropdownTrigger}
                onPress={() => setShowCityModal(true)}
                activeOpacity={0.85}
              >
                <Text style={styles.dropdownValueText}>{residentCity || t.selectCity}</Text>
                <Ionicons name="chevron-down" size={20} color="#8C7A7C" />
              </TouchableOpacity>

              {/* Popular Cities Suggestion Chips */}
              <Text style={styles.popularTitle}>{t.popularCities}:</Text>
              <View style={styles.chipGrid}>
                {popularCities.map((c) => {
                  const isSel = residentCity === c;
                  return (
                    <TouchableOpacity
                      key={c}
                      style={[styles.smallChip, isSel && styles.smallChipSelected]}
                      onPress={() => setResidentCity(c)}
                      activeOpacity={0.85}
                    >
                      <Text style={[styles.smallChipText, isSel && styles.smallChipTextSelected]}>{c}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Country Modal */}
      <Modal visible={showCountryModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 300 }}>
              {countriesList.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={[styles.modalOptionItem, country === c && styles.modalOptionSelected]}
                  onPress={() => {
                    setCountry(c);
                    setShowCountryModal(false);
                  }}
                >
                  <Text style={[styles.modalOptionText, country === c && styles.modalOptionTextSelected]}>{c}</Text>
                  {country === c && <Ionicons name="checkmark" size={20} color="#E91E63" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* State Modal */}
      <Modal visible={showStateModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select State</Text>
              <TouchableOpacity onPress={() => setShowStateModal(false)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 320 }}>
              {statesList.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.modalOptionItem, residentState === s && styles.modalOptionSelected]}
                  onPress={() => {
                    setResidentState(s);
                    setShowStateModal(false);
                  }}
                >
                  <Text style={[styles.modalOptionText, residentState === s && styles.modalOptionTextSelected]}>{s}</Text>
                  {residentState === s && <Ionicons name="checkmark" size={20} color="#E91E63" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* City Modal */}
      <Modal visible={showCityModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select City</Text>
              <TouchableOpacity onPress={() => setShowCityModal(false)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={18} color="#8C7A7C" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Type or search city..."
                value={citySearch}
                onChangeText={setCitySearch}
                placeholderTextColor="#8C7A7C"
              />
            </View>

            <ScrollView style={{ maxHeight: 320 }}>
              {popularCities
                .filter((c) => c.toLowerCase().includes(citySearch.toLowerCase()))
                .map((c) => (
                  <TouchableOpacity
                    key={c}
                    style={[styles.modalOptionItem, residentCity === c && styles.modalOptionSelected]}
                    onPress={() => {
                      setResidentCity(c);
                      setShowCityModal(false);
                    }}
                  >
                    <Text style={[styles.modalOptionText, residentCity === c && styles.modalOptionTextSelected]}>{c}</Text>
                    {residentCity === c && <Ionicons name="checkmark" size={20} color="#E91E63" />}
                  </TouchableOpacity>
                ))}
              {citySearch.length > 0 && (
                <TouchableOpacity
                  style={styles.modalOptionItem}
                  onPress={() => {
                    setResidentCity(citySearch);
                    setShowCityModal(false);
                  }}
                >
                  <Text style={{ color: '#E91E63', fontWeight: '800' }}>Use "{citySearch}"</Text>
                </TouchableOpacity>
              )}
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
  popularTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5A4A4D',
    marginTop: 12,
    marginBottom: 8,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  smallChip: {
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#FAF5F7',
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  smallChipSelected: {
    backgroundColor: '#FFF0F3',
    borderColor: '#E91E63',
  },
  smallChipText: {
    fontSize: 12,
    color: '#2C1A1D',
    fontWeight: '500',
  },
  smallChipTextSelected: {
    color: '#E91E63',
    fontWeight: '800',
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
