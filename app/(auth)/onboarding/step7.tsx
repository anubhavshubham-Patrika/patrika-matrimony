import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';

export default function Step7() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [familyStatus, setFamilyStatus] = useState(state.onboardingData?.familyStatus || 'Upper Middle Class');
  const [ancestralOrigin, setAncestralOrigin] = useState(state.onboardingData?.ancestralOrigin || 'Jodhpur, Rajasthan');
  const [aboutMe, setAboutMe] = useState(state.onboardingData?.aboutMe || '');

  const familyStatuses = [
    { id: 'Middle Class', label: 'Middle Class', icon: 'home-outline' },
    { id: 'Upper Middle Class', label: 'Upper Middle Class', icon: 'home-heart' },
    { id: 'Rich / Affluent', label: 'Rich / Affluent', icon: 'crown-outline' },
  ];

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        familyStatus,
        ancestralOrigin,
        aboutMe,
      },
    });
    router.push('/(auth)/onboarding/step8');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Hero Banner */}
      <View style={styles.heroBannerContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop' }}
          style={styles.heroBannerImage}
          resizeMode="cover"
        />
        <View style={styles.heroOverlay} />

        <View style={styles.topNavRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.blurBackBtn} activeOpacity={0.8}>
            <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.stepPillBadge}>
            <Text style={styles.stepPillText}>Step 7 of 13</Text>
          </View>
        </View>

        <View style={styles.curvedArchMask} />
      </View>

      <ScrollView contentContainerStyle={styles.contentScroll} showsVerticalScrollIndicator={false}>
        <View style={styles.headerTitleBox}>
          <Text style={styles.questionTitle}>{t.step7Title}</Text>
          <Text style={styles.questionSubtitle}>{t.step7Subtitle}</Text>
        </View>

        {/* Family Status Options */}
        <Text style={styles.sectionHeaderLabel}>Family Status</Text>
        <View style={styles.familyGrid}>
          {familyStatuses.map((item) => {
            const isSel = familyStatus === item.id;
            return (
              <TouchableOpacity
                key={item.id}
                style={[styles.optionCardRow, isSel && styles.optionCardRowSelected]}
                onPress={() => setFamilyStatus(item.id)}
                activeOpacity={0.88}
              >
                <View style={[styles.iconCircleBadge, isSel && styles.iconCircleBadgeSelected]}>
                  <MaterialCommunityIcons name={item.icon as any} size={22} color={isSel ? '#E31E25' : '#8C7A7C'} />
                </View>
                <Text style={[styles.optionLabel, isSel && styles.optionLabelSelected]}>{item.label}</Text>
                <View style={[styles.radioOuterCircle, isSel && styles.radioOuterCircleSelected]}>
                  {isSel && <Ionicons name="checkmark" size={14} color="#FFFFFF" />}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Ancestral Origin */}
        <Text style={styles.sectionHeaderLabel}>Ancestral Origin / Hometown</Text>
        <View style={styles.inputWrapper}>
          <MaterialCommunityIcons name="home-city-outline" size={20} color="#8C7A7C" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.inputField}
            placeholder="Enter district/town (e.g. Jodhpur, Shekhawati)"
            value={ancestralOrigin}
            onChangeText={setAncestralOrigin}
            placeholderTextColor="#8C7A7C"
          />
        </View>

        {/* About Me Bio */}
        <Text style={styles.sectionHeaderLabel}>About Me (Bio)</Text>
        <View style={[styles.inputWrapper, { alignItems: 'flex-start', paddingTop: 12 }]}>
          <MaterialCommunityIcons name="text-account" size={20} color="#8C7A7C" style={{ marginRight: 10, marginTop: 2 }} />
          <TextInput
            style={[styles.inputField, { height: 80, textAlignVertical: 'top' }]}
            placeholder="Write 2-3 lines about yourself, your values and lifestyle..."
            multiline
            numberOfLines={3}
            value={aboutMe}
            onChangeText={setAboutMe}
            placeholderTextColor="#8C7A7C"
          />
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      {/* Sticky Bottom Navigation Footer */}
      <View style={styles.footerContainer}>
        <View style={styles.progressRow}>
          <View style={styles.progressTrackBg}>
            <View style={[styles.progressBarFill, { width: `${(7 / 13) * 100}%` }]} />
          </View>
          <Text style={styles.progressText}>54%</Text>
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

  familyGrid: {
    gap: 10,
  },
  optionCardRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 1.5,
    borderColor: '#EFE6DD',
  },
  optionCardRowSelected: {
    borderColor: '#E31E25',
    backgroundColor: '#FFF0F1',
  },
  iconCircleBadge: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFF9F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  iconCircleBadgeSelected: {
    backgroundColor: '#FFE4E6',
  },
  optionLabel: {
    flex: 1,
    fontSize: 15,
    fontWeight: '700',
    color: '#2C1A1D',
  },
  optionLabelSelected: {
    color: '#E31E25',
    fontWeight: '800',
  },
  radioOuterCircle: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    borderColor: '#A39396',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioOuterCircleSelected: {
    backgroundColor: '#E31E25',
    borderColor: '#E31E25',
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
