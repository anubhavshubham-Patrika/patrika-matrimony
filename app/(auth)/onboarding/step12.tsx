import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import MintGlassBackground from '../../../src/components/MintGlassBackground';

export default function Step12() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const defaultPhoto = 'https://randomuser.me/api/portraits/men/32.jpg';
  const [photoUrl, setPhotoUrl] = useState(state.onboardingData?.profilePhotoURL || defaultPhoto);
  const [isSelfieVerified, setIsSelfieVerified] = useState(true);

  const handleUploadGalleryImage = () => {
    Alert.alert(
      '📷 Upload Image',
      'Select a photo from your gallery to set as your main profile image.',
      [
        { text: 'Choose Demo Photo 1', onPress: () => setPhotoUrl('https://randomuser.me/api/portraits/men/45.jpg') },
        { text: 'Choose Demo Photo 2', onPress: () => setPhotoUrl('https://randomuser.me/api/portraits/men/68.jpg') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleVerifySelfie = () => {
    setIsSelfieVerified(true);
    Alert.alert(
      '🤳 Selfie Verification Successful!',
      'Your live selfie has been verified. A green "Govt & Selfie Verified" badge is now added to your profile!',
      [{ text: 'Great!' }]
    );
  };

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        profilePhotoURL: photoUrl,
        isVerified: isSelfieVerified,
      },
    });
    router.push('/(auth)/onboarding/step13');
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#0F2E2B" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 12 of 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.glassCardContainer}>
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="camera-plus-outline" size={30} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step12Title}</Text>
              <Text style={styles.questionSubtitle}>Add your profile photo & verify with selfie</Text>
            </View>

            {/* Photo Avatar Preview Frame */}
            <View style={styles.photoFrameContainer}>
              <Image source={{ uri: photoUrl }} style={styles.avatarImage} />
              <TouchableOpacity style={styles.cameraIconBtn} onPress={handleUploadGalleryImage} activeOpacity={0.88}>
                <Ionicons name="camera" size={20} color="#FFFFFF" />
              </TouchableOpacity>

              {isSelfieVerified && (
                <View style={styles.selfieVerifiedBadge}>
                  <Ionicons name="shield-checkmark" size={14} color="#FFFFFF" style={{ marginRight: 3 }} />
                  <Text style={styles.selfieVerifiedText}>Verified</Text>
                </View>
              )}
            </View>

            {/* Action Option Buttons Container */}
            <View style={styles.actionButtonsContainer}>
              {/* Option 1: Add Image from Gallery */}
              <TouchableOpacity 
                style={styles.actionGlassBtn} 
                onPress={handleUploadGalleryImage}
                activeOpacity={0.88}
              >
                <View style={styles.actionBtnIconBadge}>
                  <MaterialCommunityIcons name="image-plus" size={20} color="#0D9488" />
                </View>
                <View style={styles.actionBtnTextCol}>
                  <Text style={styles.actionBtnTitle}>Add Profile Image</Text>
                  <Text style={styles.actionBtnSub}>Upload from phone gallery</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#8C9E9B" />
              </TouchableOpacity>

              {/* Option 2: Verify with Selfie */}
              <TouchableOpacity 
                style={[styles.actionGlassBtn, styles.actionGlassBtnPrimary]} 
                onPress={handleVerifySelfie}
                activeOpacity={0.88}
              >
                <View style={[styles.actionBtnIconBadge, { backgroundColor: '#0D9488' }]}>
                  <MaterialCommunityIcons name="camera-account" size={20} color="#FFFFFF" />
                </View>
                <View style={styles.actionBtnTextCol}>
                  <Text style={styles.actionBtnTitle}>Verify with Live Selfie</Text>
                  <Text style={styles.actionBtnSub}>Get 5x more responses & verified badge</Text>
                </View>
                <Ionicons name="checkmark-circle" size={20} color="#0D9488" />
              </TouchableOpacity>
            </View>

            {/* Photo Tip Pill */}
            <View style={styles.tipGlassPill}>
              <MaterialCommunityIcons name="lightning-bolt" size={16} color="#0D9488" style={{ marginRight: 6 }} />
              <Text style={styles.tipPillText}>Verified profiles with photos get 8x more matches!</Text>
            </View>
          </View>
          <View style={{ height: 20 }} />
        </ScrollView>

        <View style={styles.footerContainer}>
          <View style={styles.progressRow}>
            <View style={styles.progressTrackBg}>
              <View style={[styles.progressBarFill, { width: `${(12 / 13) * 100}%` }]} />
            </View>
            <Text style={styles.progressText}>92%</Text>
          </View>

          <TouchableOpacity style={styles.continueBtn} onPress={handleNext} activeOpacity={0.88}>
            <Text style={styles.continueBtnText}>{t.continue} →</Text>
          </TouchableOpacity>
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
    color: '#0F2E2B',
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
    alignItems: 'center',
    shadowColor: '#0F2E2B',
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
    backgroundColor: '#0F2E2B',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F2E2B',
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
    color: '#0F2E2B',
    fontFamily: 'serif',
    textAlign: 'center',
    marginBottom: 4,
  },
  questionSubtitle: {
    fontSize: 13,
    color: '#4A6B66',
    textAlign: 'center',
    lineHeight: 18,
  },

  photoFrameContainer: {
    position: 'relative',
    marginVertical: 12,
  },
  avatarImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#0D9488',
  },
  cameraIconBtn: {
    position: 'absolute',
    bottom: 0,
    right: 4,
    backgroundColor: '#0F2E2B',
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  selfieVerifiedBadge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#0D9488',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  selfieVerifiedText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  actionButtonsContainer: {
    width: '100%',
    gap: 10,
    marginVertical: 14,
  },
  actionGlassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 46, 43, 0.12)',
  },
  actionGlassBtnPrimary: {
    backgroundColor: 'rgba(13, 148, 136, 0.08)',
    borderColor: '#0D9488',
  },
  actionBtnIconBadge: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  actionBtnTextCol: {
    flex: 1,
  },
  actionBtnTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F2E2B',
  },
  actionBtnSub: {
    fontSize: 11,
    color: '#4A6B66',
    marginTop: 2,
  },

  tipGlassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 4,
  },
  tipPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F2E2B',
    flex: 1,
  },

  footerContainer: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    backgroundColor: 'rgba(235, 247, 245, 0.92)',
    borderTopWidth: 1,
    borderColor: 'rgba(15, 46, 43, 0.1)',
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
    backgroundColor: 'rgba(15, 46, 43, 0.12)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#0D9488',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0D9488',
  },
  continueBtn: {
    backgroundColor: '#0F2E2B',
    paddingVertical: 16,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#0F2E2B',
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
