import React, { useState } from 'react';
import PremiumButton from '../../../src/components/ui/PremiumButton';
import PremiumCard from '../../../src/components/ui/PremiumCard';
import { Typography } from '../../../src/constants/theme';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput, Modal 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import MintGlassBackground from '../../../src/components/MintGlassBackground';

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

  const countries = ['India', 'USA', 'UK', 'Canada', 'UAE', 'Australia', 'Singapore', 'Other'];
  const states = ['Rajasthan', 'Delhi', 'Maharashtra', 'Karnataka', 'Gujarat', 'Punjab', 'Uttar Pradesh', 'Other'];
  const rajasthanCities = ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Sikar', 'Bharatpur'];

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
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#183B82" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>05 / 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <PremiumCard variant="glass" style={styles.glassCardContainer}>
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="map-marker-radius-outline" size={30} color="#FFFFFF" />
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
                <MaterialCommunityIcons name="earth" size={22} color="#4169D8" style={{ marginRight: 10 }} />
                <Text style={styles.dropdownValueText}>{country}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#8C9E9B" />
            </TouchableOpacity>

            {/* Resident State Trigger */}
            <Text style={styles.sectionHeaderLabel}>Resident State</Text>
            <TouchableOpacity
              style={styles.dropdownGlassTrigger}
              onPress={() => setShowStateModal(true)}
              activeOpacity={0.88}
            >
              <View style={styles.dropdownTriggerLeft}>
                <MaterialCommunityIcons name="map-outline" size={22} color="#4169D8" style={{ marginRight: 10 }} />
                <Text style={styles.dropdownValueText}>{residentState}</Text>
              </View>
              <Ionicons name="chevron-down" size={20} color="#8C9E9B" />
            </TouchableOpacity>

            {/* Resident City Input */}
            <Text style={styles.sectionHeaderLabel}>Resident City</Text>
            <View style={styles.glassInputWrapper}>
              <Ionicons name="location-outline" size={20} color="#4169D8" style={{ marginRight: 10 }} />
              <TextInput
                style={styles.inputField}
                placeholder="Enter city (e.g. Jaipur, Jodhpur)"
                value={residentCity}
                onChangeText={setResidentCity}
                placeholderTextColor="#8C9E9B"
              />
            </View>

            {/* Popular Rajasthan City Chips */}
            <Text style={styles.quickChipsTitle}>Popular Rajasthan Cities</Text>
            <View style={styles.chipsWrapRow}>
              {rajasthanCities.map((city) => (
                <TouchableOpacity
                  key={city}
                  style={[styles.cityChip, residentCity === city && styles.cityChipSelected]}
                  onPress={() => setResidentCity(city)}
                >
                  <Text style={[styles.cityChipText, residentCity === city && styles.cityChipTextSelected]}>{city}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </PremiumCard>
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* Country Modal */}
        <Modal visible={showCountryModal} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalGlassCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select Country</Text>
                <TouchableOpacity onPress={() => setShowCountryModal(false)}>
                  <Ionicons name="close" size={24} color="#183B82" />
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
                    {country === c && <Ionicons name="checkmark" size={20} color="#4169D8" />}
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
                  <Ionicons name="close" size={24} color="#183B82" />
                </TouchableOpacity>
              </View>
              <ScrollView style={{ maxHeight: 320 }}>
                {states.map((s) => (
                  <TouchableOpacity
                    key={s}
                    style={styles.modalOptionItem}
                    onPress={() => { setResidentState(s); setShowStateModal(false); }}
                  >
                    <Text style={[styles.modalOptionText, residentState === s && styles.modalOptionTextSelected]}>{s}</Text>
                    {residentState === s && <Ionicons name="checkmark" size={20} color="#4169D8" />}
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

  quickChipsTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: '#4169D8',
    marginTop: 12,
    marginBottom: 8,
  },
  chipsWrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  cityChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderWidth: 1,
    borderColor: 'rgba(15, 46, 43, 0.14)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  cityChipSelected: {
    backgroundColor: '#183B82',
    borderColor: '#183B82',
  },
  cityChipText: {
    fontSize: 12,
    color: '#183B82',
    fontWeight: '600',
  },
  cityChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '800',
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
