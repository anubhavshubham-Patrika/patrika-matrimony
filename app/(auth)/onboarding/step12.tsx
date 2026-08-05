import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
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

  const handleNext = () => {
    dispatch({ type: 'UPDATE_ONBOARDING', payload: {} });
    router.push('/(auth)/onboarding/step13');
  };

  const pickImage = () => {
    alert('Photo picker opened. Sample photo selected!');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#111111" />
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
        <Text style={styles.subtitle}>Profiles with photos receive 8x more responses</Text>

        {/* Main Circular Upload Placeholder */}
        <View style={styles.mainPhotoContainer}>
          <TouchableOpacity style={styles.mainPhotoPlaceholder} onPress={pickImage} activeOpacity={0.8}>
            <Ionicons name="camera-outline" size={44} color="#E31837" />
            <Text style={styles.addPhotoText}>Add Primary Photo</Text>
          </TouchableOpacity>
        </View>

        {/* Gallery slots */}
        <View style={styles.galleryContainer}>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.smallPhotoPlaceholder} onPress={pickImage} activeOpacity={0.8}>
              <Ionicons name="add" size={28} color="#999999" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Live Selfie Button */}
        <TouchableOpacity style={styles.selfieBtn} onPress={pickImage} activeOpacity={0.85}>
          <Ionicons name="shield-checkmark-outline" size={22} color="#E31837" />
          <Text style={styles.selfieBtnText}>{t.selfieVerification}</Text>
        </TouchableOpacity>
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
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
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
    color: '#E31837',
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#F2F2F7',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#E31837',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#27AE60',
    fontWeight: '700',
    marginTop: 6,
    marginBottom: 30,
  },
  mainPhotoContainer: {
    alignItems: 'center',
    marginBottom: 28,
  },
  mainPhotoPlaceholder: {
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: '#FFF5F6',
    borderWidth: 2,
    borderColor: '#E31837',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addPhotoText: {
    color: '#E31837',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '700',
  },
  galleryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  smallPhotoPlaceholder: {
    width: '30%',
    aspectRatio: 1,
    backgroundColor: '#FAFAFA',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selfieBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF5F6',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#E31837',
    gap: 8,
  },
  selfieBtnText: {
    color: '#E31837',
    fontSize: 15,
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#F2F2F7',
  },
  nextBtn: {
    backgroundColor: '#E31837',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#E31837',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
