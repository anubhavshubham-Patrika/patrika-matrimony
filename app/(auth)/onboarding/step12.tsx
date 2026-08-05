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

  const defaultPhoto = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80';
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
          <Ionicons name="arrow-back" size={24} color="#2C1A1D" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <PatrikaRibbonLogo size={28} />
          <Text style={styles.headerBrand}>Patrika Matrimony</Text>
        </View>
        <Text style={styles.stepIndicator}>Step 12 of 13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${(12 / 13) * 100}%` }]} />
        </View>
        <Text style={styles.progressPercentText}>92% Complete</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.formCard}>
          <View style={styles.cardHeaderBanner}>
            <Text style={styles.cardHeaderTitle}>{t.step12Title}</Text>
            <Text style={styles.cardHeaderSubtitle}>Upload photos & complete selfie verification</Text>
          </View>

          <View style={styles.cardBody}>
            {/* Green Live Activity Callout Pill */}
            <View style={styles.liveCalloutPill}>
              <Ionicons name="trending-up" size={16} color="#1E8449" style={{ marginRight: 6 }} />
              <Text style={styles.liveCalloutText}>127 verified profiles joined in the last 3 days!</Text>
            </View>

            {/* Profile Photo Display */}
            <View style={styles.photoContainer}>
              <Image source={{ uri: profilePhoto }} style={styles.profileImage} />
              <TouchableOpacity
                style={styles.changePhotoBtn}
                onPress={() => setProfilePhoto('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80')}
              >
                <Ionicons name="camera-outline" size={20} color="#FFFFFF" />
                <Text style={styles.changePhotoText}>Change Photo</Text>
              </TouchableOpacity>
            </View>

            {/* Selfie Verification Badge */}
            <View style={styles.verificationCard}>
              <View style={styles.verifHeaderRow}>
                <Ionicons name="shield-checkmark-outline" size={22} color="#E91E63" />
                <Text style={styles.verifTitle}>Selfie Verification</Text>
              </View>
              <Text style={styles.verifDesc}>Verified profiles receive 5x more interest responses from serious family members.</Text>
              <TouchableOpacity
                style={[styles.selfieBtn, isSelfieVerified && styles.selfieBtnVerified]}
                onPress={() => setIsSelfieVerified(!isSelfieVerified)}
              >
                <Ionicons name={isSelfieVerified ? 'checkmark-circle' : 'camera'} size={20} color={isSelfieVerified ? '#27AE60' : '#E91E63'} />
                <Text style={[styles.selfieBtnText, isSelfieVerified && { color: '#27AE60' }]}>
                  {isSelfieVerified ? 'Selfie Verified ✓' : 'Take Verification Selfie'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

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
  photoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#E91E63',
    marginBottom: 12,
  },
  changePhotoBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E91E63',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    gap: 6,
  },
  changePhotoText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
  verificationCard: {
    width: '100%',
    backgroundColor: '#FAF5F7',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFE6DD',
    padding: 16,
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
    color: '#2C1A1D',
    fontFamily: 'serif',
  },
  verifDesc: {
    fontSize: 13,
    color: '#5A4A4D',
    lineHeight: 18,
    marginBottom: 14,
  },
  selfieBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF0F3',
    borderWidth: 1,
    borderColor: '#E91E63',
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  selfieBtnVerified: {
    backgroundColor: '#E8F5E9',
    borderColor: '#27AE60',
  },
  selfieBtnText: {
    color: '#E91E63',
    fontSize: 14,
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
