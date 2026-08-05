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
          <Ionicons name="arrow-back" size={24} color="#200D08" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <PatrikaRibbonLogo size={26} />
          <Text style={styles.headerBrand}>Patrika Matrimony</Text>
        </View>
        <Text style={styles.stepIndicator}>5/13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${(5 / 13) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.step5Title}</Text>
        <Text style={styles.subtitle}>{t.step5Subtitle}</Text>

        {/* Country Dropdown */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.country}</Text>
          <TouchableOpacity
            style={styles.dropdownTrigger}
            onPress={() => setShowCountryModal(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.dropdownValueText}>{country || t.selectCountry}</Text>
            <Ionicons name="chevron-down" size={20} color="#8C7B6B" />
          </TouchableOpacity>
        </View>

        {/* State Dropdown */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.state}</Text>
          <TouchableOpacity
            style={styles.dropdownTrigger}
            onPress={() => setShowStateModal(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.dropdownValueText}>{residentState || t.selectState}</Text>
            <Ionicons name="chevron-down" size={20} color="#8C7B6B" />
          </TouchableOpacity>
        </View>

        {/* City Input & Dropdown */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.city}</Text>
          <TouchableOpacity
            style={styles.dropdownTrigger}
            onPress={() => setShowCityModal(true)}
            activeOpacity={0.8}
          >
            <Text style={styles.dropdownValueText}>{residentCity || t.selectCity}</Text>
            <Ionicons name="chevron-down" size={20} color="#8C7B6B" />
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
                  activeOpacity={0.8}
                >
                  <Text style={[styles.smallChipText, isSel && styles.smallChipTextSelected]}>{c}</Text>
                </TouchableOpacity>
              );
            })}
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
                <Ionicons name="close" size={24} color="#200D08" />
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
                  {country === c && <Ionicons name="checkmark" size={20} color="#6B0000" />}
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
                <Ionicons name="close" size={24} color="#200D08" />
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
                  {residentState === s && <Ionicons name="checkmark" size={20} color="#6B0000" />}
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
                <Ionicons name="close" size={24} color="#200D08" />
              </TouchableOpacity>
            </View>

            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={18} color="#8C7B6B" style={{ marginRight: 8 }} />
              <TextInput
                style={styles.searchInput}
                placeholder="Type or search city..."
                value={citySearch}
                onChangeText={setCitySearch}
                placeholderTextColor="#8C7B6B"
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
                    {residentCity === c && <Ionicons name="checkmark" size={20} color="#6B0000" />}
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
                  <Text style={{ color: '#6B0000', fontWeight: '700' }}>Use "{citySearch}"</Text>
                </TouchableOpacity>
              )}
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
  popularTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#665544',
    marginTop: 14,
    marginBottom: 10,
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  smallChip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 16,
    backgroundColor: '#F5EFE6',
    borderWidth: 1,
    borderColor: '#E2D7C7',
  },
  smallChipSelected: {
    backgroundColor: '#FFF5F6',
    borderColor: '#6B0000',
  },
  smallChipText: {
    fontSize: 13,
    color: '#200D08',
    fontWeight: '500',
  },
  smallChipTextSelected: {
    color: '#6B0000',
    fontWeight: '700',
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
