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
      '🖼️ Upload Profile Image',
      'Choose a high-quality photo from your gallery.',
      [
        { text: 'Choose Portrait 1 📸', onPress: () => setPhotoUrl('https://randomuser.me/api/portraits/men/45.jpg') },
        { text: 'Choose Portrait 2 📸', onPress: () => setPhotoUrl('https://randomuser.me/api/portraits/men/68.jpg') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const handleVerifySelfie = () => {
    setIsSelfieVerified(true);
    Alert.alert(
      '🤳 Live Selfie Verified!',
      'Your identity has been verified! A green "Govt ID & Selfie Verified" badge is now live on your profile.',
      [{ text: 'Awesome! ✨' }]
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
                <Ionicons name="chevron-forward" size={18} color="#0F2E2B" />
              </TouchableOpacity>

              {/* Box 2: Live Selfie Verification */}
              <TouchableOpacity 
                style={[styles.emojiCardBox, styles.emojiCardBoxHighlight]} 
                onPress={handleVerifySelfie}
                activeOpacity={0.88}
              >
                <View style={[styles.emojiIconCircle, { backgroundColor: '#0D9488' }]}>
                  <Text style={{ fontSize: 26 }}>🤳</Text>
                </View>
                <View style={styles.emojiCardContent}>
                  <View style={styles.titleTagRow}>
                    <Text style={styles.emojiCardTitle}>Verify with Live Selfie</Text>
                    <View style={[styles.accentTagPill, { backgroundColor: '#0D9488' }]}>
                      <Text style={[styles.accentTagText, { color: '#FFFFFF' }]}>✅ Verified Badge</Text>
                    </View>
                  </View>
                  <Text style={styles.emojiCardSub}>Instant facial verification for 100% trust score</Text>
                </View>
                <Ionicons name="checkmark-circle" size={22} color="#0D9488" />
              </TouchableOpacity>
            </View>

            {/* Tip Banner */}
            <View style={styles.tipGlassPill}>
              <Text style={{ fontSize: 14, marginRight: 6 }}>💡</Text>
              <Text style={styles.tipPillText}>Profiles with verified selfies get priority in search results!</Text>
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
    width: 60,
    height: 60,
    borderRadius: 30,
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
    top: -6,
    right: -10,
    backgroundColor: '#0D9488',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#0D9488',
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
    borderColor: 'rgba(15, 46, 43, 0.12)',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  emojiCardBoxHighlight: {
    backgroundColor: 'rgba(13, 148, 136, 0.08)',
    borderColor: '#0D9488',
    borderWidth: 2,
  },
  emojiIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
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
    color: '#0F2E2B',
  },
  accentTagPill: {
    backgroundColor: 'rgba(15, 46, 43, 0.08)',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  accentTagText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#0F2E2B',
  },
  emojiCardSub: {
    fontSize: 12,
    color: '#4A6B66',
    lineHeight: 16,
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
