import React, { useState } from 'react';
import PremiumButton from '../../../src/components/ui/PremiumButton';
import PremiumCard from '../../../src/components/ui/PremiumCard';
import { Typography } from '../../../src/constants/theme';
import { 
  View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, Alert, Modal, ActivityIndicator 
} from 'react-native';
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

  // Camera & Face Match Modal Prototype State
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [verifyState, setVerifyState] = useState<'camera' | 'scanning' | 'success'>('camera');
  const [capturedSelfie, setCapturedSelfie] = useState<string>('https://randomuser.me/api/portraits/men/32.jpg');

  const handleUploadGalleryImage = () => {
    Alert.alert(
      '🖼️ Upload Profile Image',
      'Choose a high-quality photo from your gallery.',
      [
        { text: 'Choose Portrait 1 📸', onPress: () => setPhotoUrl('https://randomuser.me/api/portraits/men/45.jpg') },
        { text: 'Choose Portrait 2 📸', onPress: () => setPhotoUrl('https://randomuser.me/api/portraits/men/68.jpg') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleOpenSelfieCamera = () => {
    setVerifyState('camera');
    setShowCameraModal(true);
  };

  const handleCaptureSelfie = () => {
    setCapturedSelfie(photoUrl); // match with uploaded photo
    setVerifyState('scanning');

    // Simulate AI Facial Scanning & Biometric Matching
    setTimeout(() => {
      setVerifyState('success');
      setIsSelfieVerified(true);
    }, 2200);
  };

  const handleFinishSelfieVerification = () => {
    setShowCameraModal(false);
    Alert.alert(
      '🎉 100% Face Match Confirmed!',
      'Selfie matched successfully with your uploaded profile image. Green "Selfie Verified" badge added to your profile!',
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
            <Ionicons name="chevron-back" size={22} color="#183B82" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>12 / 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <PremiumCard variant="glass" style={styles.glassCardContainer}>
            {/* Top Glowing Header Emblem */}
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <Text style={{ fontSize: 28 }}>📸</Text>
              </View>
            </View>

            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step12Title}</Text>
              <Text style={styles.questionSubtitle}>Add your profile photo & verify identity</Text>
            </View>

            {/* Candidate Photo Preview Frame */}
            <View style={styles.photoFrameContainer}>
              <Image source={{ uri: photoUrl }} style={styles.avatarImage} />
              <TouchableOpacity style={styles.cameraIconBtn} onPress={handleUploadGalleryImage} activeOpacity={0.88}>
                <Text style={{ fontSize: 16 }}>📸</Text>
              </TouchableOpacity>

              {isSelfieVerified && (
                <View style={styles.selfieVerifiedBadge}>
                  <Text style={styles.selfieVerifiedText}>🛡️ Selfie Verified</Text>
                </View>
              )}
            </View>

            {/* CREATIVE EMOJI BOXES SECTION */}
            <View style={styles.emojiBoxesContainer}>
              {/* Box 1: Gallery Upload */}
              <TouchableOpacity 
                style={styles.emojiCardBox} 
                onPress={handleUploadGalleryImage}
                activeOpacity={0.88}
              >
                <View style={styles.emojiIconCircle}>
                  <Text style={{ fontSize: 26 }}>🖼️</Text>
                </View>
                <View style={styles.emojiCardContent}>
                  <View style={styles.titleTagRow}>
                    <Text style={styles.emojiCardTitle}>Upload Profile Image</Text>
                    <View style={styles.accentTagPill}>
                      <Text style={styles.accentTagText}>⚡ 8x Responses</Text>
                    </View>
                  </View>
                  <Text style={styles.emojiCardSub}>Select your best photo from phone gallery</Text>
                </View>
                <Ionicons name="chevron-forward" size={18} color="#183B82" />
              </TouchableOpacity>

              {/* Box 2: Live Selfie Verification */}
              <TouchableOpacity 
                style={[styles.emojiCardBox, styles.emojiCardBoxHighlight]} 
                onPress={handleOpenSelfieCamera}
                activeOpacity={0.88}
              >
                <View style={[styles.emojiIconCircle, { backgroundColor: '#4169D8' }]}>
                  <Text style={{ fontSize: 26 }}>🤳</Text>
                </View>
                <View style={styles.emojiCardContent}>
                  <View style={styles.titleTagRow}>
                    <Text style={styles.emojiCardTitle}>Verify with Live Selfie</Text>
                    <View style={[styles.accentTagPill, { backgroundColor: '#4169D8' }]}>
                      <Text style={[styles.accentTagText, { color: '#FFFFFF' }]}>✅ Verified Badge</Text>
                    </View>
                  </View>
                  <Text style={styles.emojiCardSub}>Open camera, snap selfie & match with photo</Text>
                </View>
                <Ionicons name="camera-outline" size={22} color="#4169D8" />
              </TouchableOpacity>
            </View>

            {/* Tip Banner */}
            <View style={styles.tipGlassPill}>
              <Text style={{ fontSize: 14, marginRight: 6 }}>💡</Text>
              <Text style={styles.tipPillText}>Profiles with verified selfies get priority in search results!</Text>
            </View>
          </PremiumCard>
          <View style={{ height: 20 }} />
        </ScrollView>

        {/* INTERACTIVE CAMERA & FACE MATCH VERIFICATION MODAL */}
        <Modal visible={showCameraModal} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.cameraModalCard}>
              <View style={styles.modalHeader}>
                <View>
                  <Text style={styles.modalTitle}>🤳 Live Selfie Verification</Text>
                  <Text style={styles.modalSubTitle}>AI Facial Biometric Match</Text>
                </View>
                <TouchableOpacity onPress={() => setShowCameraModal(false)}>
                  <Ionicons name="close" size={24} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              {/* CAMERA STATE 1: Live Viewfinder */}
              {verifyState === 'camera' && (
                <View style={styles.viewfinderContainer}>
                  <View style={styles.ovalFaceGuide}>
                    <View style={styles.scannerLineOverlay} />
                    <MaterialCommunityIcons name="face-recognition" size={80} color="rgba(255,255,255,0.4)" />
                  </View>
                  <Text style={styles.cameraInstructions}>
                    Align your face inside the circle & tap Capture Selfie
                  </Text>
                  <TouchableOpacity 
                    style={styles.snapSelfieBtn} 
                    onPress={handleCaptureSelfie}
                    activeOpacity={0.88}
                  >
                    <Ionicons name="camera" size={24} color="#FFFFFF" style={{ marginRight: 8 }} />
                    <Text style={styles.snapSelfieBtnText}>Snap Selfie & Match</Text>
                  </TouchableOpacity>
                </View>
              )}

              {/* CAMERA STATE 2: AI Facial Scanning & Matching */}
              {verifyState === 'scanning' && (
                <View style={styles.scanningContainer}>
                  <Text style={styles.scanningTitle}>Analyzing Facial Biometrics...</Text>
                  
                  {/* Side-by-Side Face Comparison */}
                  <View style={styles.faceMatchRow}>
                    <View style={styles.faceCol}>
                      <Image source={{ uri: photoUrl }} style={styles.smallMatchAvatar} />
                      <Text style={styles.faceColLabel}>Uploaded Photo</Text>
                    </View>

                    <View style={styles.matchVsCircle}>
                      <MaterialCommunityIcons name="swap-horizontal" size={20} color="#4169D8" />
                    </View>

                    <View style={styles.faceCol}>
                      <Image source={{ uri: capturedSelfie }} style={styles.smallMatchAvatar} />
                      <Text style={styles.faceColLabel}>Captured Selfie</Text>
                    </View>
                  </View>

                  <ActivityIndicator size="large" color="#4169D8" style={{ marginVertical: 16 }} />
                  <Text style={styles.matchingPercentText}>Matching facial landmarks... 98.4% Accuracy</Text>
                </View>
              )}

              {/* CAMERA STATE 3: Success Match Confirmed */}
              {verifyState === 'success' && (
                <View style={styles.successContainer}>
                  <View style={styles.successCheckBadge}>
                    <Ionicons name="checkmark-done" size={48} color="#FFFFFF" />
                  </View>
                  <Text style={styles.successMatchTitle}>100% Face Match Confirmed! 🎉</Text>
                  <Text style={styles.successMatchSub}>
                    Your selfie matches your uploaded profile photo perfectly. Green Verified Badge is now active!
                  </Text>

                  <TouchableOpacity 
                    style={styles.finishVerifyBtn} 
                    onPress={handleFinishSelfieVerification}
                    activeOpacity={0.88}
                  >
                    <Text style={styles.finishVerifyBtnText}>Done & Unlock Badge ✨</Text>
                  </TouchableOpacity>
                </View>
              )}
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
    alignItems: 'center',
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
    width: 60,
    height: 60,
    borderRadius: 30,
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

  photoFrameContainer: {
    position: 'relative',
    marginVertical: 12,
  },
  avatarImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    borderWidth: 3,
    borderColor: '#4169D8',
  },
  cameraIconBtn: {
    position: 'absolute',
    bottom: 0,
    right: 4,
    backgroundColor: '#183B82',
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
    top: -6,
    right: -10,
    backgroundColor: '#4169D8',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#4169D8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  selfieVerifiedText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  /* Creative Emoji Boxes */
  emojiBoxesContainer: {
    width: '100%',
    gap: 12,
    marginVertical: 14,
  },
  emojiCardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 22,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(24, 59, 130, 0.12)',
    shadowColor: '#183B82',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  emojiCardBoxHighlight: {
    backgroundColor: 'rgba(13, 148, 136, 0.08)',
    borderColor: '#4169D8',
    borderWidth: 2,
  },
  emojiIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(65, 105, 216, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  emojiCardContent: {
    flex: 1,
  },
  titleTagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 2,
  },
  emojiCardTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#183B82',
  },
  accentTagPill: {
    backgroundColor: 'rgba(24, 59, 130, 0.08)',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  accentTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#183B82',
  },
  emojiCardSub: {
    fontSize: 12,
    color: '#4A6B66',
    lineHeight: 16,
  },

  tipGlassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(65, 105, 216, 0.12)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginTop: 4,
  },
  tipPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#183B82',
    flex: 1,
  },

  /* Camera Modal Prototype */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.85)',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  cameraModalCard: {
    backgroundColor: '#183B82',
    borderRadius: 28,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
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
    fontFamily: Typography.fontFamily.serif,
  },
  modalSubTitle: {
    fontSize: 12,
    color: '#4169D8',
    fontWeight: '700',
    marginTop: 2,
  },

  viewfinderContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  ovalFaceGuide: {
    width: 180,
    height: 220,
    borderRadius: 90,
    borderWidth: 3,
    borderColor: '#4169D8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(13, 148, 136, 0.1)',
    position: 'relative',
    marginBottom: 16,
    overflow: 'hidden',
  },
  scannerLineOverlay: {
    position: 'absolute',
    top: 40,
    width: '100%',
    height: 2,
    backgroundColor: '#4169D8',
  },
  cameraInstructions: {
    fontSize: 13,
    color: '#D2F1EC',
    textAlign: 'center',
    marginBottom: 20,
  },
  snapSelfieBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4169D8',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
  },
  snapSelfieBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  scanningContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  scanningTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  faceMatchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  faceCol: {
    alignItems: 'center',
  },
  smallMatchAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#4169D8',
    marginBottom: 6,
  },
  faceColLabel: {
    fontSize: 11,
    color: '#D2F1EC',
    fontWeight: '700',
  },
  matchVsCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  matchingPercentText: {
    fontSize: 13,
    color: '#4169D8',
    fontWeight: '700',
  },

  successContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  successCheckBadge: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#4169D8',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  successMatchTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 8,
  },
  successMatchSub: {
    fontSize: 13,
    color: '#D2F1EC',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 20,
  },
  finishVerifyBtn: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 24,
  },
  finishVerifyBtnText: {
    color: '#183B82',
    fontSize: 15,
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
