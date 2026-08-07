import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';

export default function Step10() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [collegeName, setCollegeName] = useState(state.onboardingData?.collegeName || 'MNIT Jaipur');
  const [organizationName, setOrganizationName] = useState(state.onboardingData?.organizationName || 'TCS');

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        collegeName,
        organizationName,
      },
    });
    router.push('/(auth)/onboarding/step11');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hero Banner */}
      <View style={styles.heroBannerContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop' }}
          style={styles.heroBannerImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />

        <View style={styles.topNavRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 10 of 13</Text>
          </View>
        </View>

        <View style={styles.curvedArchMask} />
      </View>

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerTitleBox}>
          <Text style={styles.questionTitle}>{t.step10Title}</Text>
          <Text style={styles.questionSubtitle}>Provide your college and current organization details</Text>
        </View>

        {/* College / University Name */}
        <Text style={styles.sectionHeaderLabel}>College / University Name</Text>
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="school-outline" size={20} color="#8C7A7C" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.inputField}
            placeholder="Enter college name (e.g. MNIT Jaipur, Rajasthan Univ)"
            value={collegeName}
            onChangeText={setCollegeName}
            placeholderTextColor="#8C7A7C"
          />
        </View>

        {/* Organization / Company Name */}
        <Text style={styles.sectionHeaderLabel}>Current Organization / Company</Text>
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="office-building-outline" size={20} color="#8C7A7C" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.inputField}
            placeholder="Enter organization (e.g. Infosys, Govt School, Self-Employed)"
            value={organizationName}
            onChangeText={setOrganizationName}
            placeholderTextColor="#8C7A7C"
          />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Sticky Bottom Navigation Footer */}
      <View style={styles.footerContainer}>
        <View style={styles.progressRow}>
          <View style={styles.progressTrackBg}>
            <View style={[styles.progressBarFill, { width: `${(10 / 13) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>77%</Text>
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

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  inputField: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 15,
    color: '#2C1A1D',
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
