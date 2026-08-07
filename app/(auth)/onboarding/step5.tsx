import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Modal 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import AnimatedGlassBackground from '../../../src/components/AnimatedGlassBackground';

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
    <AnimatedGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 5 of 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.glassCardContainer}>
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="map-marker-radius-outline" size={32} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step5Title}</Text>
              <Text style={styles.questionSubtitle}>{t.step5Subtitle}</Text>
            </View>

            {/* Country Trigger */}
            <Text style={styles.sectionHeaderLabel}>Country</Text>
            <TouchableOpacity
              style={styles.dropdownGlassTrigger}
              onPress={() => setShowCountryModal(true)}
              activeOpacity={0.88}
            >
              <View style={styles.dropdownTriggerLeft}>
                <MaterialCommunityIcons name="earth" size={22} color="#FF4D6D" style={{ marginRight: 10 }} />
                <Text style={styles.dropdownValueText}>{country}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#BDA6B2" />
            </TouchableOpacity>

            {/* State Trigger */}
            <Text style={styles.sectionHeaderLabel}>Resident State</Text>
            <TouchableOpacity
              style={styles.dropdownGlassTrigger}
              onPress={() => setShowStateModal(true)}
              activeOpacity={0.88}
            >
              <View style={styles.dropdownTriggerLeft}>
                <MaterialCommunityIcons name="map-marker-outline" size={22} color="#FF4D6D" style={{ marginRight: 10 }} />
                <Text style={styles.dropdownValueText}>{residentState}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#BDA6B2" />
            </TouchableOpacity>

            {/* City Input & Quick Chips */}
            <Text style={styles.sectionHeaderLabel}>Resident City</Text>
            <View style={styles.glassInputWrapper}>
              <Ionicons name="location-outline" size={20} color="#FF85A1" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputField}
                placeholder="Enter city name"
                value={residentCity}
                onChangeText={setResidentCity}
                placeholderTextColor="#8C7383"
              />
            </View>

            <Text style={styles.popularCityLabel}>Popular Rajasthan Cities</Text>
            <View style={styles.cityChipsRow}>
              {popularRajasthanCities.map((city) => {
                const isSel = residentCity === city;
                return (
                  <TouchableOpacity
                    key={city}
                    style={[styles.cityGlassChip, isSel && styles.cityGlassChipSelected]}
                    onPress={() => setResidentCity(city)}
                    activeOpacity={0.85}
                  >
                    <Text style={[styles.cityChipText, isSel && styles.cityChipTextSelected]}>{city}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Country Modal */}
        <Modal visible={showCountryModal} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalGlassCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Country</Text>
                <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                  <Ionicons name="close" size={24} color="#FFFFFF" />
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
                    {country === c && <Ionicons name="checkmark" size={20} color="#FF4D6D" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

        {/* State Modal */}
        <Modal visible={showStateModal} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalGlassCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Resident State</Text>
                <TouchableOpacity onPress={() => setShowStateModal(false)}>
                  <Ionicons name="close" size={24} color="#FFFFFF" />
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
                    {residentState === s && <Ionicons name="checkmark" size={20} color="#FF4D6D" />}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </View>
        </Modal>

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
    </AnimatedGlassBackground>
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
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepPillBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  stepPillText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },

  contentScroll: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  glassCardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: 28,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 6,
  },
  badgeWrapper: {
    alignItems: 'center',
    marginBottom: 12,
  },
  glowingVectorCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#E31E25',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.6,
    shadowRadius: 14,
    elevation: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  headerTitleBox: {
    alignItems: 'center',
    marginBottom: 14,
  },
  questionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 4,
  },
  questionSubtitle: {
    fontSize: 13,
    color: '#BDA6B2',
    textAlign: 'center',
    lineHeight: 18,
  },
  sectionHeaderLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 14,
    marginBottom: 8,
  },

  dropdownGlassTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.14)',
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
    color: '#FFFFFF',
  },

  glassInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 18,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  inputField: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#FFFFFF',
  },

  popularCityLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#BDA6B2',
    marginBottom: 8,
  },
  cityChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 10,
  },
  cityGlassChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.14)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  cityGlassChipSelected: {
    backgroundColor: 'rgba(227, 30, 37, 0.25)',
    borderColor: '#E31E25',
  },
  cityChipText: {
    fontSize: 13,
    color: '#BDA6B2',
    fontWeight: '600',
  },
  cityChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalGlassCard: {
    backgroundColor: '#1E0D19',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.16)',
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
    color: '#FFFFFF',
    fontFamily: 'serif',
  },
  modalOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#BDA6B2',
  },
  modalOptionTextSelected: {
    color: '#FF4D6D',
    fontWeight: '800',
  },

  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(18, 7, 14, 0.85)',
    borderTopWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
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
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
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
    color: '#FF4D6D',
  },
  continueBtn: {
    backgroundColor: '#E31E25',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  continueBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
