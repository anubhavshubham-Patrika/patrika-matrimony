import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, TextInput, Modal 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';

export default function Step5() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [country, setCountry] = useState(state.onboardingData?.country || 'India');
  const [residentState, setResidentState] = useState(state.onboardingData?.residentState || 'Rajasthan');
  const [residentCity, setResidentCity] = useState(state.onboardingData?.residentCity || 'Jaipur');

  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showStateModal, setShowStateModal] = useState(false);

  const countries = ['India', 'United States', 'United Kingdom', 'Canada', 'UAE', 'Australia', 'Other'];
  const indianStates = ['Rajasthan', 'Delhi', 'Maharashtra', 'Karnataka', 'Gujarat', 'Punjab', 'Uttar Pradesh', 'Madhya Pradesh', 'Other'];
  const popularRajasthanCities = ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Sikar', 'Bhilwara'];

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        country,
        residentState,
        residentCity,
      },
    });
    router.push('/(auth)/onboarding/step6');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hero Banner */}
      <View style={styles.heroBannerContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=800&auto=format&fit=crop' }}
          style={styles.heroBannerImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />

        <View style={styles.topNavRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 5 of 13</Text>
          </View>
        </View>

        <View style={styles.curvedArchMask} />
      </View>

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerTitleBox}>
          <Text style={styles.questionTitle}>{t.step5Title}</Text>
          <Text style={styles.questionSubtitle}>{t.step5Subtitle}</Text>
        </View>

        {/* Country Trigger */}
        <Text style={styles.sectionHeaderLabel}>Country</Text>
        <TouchableOpacity
          style={styles.dropdownTrigger}
          onPress={() => setShowCountryModal(true)}
          activeOpacity={0.88}
        >
          <View style={styles.dropdownTriggerLeft}>
            <MaterialCommunityIcons name="earth" size={22} color="#E31E25" style={{ marginRight: 10 }} />
            <Text style={styles.dropdownValueText}>{country}</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#8C7A7C" />
        </TouchableOpacity>

        {/* State Trigger */}
        <Text style={styles.sectionHeaderLabel}>Resident State</Text>
        <TouchableOpacity
          style={styles.dropdownTrigger}
          onPress={() => setShowStateModal(true)}
          activeOpacity={0.88}
        >
          <View style={styles.dropdownTriggerLeft}>
            <MaterialCommunityIcons name="map-marker-radius-outline" size={22} color="#E31E25" style={{ marginRight: 10 }} />
            <Text style={styles.dropdownValueText}>{residentState}</Text>
          </View>
          <Ionicons name="chevron-down" size={20} color="#8C7A7C" />
        </TouchableOpacity>

        {/* City Input & Quick Chips */}
        <Text style={styles.sectionHeaderLabel}>Resident City</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="location-outline" size={20} color="#8C7A7C" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.inputField}
            placeholder="Enter city name"
            value={residentCity}
            onChangeText={setResidentCity}
            placeholderTextColor="#8C7A7C"
          />
        </View>

        <Text style={styles.popularCityLabel}>Popular Rajasthan Cities</Text>
        <View style={styles.cityChipsRow}>
          {popularRajasthanCities.map((city) => {
            const isSel = residentCity === city;
            return (
              <TouchableOpacity
                key={city}
                style={[styles.cityChip, isSel && styles.cityChipSelected]}
                onPress={() => setResidentCity(city)}
                activeOpacity={0.85}
              >
                <Text style={[styles.cityChipText, isSel && styles.cityChipTextSelected]}>{city}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Country Modal */}
      <Modal visible={showCountryModal} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Country</Text>
              <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 320 }}>
              {countries.map((c) => (
                <TouchableOpacity
                  key={c}
                  style={styles.modalOptionItem}
                  onPress={() => { setCountry(c); setShowCountryModal(false); }}
                >
                  <Text style={[styles.modalOptionText, country === c && styles.modalOptionTextSelected]}>{c}</Text>
                  {country === c && <Ionicons name="checkmark" size={20} color="#E31E25" />}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* State Modal */}
      <Modal visible={showStateModal} animationType="slide" transparent>
        <View style={styles.modalBackdrop}>
          <View style={styles.modalCard}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Resident State</Text>
              <TouchableOpacity onPress={() => setShowStateModal(false)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
              </TouchableOpacity>
            </View>
            <ScrollView style={{ maxHeight: 320 }}>
              {indianStates.map((s) => (
                <TouchableOpacity
                  key={s}
                  style={styles.modalOptionItem}
                  onPress={() => { setResidentState(s); setShowStateModal(false); }}
                >
                  <Text style={[styles.modalOptionText, residentState === s && styles.modalOptionTextSelected]}>{s}</Text>
                  {residentState === s && <Ionicons name="checkmark" size={20} color="#E31E25" />}
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
            <View style={[styles.progressBarFill, { width: `${(5 / 13) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>38%</Text>
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
    marginBottom: 12,
  },
  inputField: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#2C1A1D',
  },

  popularCityLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#8C7A7C',
    marginBottom: 8,
  },
  cityChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  cityChip: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  cityChipSelected: {
    backgroundColor: '#FFF0F1',
    borderColor: '#E31E25',
  },
  cityChipText: {
    fontSize: 13,
    color: '#5A4A4D',
    fontWeight: '600',
  },
  cityChipTextSelected: {
    color: '#E31E25',
    fontWeight: '800',
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
