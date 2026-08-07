import React from 'react';
import { 
  View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image 
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp, Profile } from '../../src/context/AppContext';
import MintGlassBackground from '../../src/components/MintGlassBackground';

export default function ProfileDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { state, dispatch, profiles } = useApp();

  const profile = (profiles || []).find((p: Profile) => p.profileId === id) || profiles?.[0];
  const isShortlisted = (state.shortlistedProfiles || []).includes(profile?.profileId || '');
  const isInterestSent = (state.sentInterests || []).includes(profile?.profileId || '');

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
          {/* Main Photo Glass Hero */}
          <View style={styles.heroGlassContainer}>
            <Image
              source={{ uri: profile.profilePhotoURL || 'https://randomuser.me/api/portraits/women/44.jpg' }}
              style={styles.heroPhoto}
              resizeMode="cover"
            />

            {/* Badges Floating Layer */}
            <View style={styles.heroBadgesRow}>
              {profile.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="shield-checkmark" size={13} color="#0D9488" style={{ marginRight: 3 }} />
                  <Text style={styles.verifiedText}>Verified</Text>
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

          {/* Profile Name & Primary Details Card */}
          <View style={styles.infoGlassCard}>
            <Text style={styles.nameText}>{profile.name}, {profile.age}</Text>
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

          {/* About Section */}
          <View style={styles.infoGlassCard}>
            <Text style={styles.sectionTitle}>About {profile.name}</Text>
            <Text style={styles.bodyText}>
              {profile.aboutMe || 'Looking for an understanding, educated life partner from a cultured Rajasthani family.'}
            </Text>
          </View>

          {/* Basic Details Grid */}
          <View style={styles.infoGlassCard}>
            <Text style={styles.sectionTitle}>Basic & Personal Details</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Mother Tongue</Text>
                <Text style={styles.gridValue}>{profile.motherTongue}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Religion & Caste</Text>
                <Text style={styles.gridValue}>{profile.religion} ({profile.caste})</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Height</Text>
                <Text style={styles.gridValue}>{profile.height}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Manglik Status</Text>
                <Text style={styles.gridValue}>{profile.manglikStatus || 'Non-Manglik'}</Text>
              </View>
            </View>
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
    marginBottom: 14,
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
  nameText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
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
    gap: 12,
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
});
