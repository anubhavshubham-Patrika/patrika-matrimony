import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp, Profile } from '../../src/context/AppContext';
import ProfileCard from '../../src/components/ProfileCard';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';
import MintGlassBackground from '../../src/components/MintGlassBackground';

export default function HomeScreen() {
  const router = useRouter();
  const { state, dispatch, profiles } = useApp();
  const [activeTabCategory, setActiveTabCategory] = useState<'Recommended' | 'Verified' | 'Nearby' | 'Ads'>('Recommended');

  const shortlistedIds = state.shortlistedProfiles || [];
  const sentInterests = state.sentInterests || [];

  const recommendedProfiles = profiles.slice(0, 10);
  const verifiedProfiles = profiles.filter((p: Profile) => p.isVerified).slice(0, 10);
  const nearbyProfiles = profiles.filter((p: Profile) => p.residentState === 'Rajasthan').slice(0, 10);
  const newspaperAdProfiles = profiles.filter((p: Profile) => p.isNewspaperAdLinked).slice(0, 10);

  const getActiveProfiles = () => {
    switch (activeTabCategory) {
      case 'Verified': return verifiedProfiles;
      case 'Nearby': return nearbyProfiles;
      case 'Ads': return newspaperAdProfiles;
      default: return recommendedProfiles;
    }
  };

  const handleInterestToggle = (profileId: string) => {
    dispatch({ type: 'SEND_INTEREST', payload: profileId });
  };

  const handleShortlistToggle = (profileId: string) => {
    dispatch({ type: 'TOGGLE_SHORTLIST', payload: profileId });
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header Bar */}
        <View style={styles.topHeader}>
          <View style={styles.brandCol}>
            <View style={styles.logoRow}>
              <PatrikaRibbonLogo size={28} />
              <Text style={styles.brandText}>Patrika Matrimony</Text>
            </View>
            <Text style={styles.brandTagline}>Find your perfect Rajasthan life partner</Text>
          </View>

          <View style={styles.headerRightActions}>
            <TouchableOpacity 
              style={styles.headerIconGlassBtn} 
              onPress={() => router.push('/subscription')}
              activeOpacity={0.8}
            >
              <MaterialCommunityIcons name="crown" size={18} color="#D4AF37" />
              <Text style={styles.upgradeText}>Upgrade</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.headerIconGlassBtn} activeOpacity={0.8}>
              <Ionicons name="notifications-outline" size={20} color="#0F2E2B" />
              <View style={styles.notifBadge} />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Glass Hero Banner Card */}
          <View style={styles.glassHeroCard}>
            <View style={styles.heroLeftCol}>
              <View style={styles.heroPillBadge}>
                <MaterialCommunityIcons name="shield-check-outline" size={14} color="#0D9488" style={{ marginRight: 4 }} />
                <Text style={styles.heroPillText}>Patrika Assured</Text>
              </View>
              <Text style={styles.heroTitle}>Discover 100% Verified Matches</Text>
              <Text style={styles.heroSub}>Connect with genuine Rajasthani brides & grooms</Text>

              <TouchableOpacity 
                style={styles.heroCtaBtn} 
                onPress={() => router.push('/(tabs)/search')}
                activeOpacity={0.88}
              >
                <Text style={styles.heroCtaText}>Explore Matches →</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Floating Category Filter Pills Row */}
          <View style={styles.categoryPillContainer}>
            {[
              { id: 'Recommended', label: 'For You', icon: 'sparkles' },
              { id: 'Verified', label: 'Verified', icon: 'shield-checkmark-outline' },
              { id: 'Nearby', label: 'Nearby', icon: 'location-outline' },
              { id: 'Ads', label: 'Paper Ads', icon: 'newspaper-outline' },
            ].map((cat) => {
              const isSel = activeTabCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[styles.categoryGlassPill, isSel && styles.categoryGlassPillActive]}
                  onPress={() => setActiveTabCategory(cat.id as any)}
                  activeOpacity={0.85}
                >
                  <Ionicons 
                    name={cat.icon as any} 
                    size={14} 
                    color={isSel ? '#FFFFFF' : '#0F2E2B'} 
                    style={{ marginRight: 5 }} 
                  />
                  <Text style={[styles.categoryPillText, isSel && styles.categoryPillTextActive]}>
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* Section Header */}
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text style={styles.sectionTitle}>{activeTabCategory} Matches</Text>
              <Text style={styles.sectionSub}>Showing curated profiles for you</Text>
            </View>

            <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
              <Text style={styles.seeAllText}>See All ({getActiveProfiles().length}) →</Text>
            </TouchableOpacity>
          </View>

          {/* Profiles Vertical List */}
          <View style={styles.profilesListWrapper}>
            {getActiveProfiles().map((profile: Profile) => (
              <ProfileCard
                key={profile.profileId}
                profile={profile}
                onPress={() => router.push(`/profile/${profile.profileId}`)}
                onInterest={() => handleInterestToggle(profile.profileId)}
                onShortlist={() => handleShortlistToggle(profile.profileId)}
                isInterestSent={sentInterests.includes(profile.profileId)}
                isShortlisted={shortlistedIds.includes(profile.profileId)}
              />
            ))}
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
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  brandCol: {
    flex: 1,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  brandTagline: {
    fontSize: 11,
    color: '#4A6B66',
    marginTop: 2,
  },
  headerRightActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerIconGlassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 18,
    paddingHorizontal: 10,
    paddingVertical: 6,
    position: 'relative',
  },
  upgradeText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#0F2E2B',
    marginLeft: 4,
  },
  notifBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#0D9488',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },

  glassHeroCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 18,
    marginVertical: 10,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  heroLeftCol: {
    alignItems: 'flex-start',
  },
  heroPillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 8,
  },
  heroPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0D9488',
  },
  heroTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
    marginBottom: 4,
  },
  heroSub: {
    fontSize: 13,
    color: '#4A6B66',
    marginBottom: 14,
  },
  heroCtaBtn: {
    backgroundColor: '#0F2E2B',
    borderRadius: 20,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  heroCtaText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '800',
  },

  categoryPillContainer: {
    flexDirection: 'row',
    gap: 8,
    marginVertical: 10,
  },
  categoryGlassPill: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 18,
    paddingVertical: 9,
  },
  categoryGlassPillActive: {
    backgroundColor: '#0F2E2B',
    borderColor: '#0F2E2B',
  },
  categoryPillText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F2E2B',
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
  },

  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  sectionSub: {
    fontSize: 12,
    color: '#4A6B66',
    marginTop: 2,
  },
  seeAllText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0D9488',
  },

  profilesListWrapper: {
    marginTop: 6,
  },
});
