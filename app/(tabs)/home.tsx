import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../../src/context/AppContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileCard from '../../src/components/ProfileCard';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';
import { Colors } from '../../src/constants/theme';

export default function HomeScreen() {
  const router = useRouter();
  const { state, dispatch, profiles } = useApp();

  const isShortlisted = (id: string) => state.shortlistedProfiles.includes(id);
  const isInterestSent = (id: string) => state.sentInterests.includes(id);

  const handlePress = (id: string) => router.push(`/profile/${id}`);
  const handleInterest = (id: string) => dispatch({ type: 'SEND_INTEREST', payload: id });
  const handleShortlist = (id: string) => dispatch({ type: 'TOGGLE_SHORTLIST', payload: id });

  // 1. Recommended for You (Female profiles from Rajasthan)
  const recommendedProfiles = profiles
    .filter((p) => p.gender === 'Female' && p.residentState === 'Rajasthan')
    .slice(0, 10);

  // 2. New Profiles
  const newProfiles = [...profiles]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  // 3. Verified Profiles
  const verifiedProfiles = profiles.filter((p) => p.isVerified).slice(0, 8);

  // 4. Nearby Profiles
  const nearbyProfiles = profiles
    .filter((p) => p.residentState === 'Rajasthan' && p.residentCity === 'Jaipur')
    .slice(0, 8);

  // 5. From Rajasthan Patrika Ads
  const newspaperProfiles = profiles.filter((p) => p.isNewspaperAdLinked).slice(0, 8);

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerBrandRow}>
        <PatrikaRibbonLogo size={32} />
        <Text style={styles.logoText}>Patrika Matrimony</Text>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={24} color="#200D08" />
          <View style={styles.badgeCount}>
            <Text style={styles.badgeCountText}>3</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(tabs)/profile')}>
          <Ionicons name="menu-outline" size={26} color="#200D08" />
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSectionHeader = (title: string, showSeeAll = false, icon?: React.ReactNode) => (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleRow}>
        {icon && <View style={styles.sectionIcon}>{icon}</View>}
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {showSeeAll && (
        <TouchableOpacity>
          <Text style={styles.seeAllText}>See All →</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Curated Royal Banner Header (Matching Reference Image 2 Text) */}
        <View style={styles.curatedBanner}>
          <Text style={styles.curatedSubtext}>Curated selections from esteemed families.</Text>
        </View>

        {/* Section 1: Recommended */}
        {renderSectionHeader('Recommended for You', true)}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={recommendedProfiles}
          keyExtractor={(item) => item.profileId}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProfileCard
                profile={item}
                size="full"
                onPress={() => handlePress(item.profileId)}
                onInterest={() => handleInterest(item.profileId)}
                onShortlist={() => handleShortlist(item.profileId)}
                isShortlisted={isShortlisted(item.profileId)}
                isInterestSent={isInterestSent(item.profileId)}
              />
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />

        {/* Section 2: New Profiles */}
        <View style={styles.sectionHeader}>
          <View style={styles.sectionTitleRow}>
            <View style={styles.newBadgeTag}>
              <Text style={styles.newBadgeTagText}>New</Text>
            </View>
            <Text style={styles.sectionTitle}>Profiles</Text>
          </View>
        </View>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={newProfiles}
          keyExtractor={(item) => item.profileId}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProfileCard
                profile={item}
                size="full"
                onPress={() => handlePress(item.profileId)}
                onInterest={() => handleInterest(item.profileId)}
                onShortlist={() => handleShortlist(item.profileId)}
                isShortlisted={isShortlisted(item.profileId)}
                isInterestSent={isInterestSent(item.profileId)}
              />
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />

        {/* Section 3: Verified Profiles */}
        {renderSectionHeader(
          'Royal Verified Profiles',
          false,
          <MaterialCommunityIcons name="check-decagram" size={20} color="#786C10" />
        )}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={verifiedProfiles}
          keyExtractor={(item) => item.profileId}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProfileCard
                profile={item}
                size="full"
                onPress={() => handlePress(item.profileId)}
                onInterest={() => handleInterest(item.profileId)}
                onShortlist={() => handleShortlist(item.profileId)}
                isShortlisted={isShortlisted(item.profileId)}
                isInterestSent={isInterestSent(item.profileId)}
              />
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />

        {/* Section 4: Nearby Profiles */}
        {renderSectionHeader(
          'Nearby Profiles',
          false,
          <Ionicons name="location-outline" size={20} color="#6B0000" />
        )}
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={nearbyProfiles}
          keyExtractor={(item) => item.profileId}
          renderItem={({ item }) => (
            <View style={styles.cardWrapper}>
              <ProfileCard
                profile={item}
                size="full"
                onPress={() => handlePress(item.profileId)}
                onInterest={() => handleInterest(item.profileId)}
                onShortlist={() => handleShortlist(item.profileId)}
                isShortlisted={isShortlisted(item.profileId)}
                isInterestSent={isInterestSent(item.profileId)}
              />
            </View>
          )}
          contentContainerStyle={styles.listContainer}
        />

        {/* Section 5: From Rajasthan Patrika Ads */}
        <View style={styles.patrikaSection}>
          {renderSectionHeader(
            '🗞️ From Rajasthan Patrika',
            false
          )}
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={newspaperProfiles}
            keyExtractor={(item) => item.profileId}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <ProfileCard
                  profile={item}
                  size="full"
                  onPress={() => handlePress(item.profileId)}
                  onInterest={() => handleInterest(item.profileId)}
                  onShortlist={() => handleShortlist(item.profileId)}
                  isShortlisted={isShortlisted(item.profileId)}
                  isInterestSent={isInterestSent(item.profileId)}
                />
              </View>
            )}
            contentContainerStyle={styles.listContainer}
          />
          <TouchableOpacity style={styles.linkAdBtn}>
            <Text style={styles.linkAdBtnText}>Link your newspaper ad →</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FAF6F0', // Warm Parchment Background (Matching Reference Image 2 & 3)
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFDF9',
    borderBottomWidth: 1,
    borderBottomColor: '#E2D7C7',
  },
  headerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#6B0000', // Royal Crimson Red
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconBtn: {
    marginLeft: 16,
    position: 'relative',
  },
  badgeCount: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: '#6B0000',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCountText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
  },
  scrollContent: {
    paddingVertical: 12,
  },
  curatedBanner: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  curatedSubtext: {
    fontSize: 14,
    color: '#8C7B6B',
    fontWeight: '600',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 6,
    marginTop: 14,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 19,
    fontWeight: '800',
    color: '#200D08', // Royal Dark Brown Headline
  },
  seeAllText: {
    fontSize: 14,
    color: '#6B0000',
    fontWeight: '700',
  },
  newBadgeTag: {
    backgroundColor: '#786C10',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 8,
  },
  newBadgeTagText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },
  listContainer: {
    paddingLeft: 4,
    paddingRight: 16,
  },
  cardWrapper: {
    marginHorizontal: 0,
  },
  patrikaSection: {
    backgroundColor: '#F5EFE6',
    paddingVertical: 14,
    marginTop: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#E2D7C7',
  },
  linkAdBtn: {
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#6B0000',
    borderRadius: 20,
  },
  linkAdBtnText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
  bottomPadding: {
    height: 40,
  },
});
