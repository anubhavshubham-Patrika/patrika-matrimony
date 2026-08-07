import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import AnimatedGlassBackground from '../../../src/components/AnimatedGlassBackground';

export default function Step12() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [mainPhoto, setMainPhoto] = useState<string | null>(
    state.onboardingData?.profilePhotoURL || 'https://randomuser.me/api/portraits/men/32.jpg'
  );

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        profilePhotoURL: mainPhoto || undefined,
      },
    });
    router.push('/(auth)/onboarding/step13');
  };

  return (
    <AnimatedGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 12 of 13</Text>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
          <View style={styles.glassCardContainer}>
            <View style={styles.badgeWrapper}>
              <View style={styles.glowingVectorCircle}>
                <MaterialCommunityIcons name="camera-enhance-outline" size={32} color="#FFFFFF" />
              </View>
            </View>

            <View style={styles.headerTitleBox}>
              <Text style={styles.questionTitle}>{t.step12Title}</Text>
              <Text style={styles.questionSubtitle}>Upload your best profile photo to get 8x more responses</Text>
            </View>

            <View style={styles.liveCalloutGlassPill}>
              <Ionicons name="camera-outline" size={18} color="#FF4D6D" style={{ marginRight: 6 }} />
              <Text style={styles.liveCalloutText}>Profiles with photos receive 8x more partner responses!</Text>
            </View>

            {/* Main Photo Upload Frame */}
            <View style={styles.photoFrameContainer}>
              {mainPhoto ? (
                <View style={styles.photoContainer}>
                  <Image source={{ uri: mainPhoto }} style={styles.uploadedPhoto} resizeMode="cover" />
                  <TouchableOpacity
                    style={styles.changePhotoBadge}
                    onPress={() => setMainPhoto('https://randomuser.me/api/portraits/men/32.jpg')}
                  >
                    <Ionicons name="camera-reverse" size={16} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              ) : (
                <TouchableOpacity style={styles.emptyPhotoBox} activeOpacity={0.8}>
                  <Ionicons name="add-circle-outline" size={44} color="#FF4D6D" />
                  <Text style={styles.emptyPhotoText}>Tap to add main profile photo</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Capture Selfie Verification Button */}
            <TouchableOpacity style={styles.selfieVerifyBtn} activeOpacity={0.88}>
              <MaterialCommunityIcons name="shield-account-outline" size={22} color="#FF4D6D" style={{ marginRight: 8 }} />
              <Text style={styles.selfieVerifyText}>Capture Selfie for Instant 100% Verification</Text>
            </TouchableOpacity>
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

  liveCalloutGlassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 77, 109, 0.12)',
    borderWidth: 1,
    borderColor: 'rgba(255, 77, 109, 0.3)',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 9,
    marginBottom: 18,
  },
  liveCalloutText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '700',
    flex: 1,
  },

  photoFrameContainer: {
    alignItems: 'center',
    marginBottom: 18,
  },
  photoContainer: {
    position: 'relative',
    width: 140,
    height: 170,
    borderRadius: 22,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#E31E25',
  },
  uploadedPhoto: {
    width: '100%',
    height: '100%',
  },
  changePhotoBadge: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#E31E25',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyPhotoBox: {
    width: 140,
    height: 170,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 2,
    borderColor: '#FF4D6D',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  emptyPhotoText: {
    fontSize: 12,
    color: '#BDA6B2',
    textAlign: 'center',
    marginTop: 8,
  },

  selfieVerifyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  selfieVerifyText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#FFFFFF',
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
