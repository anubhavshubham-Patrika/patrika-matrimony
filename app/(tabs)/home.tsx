import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp, Profile } from '../../src/context/AppContext';
import ProfileCard from '../../src/components/ProfileCard';
import PremiumButton from '../../src/components/ui/PremiumButton';
import PremiumCard from '../../src/components/ui/PremiumCard';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen() {
  const router = useRouter();
  const { state, dispatch, profiles } = useApp();

  const shortlistedIds = state.shortlistedProfiles || [];
  const sentInterests = state.sentInterests || [];

  const recommendedProfiles = profiles.slice(0, 10);
  const verifiedProfiles = profiles.filter((p: Profile) => p.isVerified).slice(0, 10);
  const nearbyProfiles = profiles.filter((p: Profile) => p.residentState === 'Rajasthan').slice(0, 10);

  const dailyMatch = recommendedProfiles[0];

  const handleInterestToggle = (profileId: string) => {
    dispatch({ type: 'SEND_INTEREST', payload: profileId });
  };

  const handleShortlistToggle = (profileId: string) => {
    dispatch({ type: 'TOGGLE_SHORTLIST', payload: profileId });
  };

  const renderHorizontalSection = (title: string, subtitle: string, data: Profile[]) => (
    <View style={styles.sectionContainer}>
      <View style={styles.sectionHeader}>
        <View>
          <Text style={styles.sectionTitle}>{title}</Text>
          <Text style={styles.sectionSubtitle}>{subtitle}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalListContent}
        keyExtractor={(item) => item.profileId}
        renderItem={({ item }) => (
          <View style={{ width: 280, marginRight: Spacing.base }}>
            <ProfileCard
              profile={item}
              onPress={() => router.push(`/profile/${item.profileId}`)}
              onInterest={() => handleInterestToggle(item.profileId)}
              onShortlist={() => handleShortlistToggle(item.profileId)}
              isInterestSent={sentInterests.includes(item.profileId)}
              isShortlisted={shortlistedIds.includes(item.profileId)}
              size="full"
            />
          </View>
        )}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient 
        colors={Colors.gradient.background as any} 
        style={StyleSheet.absoluteFill} 
        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} 
      />
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header Bar */}
        <View style={styles.topHeader}>
          <View style={styles.brandCol}>
            <Text style={styles.greetingText}>Good Morning, User</Text>
            <Text style={styles.subGreetingText}>Find your perfect match today</Text>
          </View>

          <View style={styles.headerRightActions}>
            <TouchableOpacity 
              style={styles.headerIconBtn} 
              onPress={() => router.push('/subscription')}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="crown" size={20} color={Colors.gold} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.headerIconBtn} activeOpacity={0.8}>
              <Ionicons name="notifications-outline" size={20} color={Colors.primary} />
              <View style={styles.notifBadge} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          
          {/* Daily Match Section */}
          {dailyMatch && (
            <View style={styles.dailyMatchContainer}>
              <View style={styles.dailyMatchHeader}>
                <Ionicons name="star" size={20} color={Colors.gold} />
                <Text style={styles.dailyMatchTitle}>Your Daily Match</Text>
              </View>
              <TouchableOpacity onPress={() => (router as any).push(`/profile/${dailyMatch.profileId}`)} activeOpacity={0.9}>
                <PremiumCard variant="highlight" style={styles.dailyMatchCard}>
                  <ProfileCard
                    profile={dailyMatch}
                    onPress={() => (router as any).push(`/profile/${dailyMatch.profileId}`)}
                    onInterest={() => handleInterestToggle(dailyMatch.profileId)}
                    onShortlist={() => handleShortlistToggle(dailyMatch.profileId)}
                    isInterestSent={sentInterests.includes(dailyMatch.profileId)}
                    isShortlisted={shortlistedIds.includes(dailyMatch.profileId)}
                    size="full"
                  />
                  <View style={styles.compatibilityReasonsBox}>
                    <Text style={styles.compatibilityReasonsTitle}>Why this match?</Text>
                    <View style={styles.reasonRow}>
                      <Ionicons name="checkmark-circle" size={16} color={Colors.gold} />
                      <Text style={styles.reasonText}>Both are from {dailyMatch.residentCity}</Text>
                    </View>
                    <View style={styles.reasonRow}>
                      <Ionicons name="checkmark-circle" size={16} color={Colors.gold} />
                      <Text style={styles.reasonText}>Matching educational background</Text>
                    </View>
                    <View style={styles.reasonRow}>
                      <Ionicons name="checkmark-circle" size={16} color={Colors.gold} />
                      <Text style={styles.reasonText}>High astrology compatibility</Text>
                    </View>
                  </View>
                </PremiumCard>
              </TouchableOpacity>
            </View>
          )}

          {renderHorizontalSection('Recommended For You', 'Curated profiles based on your preferences', recommendedProfiles.slice(1))}
          {renderHorizontalSection('100% Verified Profiles', 'Connect with authentic individuals', verifiedProfiles)}
          {renderHorizontalSection('Matches Nearby', 'Find someone closer to your home', nearbyProfiles)}

        </ScrollView>
      </SafeAreaView>
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
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.md,
  },
  brandCol: {
    flex: 1,
  },
  greetingText: {
    fontSize: Typography.sizes.xl,
    fontFamily: Typography.fontFamily.serif,
    color: Colors.text,
  },
  subGreetingText: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  headerIconBtn: {
    backgroundColor: Colors.surfaceGlass,
    borderRadius: BorderRadius.full,
    padding: Spacing.sm,
    position: 'relative',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  notifBadge: {
    position: 'absolute',
    top: 6,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primaryLight,
    borderWidth: 1,
    borderColor: Colors.surface,
  },
  scrollContent: {
    paddingBottom: Spacing['5xl'],
  },
  dailyMatchContainer: {
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.xl,
  },
  dailyMatchHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: Spacing.xs,
  },
  dailyMatchTitle: {
    fontSize: Typography.sizes.lg,
    fontFamily: Typography.fontFamily.serif,
    color: Colors.textGold,
  },
  dailyMatchCard: {
    padding: 2, // Slight padding so inner content sits well
  },
  compatibilityReasonsBox: {
    padding: Spacing.md,
    backgroundColor: Colors.surfaceWarm,
    borderRadius: BorderRadius.lg,
    marginTop: -Spacing.base, // Pull up to overlap slightly with the profile card if needed, or just let it sit below
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  compatibilityReasonsTitle: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.text,
    marginBottom: Spacing.sm,
  },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
    gap: Spacing.xs,
  },
  reasonText: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.textSecondary,
  },
  sectionContainer: {
    marginBottom: Spacing.xl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: Spacing.base,
    marginBottom: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.sizes.lg,
    fontFamily: Typography.fontFamily.serif,
    color: Colors.text,
  },
  sectionSubtitle: {
    fontSize: Typography.sizes.xs,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  seeAllText: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.primaryLight,
  },
  horizontalListContent: {
    paddingHorizontal: Spacing.base,
  }
});
