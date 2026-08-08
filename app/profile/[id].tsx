import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, Dimensions, StatusBar
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp, Profile } from '../../src/context/AppContext';
import PremiumButton from '../../src/components/ui/PremiumButton';
import PremiumCard from '../../src/components/ui/PremiumCard';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

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
      <SafeAreaView style={[styles.safeArea, { backgroundColor: Colors.background }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={Colors.primaryDark} />
        </TouchableOpacity>
        <View style={styles.centerBox}>
          <Text style={styles.errorText}>Profile not found</Text>
        </View>
      </SafeAreaView>
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
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} bounces={false}>
        {/* Large Hero Image Container */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: activePhoto || profile.profilePhotoURL || 'https://randomuser.me/api/portraits/women/44.jpg' }}
            style={styles.heroPhoto}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['rgba(11,31,69,0.1)', 'rgba(11,31,69,0.4)', 'rgba(11,31,69,0.85)']}
            style={styles.heroGradient}
          />
          
          {/* Floating Top Nav Bar */}
          <SafeAreaView style={styles.topNavSafeArea}>
            <View style={styles.topNav}>
              <TouchableOpacity onPress={() => router.back()} style={styles.topNavBtn}>
                <Ionicons name="chevron-back" size={24} color={Colors.primaryDark} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleShortlistToggle} style={styles.topNavBtn}>
                <Ionicons
                  name={isShortlisted ? "star" : "star-outline"}
                  size={24}
                  color={isShortlisted ? Colors.gold : Colors.primaryDark}
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>

          {/* Hero Content (Bottom of Image) */}
          <View style={styles.heroContent}>
            <View style={styles.heroBadgesRow}>
              {profile.isVerified && (
                <View style={styles.verifiedBadge}>
                  <Ionicons name="shield-checkmark" size={14} color={Colors.success} style={{ marginRight: 4 }} />
                  <Text style={styles.verifiedText}>Verified</Text>
                </View>
              )}
              {profile.isNewspaperAdLinked && (
                <View style={styles.paperAdBadge}>
                  <Ionicons name="newspaper" size={14} color={Colors.primaryDark} style={{ marginRight: 4 }} />
                  <Text style={styles.paperAdText}>Patrika Ad</Text>
                </View>
              )}
            </View>
            <Text style={styles.heroName}>{profile.name}, {profile.age}</Text>
            <Text style={styles.heroSubText}>{profile.occupation} • {profile.residentCity}</Text>
          </View>
        </View>

        <View style={styles.bodyContainer}>
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

          {/* Compatibility Match Score */}
          {profile.matchScore ? (
            <PremiumCard variant="glass" style={styles.matchCard}>
              <View style={styles.matchHeader}>
                <MaterialCommunityIcons name="auto-fix" size={24} color={Colors.gold} />
                <Text style={styles.matchTitle}>Compatibility Score</Text>
              </View>
              <View style={styles.matchScoreBarContainer}>
                <View style={[styles.matchScoreFill, { width: `${profile.matchScore}%` }]} />
              </View>
              <Text style={styles.matchScoreText}>{profile.matchScore}% Match</Text>
            </PremiumCard>
          ) : null}

          {/* About Me & Family */}
          <PremiumCard variant="default" style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>About {profile.name}</Text>
            <Text style={styles.bodyText}>
              {profile.aboutMe || 'Looking for an understanding, educated life partner from a cultured family.'}
            </Text>

            {profile.aboutFamily ? (
              <>
                <Text style={[styles.sectionTitle, { marginTop: Spacing.xl }]}>About Family</Text>
                <Text style={styles.bodyText}>{profile.aboutFamily}</Text>
              </>
            ) : null}
          </PremiumCard>

          {/* Basic & Personal Details */}
          <PremiumCard variant="default" style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Basic Details</Text>
            <View style={styles.detailsGrid}>
              <DetailItem label="Created For" value={profile.profileFor} />
              <DetailItem label="Age & Height" value={`${profile.age} Yrs, ${profile.height}`} />
              <DetailItem label="Marital Status" value={profile.maritalStatus} />
              <DetailItem label="Mother Tongue" value={profile.motherTongue} />
            </View>
          </PremiumCard>

          {/* Religion & Community Details */}
          <PremiumCard variant="default" style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Religion & Caste</Text>
            <View style={styles.detailsGrid}>
              <DetailItem label="Religion" value={profile.religion} />
              <DetailItem label="Community" value={profile.caste} />
              {profile.subCaste && <DetailItem label="Sub-Caste" value={profile.subCaste} />}
              {profile.gotra && <DetailItem label="Gotra" value={profile.gotra} />}
              <DetailItem label="Manglik" value={profile.manglikStatus || 'Non-Manglik'} />
            </View>
          </PremiumCard>

          {/* Education & Career Details */}
          <PremiumCard variant="default" style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Education & Career</Text>
            <View style={styles.detailsGrid}>
              <DetailItem label="Degree" value={profile.education?.degree} />
              <DetailItem label="Field" value={profile.education?.field} />
              <DetailItem label="Occupation" value={profile.occupation} />
              <DetailItem label="Income" value={`₹${profile.annualIncomeRange}`} />
            </View>
          </PremiumCard>

          {/* Location Details */}
          <PremiumCard variant="default" style={styles.sectionCard}>
            <Text style={styles.sectionTitle}>Location</Text>
            <View style={styles.detailsGrid}>
              <DetailItem label="City" value={profile.residentCity} />
              <DetailItem label="State" value={profile.residentState} />
              <DetailItem label="Country" value={profile.country} />
            </View>
          </PremiumCard>
          
          {/* Bottom Padding for CTA */}
          <View style={styles.bottomPadding} />
        </View>
      </ScrollView>

      {/* Sticky Bottom CTA */}
      <View style={styles.stickyCTA}>
        <LinearGradient
          colors={['rgba(243,247,255,0)', 'rgba(243,247,255,0.9)', Colors.background]}
          style={styles.stickyCTAGradient}
        />
        <View style={styles.ctaRow}>
          <PremiumButton
            title={isInterestSent ? 'Interest Sent' : 'Send Interest'}
            onPress={handleInterestToggle}
            variant={isInterestSent ? 'secondary' : 'premium'}
            icon={isInterestSent ? "checkmark-circle" : "heart"}
            style={styles.ctaButton}
            fullWidth={false}
          />
          <PremiumButton
            title=""
            onPress={() => router.push('/(tabs)/chats')}
            variant="primary"
            icon="chatbubble-ellipses"
            style={styles.chatIconBtn}
            fullWidth={false}
          />
        </View>
      </View>
    </View>
  );
}

function DetailItem({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <View style={styles.gridItem}>
      <Text style={styles.gridLabel}>{label}</Text>
      <Text style={styles.gridValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  safeArea: {
    flex: 1,
  },
  backBtn: {
    padding: Spacing.md,
  },
  centerBox: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorText: {
    fontSize: Typography.sizes.lg,
    color: Colors.text,
    fontFamily: Typography.fontFamily.sansMedium,
  },
  scrollContent: {
    paddingBottom: 100, // Space for sticky CTA
  },
  heroContainer: {
    width: width,
    height: height * 0.55,
    position: 'relative',
  },
  heroPhoto: {
    width: '100%',
    height: '100%',
  },
  heroGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
  },
  topNavSafeArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
  },
  topNavBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.sm,
  },
  heroContent: {
    position: 'absolute',
    bottom: Spacing.xl,
    left: Spacing.lg,
    right: Spacing.lg,
  },
  heroBadgesRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
  },
  verifiedText: {
    fontSize: Typography.sizes.xs,
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.success,
  },
  paperAdBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.goldLight,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 6,
  },
  paperAdText: {
    fontSize: Typography.sizes.xs,
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.primaryDark,
  },
  heroName: {
    fontSize: Typography.sizes['3xl'],
    fontFamily: Typography.fontFamily.serif,
    color: Colors.surface,
    marginBottom: 4,
  },
  heroSubText: {
    fontSize: Typography.sizes.md,
    fontFamily: Typography.fontFamily.sansMedium,
    color: Colors.surfaceGlass,
  },
  bodyContainer: {
    paddingTop: Spacing.xl,
    paddingHorizontal: Spacing.base,
  },
  galleryScrollWrapper: {
    marginBottom: Spacing.xl,
  },
  galleryRow: {
    gap: Spacing.md,
    paddingHorizontal: 4,
  },
  thumbBox: {
    width: 72,
    height: 72,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
    ...Shadow.sm,
  },
  thumbBoxActive: {
    borderColor: Colors.gold,
  },
  thumbPhoto: {
    width: '100%',
    height: '100%',
  },
  matchCard: {
    marginBottom: Spacing.lg,
    backgroundColor: Colors.primaryDark, // Make it pop with primaryDark
  },
  matchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  matchTitle: {
    fontSize: Typography.sizes.md,
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.surface,
    marginLeft: Spacing.sm,
  },
  matchScoreBarContainer: {
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: BorderRadius.full,
    marginBottom: Spacing.sm,
    overflow: 'hidden',
  },
  matchScoreFill: {
    height: '100%',
    backgroundColor: Colors.gold,
    borderRadius: BorderRadius.full,
  },
  matchScoreText: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sansMedium,
    color: Colors.goldLight,
    textAlign: 'right',
  },
  sectionCard: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontFamily: Typography.fontFamily.serif,
    color: Colors.primaryDark,
    marginBottom: Spacing.md,
  },
  bodyText: {
    fontSize: Typography.sizes.md,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.textSecondary,
    lineHeight: Typography.lineHeight.relaxed * Typography.sizes.md,
  },
  detailsGrid: {
    gap: Spacing.md,
  },
  gridItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  gridLabel: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.textMuted,
    flex: 1,
  },
  gridValue: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sansMedium,
    color: Colors.text,
    flex: 1,
    textAlign: 'right',
  },
  bottomPadding: {
    height: 40,
  },
  stickyCTA: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing.xl,
    paddingTop: Spacing.xl,
  },
  stickyCTAGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  ctaRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctaButton: {
    flex: 1,
  },
  chatIconBtn: {
    width: 56,
    paddingHorizontal: 0,
  },
});
