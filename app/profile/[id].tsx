import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, Dimensions 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp, Profile } from '../../src/context/AppContext';
import MintGlassBackground from '../../src/components/MintGlassBackground';

const { width } = Dimensions.get('window');

export default function ProfileDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { state, dispatch, profiles } = useApp();

  const profile = (profiles || []).find((p: Profile) => p.profileId === id) || profiles?.[0];
  const isShortlisted = (state.shortlistedProfiles || []).includes(profile?.profileId || '');
  const isInterestSent = (state.sentInterests || []).includes(profile?.profileId || '');

  const [activePhoto, setActivePhoto] = useState<string>(profile?.profilePhotoURL || '');

  if (!profile) {
    return (
      <MintGlassBackground>
        <SafeAreaView style={styles.safeArea}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#0F2E2B" />
          </TouchableOpacity>
          <View style={styles.centerBox}>
            <Text style={styles.errorText}>Profile not found</Text>
          </View>
        </SafeAreaView>
      </MintGlassBackground>
    );
  }

  const photosList = [
    profile.profilePhotoURL,
    ...(profile.galleryPhotoURLs || []),
  ].filter(Boolean);

  const handleInterestToggle = () => {
    dispatch({ type: 'SEND_INTEREST', payload: profile.profileId });
  };

  const handleShortlistToggle = () => {
    dispatch({ type: 'TOGGLE_SHORTLIST', payload: profile.profileId });
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Floating Top Nav Bar */}
        <View style={styles.topNav}>
          <TouchableOpacity onPress={() => router.back()} style={styles.topNavBtn}>
            <Ionicons name="chevron-back" size={22} color="#0F2E2B" />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleShortlistToggle} style={styles.topNavBtn}>
            <Ionicons
              name={isShortlisted ? "star" : "star-outline"}
              size={22}
              color={isShortlisted ? "#D4AF37" : "#0F2E2B"}
            />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Hero Photo Container */}
          <View style={styles.heroGlassContainer}>
            <Image
              source={{ uri: activePhoto || profile.profilePhotoURL || 'https://randomuser.me/api/portraits/women/44.jpg' }}
              style={styles.heroPhoto}
              resizeMode="cover"
            />

            {/* Badges Floating Layer */}
            <View style={styles.heroBadgesRow}>
              {profile.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="shield-checkmark" size={13} color="#0D9488" style={{ marginRight: 3 }} />
                  <Text style={styles.verifiedText}>100% Verified</Text>
                </View>
              )}
              {profile.isNewspaperAdLinked && (
                <View style={styles.paperAdBadge}>
                  <Ionicons name="newspaper-outline" size={13} color="#E31E25" style={{ marginRight: 3 }} />
                  <Text style={styles.paperAdText}>Patrika Ad Linked</Text>
                </View>
              )}
            </View>
          </View>

          {/* Photo Gallery Thumbnails */}
          {photosList.length > 1 && (
            <View style={styles.galleryScrollWrapper}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.galleryRow}>
                {photosList.map((url, idx) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setActivePhoto(url)}
                    style={[styles.thumbBox, activePhoto === url && styles.thumbBoxActive]}
                  >
                    <Image source={{ uri: url }} style={styles.thumbPhoto} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {/* Profile Header Info Card */}
          <View style={styles.infoGlassCard}>
            <View style={styles.titleRow}>
              <Text style={styles.nameText}>{profile.name}, {profile.age}</Text>
              <View style={styles.idPill}>
                <Text style={styles.idText}>ID: {profile.profileId}</Text>
              </View>
            </View>

            <Text style={styles.subText}>{profile.occupation} • {profile.education?.degree}</Text>
            <Text style={styles.locText}>📍 {profile.residentCity}, {profile.residentState}, {profile.country}</Text>

            {/* Match Score Bar */}
            {profile.matchScore ? (
              <View style={styles.matchScoreBar}>
                <MaterialCommunityIcons name="auto-fix" size={18} color="#0D9488" style={{ marginRight: 6 }} />
                <Text style={styles.matchScoreText}>{profile.matchScore}% Match Compatibility</Text>
              </View>
            ) : null}

            {/* Action CTAs */}
            <View style={styles.ctaRow}>
              <TouchableOpacity
                style={[styles.primaryInterestBtn, isInterestSent && styles.primaryInterestBtnSent]}
                onPress={handleInterestToggle}
                activeOpacity={0.88}
              >
                <Ionicons
                  name={isInterestSent ? "checkmark-circle" : "heart"}
                  size={18}
                  color="#FFFFFF"
                  style={{ marginRight: 6 }}
                />
                <Text style={styles.primaryInterestText}>
                  {isInterestSent ? 'Interest Sent' : 'Send Interest'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.chatBtn}
                onPress={() => router.push('/(tabs)/chats')}
                activeOpacity={0.88}
              >
                <MaterialCommunityIcons name="message-text-outline" size={20} color="#0F2E2B" />
              </TouchableOpacity>
            </View>
          </View>

          {/* About Me & Family */}
          <View style={styles.infoGlassCard}>
            <Text style={styles.sectionTitle}>About {profile.name}</Text>
            <Text style={styles.bodyText}>
              {profile.aboutMe || 'Looking for an understanding, educated life partner from a cultured family.'}
            </Text>

            {profile.aboutFamily ? (
              <>
                <Text style={[styles.sectionTitle, { marginTop: 14 }]}>About Family</Text>
                <Text style={styles.bodyText}>{profile.aboutFamily}</Text>
              </>
            ) : null}
          </View>

          {/* Basic & Personal Details */}
          <View style={styles.infoGlassCard}>
            <Text style={styles.sectionTitle}>Basic & Personal Details</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Created For</Text>
                <Text style={styles.gridValue}>{profile.profileFor}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Gender</Text>
                <Text style={styles.gridValue}>{profile.gender}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Age & Height</Text>
                <Text style={styles.gridValue}>{profile.age} Yrs, {profile.height}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Marital Status</Text>
                <Text style={styles.gridValue}>{profile.maritalStatus}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Mother Tongue</Text>
                <Text style={styles.gridValue}>{profile.motherTongue}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Physical Status</Text>
                <Text style={styles.gridValue}>{profile.physicalStatus || 'Normal'}</Text>
              </View>
            </View>
          </View>

          {/* Religion & Community Details */}
          <View style={styles.infoGlassCard}>
            <Text style={styles.sectionTitle}>Religion & Caste</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Religion</Text>
                <Text style={styles.gridValue}>{profile.religion}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Caste / Community</Text>
                <Text style={styles.gridValue}>{profile.caste}</Text>
              </View>
              {profile.subCaste ? (
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Sub-Caste</Text>
                  <Text style={styles.gridValue}>{profile.subCaste}</Text>
                </View>
              ) : null}
              {profile.gotra ? (
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Gotra</Text>
                  <Text style={styles.gridValue}>{profile.gotra}</Text>
                </View>
              ) : null}
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Manglik Status</Text>
                <Text style={styles.gridValue}>{profile.manglikStatus || 'Non-Manglik'}</Text>
              </View>
            </View>
          </View>

          {/* Education & Career Details */}
          <View style={styles.infoGlassCard}>
            <Text style={styles.sectionTitle}>Education & Career</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Highest Degree</Text>
                <Text style={styles.gridValue}>{profile.education?.degree}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Education Field</Text>
                <Text style={styles.gridValue}>{profile.education?.field}</Text>
              </View>
              {profile.collegeName ? (
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>College / University</Text>
                  <Text style={styles.gridValue}>{profile.collegeName}</Text>
                </View>
              ) : null}
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Employment Type</Text>
                <Text style={styles.gridValue}>{profile.employmentType}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Occupation</Text>
                <Text style={styles.gridValue}>{profile.occupation}</Text>
              </View>
              {profile.organizationName ? (
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Organization</Text>
                  <Text style={styles.gridValue}>{profile.organizationName}</Text>
                </View>
              ) : null}
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Annual Income</Text>
                <Text style={styles.gridValue}>₹{profile.annualIncomeRange}</Text>
              </View>
            </View>
          </View>

          {/* Location & Ancestral Origin */}
          <View style={styles.infoGlassCard}>
            <Text style={styles.sectionTitle}>Location & Ancestral Origin</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Resident City</Text>
                <Text style={styles.gridValue}>{profile.residentCity}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Resident State</Text>
                <Text style={styles.gridValue}>{profile.residentState}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Country</Text>
                <Text style={styles.gridValue}>{profile.country}</Text>
              </View>
              {profile.ancestralOrigin ? (
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Ancestral Origin</Text>
                  <Text style={styles.gridValue}>{profile.ancestralOrigin}</Text>
                </View>
              ) : null}
            </View>
          </View>

          {/* Horoscope Details */}
          {profile.horoscope ? (
            <View style={styles.infoGlassCard}>
              <Text style={styles.sectionTitle}>Horoscope & Guna Details</Text>
              <View style={styles.detailsGrid}>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Nakshatra / Star</Text>
                  <Text style={styles.gridValue}>{profile.horoscope.star}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Time of Birth</Text>
                  <Text style={styles.gridValue}>{profile.horoscope.timeOfBirth}</Text>
                </View>
                <View style={styles.gridItem}>
                  <Text style={styles.gridLabel}>Place of Birth</Text>
                  <Text style={styles.gridValue}>{profile.horoscope.placeOfBirth}</Text>
                </View>
              </View>
            </View>
          ) : null}

          {/* Lifestyle & Hobbies */}
          <View style={styles.infoGlassCard}>
            <Text style={styles.sectionTitle}>Lifestyle & Hobbies</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Diet</Text>
                <Text style={styles.gridValue}>{profile.diet}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Smoking</Text>
                <Text style={styles.gridValue}>{profile.smoking}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Drinking</Text>
                <Text style={styles.gridValue}>{profile.drinking}</Text>
              </View>
            </View>

            {profile.hobbies?.length ? (
              <>
                <Text style={[styles.sectionTitle, { marginTop: 14 }]}>Hobbies & Interests</Text>
                <View style={styles.chipsWrapRow}>
                  {profile.hobbies.map((h, i) => (
                    <View key={i} style={styles.hobbyChip}>
                      <Text style={styles.hobbyChipText}>{h}</Text>
                    </View>
                  ))}
                </View>
              </>
            ) : null}
          </View>
        </ScrollView>
      </SafeAreaView>
    </MintGlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 8,
    zIndex: 10,
  },
  topNavBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtn: {
    padding: 10,
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#0F2E2B',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  heroGlassContainer: {
    position: 'relative',
    width: '100%',
    height: 320,
    borderRadius: 28,
    overflow: 'hidden',
    marginBottom: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
  },
  heroPhoto: {
    width: '100%',
    height: '100%',
  },
  heroBadgesRow: {
    position: 'absolute',
    bottom: 14,
    left: 14,
    flexDirection: 'row',
    gap: 8,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  verifiedText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0D9488',
  },
  paperAdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 240, 241, 0.92)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  paperAdText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#E31E25',
  },

  galleryScrollWrapper: {
    marginBottom: 14,
  },
  galleryRow: {
    gap: 8,
  },
  thumbBox: {
    width: 64,
    height: 64,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
  },
  thumbBoxActive: {
    borderColor: '#0D9488',
    borderWidth: 3,
  },
  thumbPhoto: {
    width: '100%',
    height: '100%',
  },

  infoGlassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 26,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  nameText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  idPill: {
    backgroundColor: 'rgba(15, 46, 43, 0.06)',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  idText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#4A6B66',
  },
  subText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0D9488',
    marginTop: 4,
  },
  locText: {
    fontSize: 13,
    color: '#4A6B66',
    marginTop: 4,
  },
  matchScoreBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 148, 136, 0.1)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 12,
  },
  matchScoreText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0D9488',
  },
  ctaRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  primaryInterestBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E31E25',
    borderRadius: 22,
    paddingVertical: 14,
  },
  primaryInterestBtnSent: {
    backgroundColor: '#0D9488',
  },
  primaryInterestText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
  chatBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(15, 46, 43, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 14,
    color: '#4A6B66',
    lineHeight: 20,
  },

  detailsGrid: {
    gap: 10,
    marginTop: 4,
  },
  gridItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 46, 43, 0.06)',
  },
  gridLabel: {
    fontSize: 13,
    color: '#4A6B66',
  },
  gridValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F2E2B',
  },

  chipsWrapRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  hobbyChip: {
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  hobbyChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0D9488',
  },
});
