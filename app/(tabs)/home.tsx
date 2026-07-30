import React from 'react';
import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, SafeAreaView, Platform, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../../src/context/AppContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileCard from '../../src/components/ProfileCard';

export default function HomeScreen() {
  const router = useRouter();
  const { state, dispatch, profiles } = useApp();

  // Demo user data handling:
  // "Profile to use for demo user filter: profileId P001 (Male, Jaipur, Hindu Rajput)"
  const demoUser = profiles.find((p) => p.profileId === 'P001');

  // Helper for checking shortlists and interests
  const isShortlisted = (id: string) => state.shortlistedProfiles.includes(id);
  const isInterestSent = (id: string) => state.sentInterests.includes(id);

  const handlePress = (id: string) => router.push(`/profile/${id}`);
  const handleInterest = (id: string) => dispatch({ type: 'SEND_INTEREST', payload: id });
  const handleShortlist = (id: string) => dispatch({ type: 'TOGGLE_SHORTLIST', payload: id });

  // 1. Recommended for You (Female profiles from Rajasthan)
  const recommendedProfiles = profiles
    .filter((p) => p.gender === 'Female' && p.residentState === 'Rajasthan')
    .slice(0, 10);

  // 2. New Profiles (Mocked by taking first 8 profiles or sorting by createdAt)
  const newProfiles = [...profiles]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 8);

  // 3. Verified Profiles
  const verifiedProfiles = profiles.filter((p) => p.isVerified).slice(0, 8);

  // 4. Nearby Profiles (Rajasthan/Jaipur)
  const nearbyProfiles = profiles
    .filter((p) => p.residentState === 'Rajasthan' && p.residentCity === 'Jaipur')
    .slice(0, 8);

  // 5. From Rajasthan Patrika Ads
  const newspaperProfiles = profiles.filter((p) => p.isNewspaperAdLinked).slice(0, 8);

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.logoText}>Patrika Matrimony</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={24} color="#333" />
          <View style={styles.badgeCount}>
            <Text style={styles.badgeCountText}>3</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="menu-outline" size={26} color="#333" />
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
          <Text style={styles.seeAllText}>See All</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderHeader()}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
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
          'Verified Profiles',
          false,
          <MaterialCommunityIcons name="check-decagram" size={20} color="#10B981" />
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
          <Ionicons name="location-outline" size={20} color="#E31837" />
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
    backgroundColor: '#f8f9fa',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  logoText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#E31837',
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
    backgroundColor: '#E31837',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeCountText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  scrollContent: {
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
    marginTop: 16,
  },
  sectionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionIcon: {
    marginRight: 6,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    fontSize: 14,
    color: '#E31837',
    fontWeight: '600',
  },
  newBadgeTag: {
    backgroundColor: '#8B5CF6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginRight: 6,
  },
  newBadgeTagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContainer: {
    paddingLeft: 4,
    paddingRight: 16,
  },
  cardWrapper: {
    // Override margins on ProfileCard to fit better in FlatList
    marginHorizontal: 0,
  },
  patrikaSection: {
    backgroundColor: '#E8F0FE', // Light blue background for newspaper section
    paddingVertical: 10,
    marginTop: 20,
  },
  linkAdBtn: {
    alignSelf: 'center',
    marginTop: 12,
    marginBottom: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#3B82F6',
    borderRadius: 8,
  },
  linkAdBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  bottomPadding: {
    height: 40,
  },
});
