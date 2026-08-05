import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import PatrikaRibbonLogo from '../../../src/components/PatrikaRibbonLogo';

export default function Step12() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const defaultPhoto = 'https://randomuser.me/api/portraits/men/1.jpg';
  const [profilePhoto, setProfilePhoto] = useState(state.onboardingData?.profilePhotoURL || defaultPhoto);
  const [isSelfieVerified, setIsSelfieVerified] = useState(false);

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: { profilePhotoURL: profilePhoto },
    });
    router.push('/(auth)/onboarding/step13');
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
        <Text style={styles.stepIndicator}>12/13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: `${(12 / 13) * 100}%` }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.step12Title}</Text>
        <Text style={styles.subtitle}>Upload photos & complete selfie verification</Text>

        {/* Profile Photo Display */}
        <View style={styles.photoContainer}>
          <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
          <TouchableOpacity style={styles.changePhotoBtn} onPress={() => setProfilePhoto('https://randomuser.me/api/portraits/men/15.jpg')}>
            <Ionicons name="camera-outline" size={20} color="#FFFDF9" />
            <Text style={styles.changePhotoText}>Change Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Selfie Verification Badge */}
        <View style={styles.verificationCard}>
          <View style={styles.verifHeaderRow}>
            <Ionicons name="shield-checkmark-outline" size={22} color="#6B0000" />
            <Text style={styles.verifTitle}>Selfie Verification</Text>
          </View>
          <Text style={styles.verifDesc}>Verified profiles receive 5x more interest responses from family members.</Text>
          <TouchableOpacity
            style={[styles.selfieBtn, isSelfieVerified && styles.selfieBtnVerified]}
            onPress={() => setIsSelfieVerified(!isSelfieVerified)}
          >
            <Ionicons name={isSelfieVerified ? 'checkmark-circle' : 'camera'} size={20} color={isSelfieVerified ? '#27AE60' : '#6B0000'} />
            <Text style={[styles.selfieBtnText, isSelfieVerified && { color: '#27AE60' }]}>
              {isSelfieVerified ? 'Selfie Verified ✓' : 'Take Verification Selfie'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

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
    alignItems: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#200D08',
    letterSpacing: -0.5,
    alignSelf: 'flex-start',
  },
  subtitle: {
    fontSize: 14,
    color: '#665544',
    marginTop: 6,
    marginBottom: 24,
    alignSelf: 'flex-start',
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  profileImage: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: '#786C10',
    marginBottom: 14,
  },
  changePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6B0000',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  changePhotoText: {
    color: '#FFFDF9',
    fontSize: 14,
    fontWeight: '700',
  },
  verificationCard: {
    width: '100%',
    backgroundColor: '#FFFDF9',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2D7C7',
    padding: 20,
  },
  verifHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  verifTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#200D08',
  },
  verifDesc: {
    fontSize: 13,
    color: '#665544',
    lineHeight: 18,
    marginBottom: 16,
  },
  selfieBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F6',
    borderWidth: 1,
    borderColor: '#6B0000',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  selfieBtnVerified: {
    backgroundColor: '#E8F5E9',
    borderColor: '#27AE60',
  },
  selfieBtnText: {
    color: '#6B0000',
    fontSize: 14,
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFDF9',
    borderTopWidth: 1,
    borderColor: '#E2D7C7',
    width: '100%',
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
