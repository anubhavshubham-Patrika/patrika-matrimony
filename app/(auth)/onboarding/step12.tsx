import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';

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
    <SafeAreaView style={styles.container}>
      {/* Hero Banner */}
      <View style={styles.heroBannerContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800&auto=format&fit=crop' }}
          style={styles.heroBannerImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />

        <View style={styles.topNavRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 12 of 13</Text>
          </View>
        </View>

        <View style={styles.curvedArchMask} />
      </View>

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerTitleBox}>
          <Text style={styles.questionTitle}>{t.step12Title}</Text>
          <Text style={styles.questionSubtitle}>Upload your best profile photo to get 8x more responses</Text>
        </View>

        {/* Live Callout Pill */}
        <View style={styles.liveCalloutPill}>
          <Ionicons name="camera-outline" size={18} color="#E31E25" style={{ marginRight: 6 }} />
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
              <Ionicons name="add-circle-outline" size={44} color="#E31E25" />
              <Text style={styles.emptyPhotoText}>Tap to add main profile photo</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Capture Selfie Verification Button */}
        <TouchableOpacity style={styles.selfieVerifyBtn} activeOpacity={0.88}>
          <MaterialCommunityIcons name="shield-account-outline" size={22} color="#E31E25" style={{ marginRight: 8 }} />
          <Text style={styles.selfieVerifyText}>Capture Selfie for Instant 100% Verification</Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Sticky Bottom Navigation Footer */}
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
    marginBottom: 14,
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

  liveCalloutPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F1',
    borderWidth: 1,
    borderColor: '#FCD4D7',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 20,
  },
  liveCalloutText: {
    fontSize: 13,
    color: '#E31E25',
    fontWeight: '700',
    flex: 1,
  },

  photoFrameContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  photoContainer: {
    position: 'relative',
    width: 140,
    height: 170,
    borderRadius: 20,
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
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E31E25',
    borderStyle: 'dashed',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  emptyPhotoText: {
    fontSize: 12,
    color: '#8C7A7C',
    textAlign: 'center',
    marginTop: 8,
  },

  selfieVerifyBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E31E25',
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  selfieVerifyText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#E31E25',
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
