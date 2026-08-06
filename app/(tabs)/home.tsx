import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, 
  SafeAreaView, Platform, StatusBar, Image, Modal 
} from 'react-native';
import { useRouter } from 'expo-router';
import { useApp } from '../../src/context/AppContext';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import ProfileCard from '../../src/components/ProfileCard';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';

export default function HomeScreen() {
  const router = useRouter();
  const { state, dispatch, profiles } = useApp();

  // Search Bar Filter state
  const [ageRange, setAgeRange] = useState('25 - 35');
  const [location, setLocation] = useState('Jaipur');
  const [community, setCommunity] = useState('Any');
  const [profession, setProfession] = useState('Any');

  // Filter Modals state
  const [activeModal, setActiveModal] = useState<'age' | 'location' | 'community' | 'profession' | null>(null);

  const ageOptions = ['18 - 25', '25 - 35', '35 - 45', '45+', 'Any'];
  const locationOptions = ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Delhi NCR', 'Mumbai', 'Bengaluru', 'Any'];
  const communityOptions = ['Rajput', 'Agarwal', 'Brahmin', 'Marwari', 'Jain', 'Sindhi', 'Sikh', 'Muslim', 'Any'];
  const professionOptions = ['Engineering / IT', 'Medical / Healthcare', 'Government / Public', 'Business / Self-Employed', 'Finance / Banking', 'Civil Services', 'Any'];

  const isShortlisted = (id: string) => state.shortlistedProfiles.includes(id);
  const isInterestSent = (id: string) => state.sentInterests.includes(id);

  const handlePress = (id: string) => router.push(`/profile/${id}`);
  const handleInterest = (id: string) => dispatch({ type: 'SEND_INTEREST', payload: id });
  const handleShortlist = (id: string) => dispatch({ type: 'TOGGLE_SHORTLIST', payload: id });

  const handleStartMatching = () => {
    router.push({
      pathname: '/(tabs)/search',
      params: { ageRange, location, community, profession },
    });
  };

  // Filter profiles for sections
  const featuredProfiles = profiles.slice(0, 10);
  const verifiedProfiles = profiles.filter((p) => p.isVerified).slice(0, 8);

  // AI-Selected Compatible Profiles
  const aiSelectedProfiles = [
    {
      id: profiles[1]?.profileId || 'P002',
      name: profiles[1]?.name || 'Kavya R.',
      age: profiles[1]?.age || 31,
      badge: 'Highly Compatible',
      photo: profiles[1]?.profilePhotoURL || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: profiles[2]?.profileId || 'P003',
      name: profiles[2]?.name || 'Vikram S.',
      age: profiles[2]?.age || 33,
      badge: 'Shared Values',
      photo: profiles[2]?.profilePhotoURL || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&auto=format&fit=crop&q=80',
    },
    {
      id: profiles[3]?.profileId || 'P004',
      name: profiles[3]?.name || 'Nisha K.',
      age: profiles[3]?.age || 29,
      badge: 'Family-Oriented',
      photo: profiles[3]?.profilePhotoURL || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&auto=format&fit=crop&q=80',
    },
  ];

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerBrandRow}>
        <PatrikaRibbonLogo size={32} />
        <Text style={styles.logoText}>Patrika Matrimony</Text>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconBtn}>
          <Ionicons name="notifications-outline" size={24} color="#2C1A1D" />
          <View style={styles.badgeCount}>
            <Text style={styles.badgeCountText}>3</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconBtn} onPress={() => router.push('/(tabs)/profile')}>
          <Ionicons name="menu-outline" size={26} color="#2C1A1D" />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      {renderHeader()}

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Title Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>Find someone who{'\n'}truly understands you</Text>
          <Text style={styles.heroSubtitle}>Where meaningful connections begin</Text>

          {/* Quick Match Floating Filter Card */}
          <View style={styles.searchCard}>
            <View style={styles.searchCardHeader}>
              <Ionicons name="search-outline" size={16} color="#C2185B" style={{ marginRight: 6 }} />
              <Text style={styles.searchCardTitle}>Refine your search</Text>
            </View>

            <View style={styles.filterGrid}>
              {/* Age Range Picker Box */}
              <TouchableOpacity 
                style={styles.filterBox} 
                onPress={() => setActiveModal('age')}
                activeOpacity={0.85}
              >
                <Text style={styles.filterLabel}>Age Range</Text>
                <View style={styles.filterDropdown}>
                  <Text style={styles.filterValue}>{ageRange}</Text>
                  <Ionicons name="chevron-down" size={16} color="#C2185B" />
                </View>
              </TouchableOpacity>

              {/* Location Picker Box */}
              <TouchableOpacity 
                style={styles.filterBox} 
                onPress={() => setActiveModal('location')}
                activeOpacity={0.85}
              >
                <Text style={styles.filterLabel}>Location</Text>
                <View style={styles.filterDropdown}>
                  <Text style={styles.filterValue} numberOfLines={1}>{location}</Text>
                  <Ionicons name="chevron-down" size={16} color="#C2185B" />
                </View>
              </TouchableOpacity>

              {/* Community Picker Box */}
              <TouchableOpacity 
                style={styles.filterBox} 
                onPress={() => setActiveModal('community')}
                activeOpacity={0.85}
              >
                <Text style={styles.filterLabel}>Community</Text>
                <View style={styles.filterDropdown}>
                  <Text style={styles.filterValue} numberOfLines={1}>{community}</Text>
                  <Ionicons name="chevron-down" size={16} color="#C2185B" />
                </View>
              </TouchableOpacity>

              {/* Profession Picker Box */}
              <TouchableOpacity 
                style={styles.filterBox} 
                onPress={() => setActiveModal('profession')}
                activeOpacity={0.85}
              >
                <Text style={styles.filterLabel}>Profession</Text>
                <View style={styles.filterDropdown}>
                  <Text style={styles.filterValue} numberOfLines={1}>{profession}</Text>
                  <Ionicons name="chevron-down" size={16} color="#C2185B" />
                </View>
              </TouchableOpacity>
            </View>

            {/* Start Matching Button */}
            <TouchableOpacity 
              style={styles.startMatchingBtn} 
              onPress={handleStartMatching}
              activeOpacity={0.88}
            >
              <Text style={styles.startMatchingBtnText}>Start Matching →</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Featured Matches Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Matches</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={featuredProfiles}
          keyExtractor={(item) => item.profileId}
          renderItem={({ item }) => (
            <ProfileCard
              profile={item}
              size="full"
              onPress={() => handlePress(item.profileId)}
              onInterest={() => handleInterest(item.profileId)}
              onShortlist={() => handleShortlist(item.profileId)}
              isShortlisted={isShortlisted(item.profileId)}
              isInterestSent={isInterestSent(item.profileId)}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />

        {/* AI-Selected for You Section */}
        <View style={styles.aiContainer}>
          <View style={styles.aiHeader}>
            <Ionicons name="sparkles" size={20} color="#C2185B" style={{ marginRight: 6 }} />
            <Text style={styles.aiTitle}>AI-Selected for You</Text>
          </View>
          <Text style={styles.aiSubtitle}>Deeper compatibility analysis based on your preferences and values</Text>

          <View style={styles.aiGrid}>
            {aiSelectedProfiles.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.aiCard}
                onPress={() => handlePress(item.id)}
                activeOpacity={0.88}
              >
                <Image source={{ uri: item.photo }} style={styles.aiPhoto} />
                <View style={styles.aiBadgeTag}>
                  <Text style={styles.aiBadgeTagText} numberOfLines={1}>{item.badge}</Text>
                </View>
                <Text style={styles.aiName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.aiAge}>{item.age} years</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Verified Profiles Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Verified Profiles</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/search')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={verifiedProfiles}
          keyExtractor={(item) => item.profileId}
          renderItem={({ item }) => (
            <ProfileCard
              profile={item}
              size="full"
              onPress={() => handlePress(item.profileId)}
              onInterest={() => handleInterest(item.profileId)}
              onShortlist={() => handleShortlist(item.profileId)}
              isShortlisted={isShortlisted(item.profileId)}
              isInterestSent={isInterestSent(item.profileId)}
            />
          )}
          contentContainerStyle={styles.listContainer}
        />

        {/* Success Stories Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Success Stories</Text>
        </View>

        <View style={styles.storyCard}>
          <View style={styles.storyContent}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=600&auto=format&fit=crop&q=80' }}
              style={styles.storyPhoto}
            />
            <View style={styles.storyTextContainer}>
              <Text style={styles.storyQuote}>
                "We found each other when it mattered most. Patrika Matrimony gave us a beautiful path to lifelong happiness."
              </Text>
              <Text style={styles.storyAuthor}>Meera & Rajesh</Text>
              <Text style={styles.storyDate}>Married in December 2025</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.readMoreBtn}>
            <Text style={styles.readMoreBtnText}>Read More Stories ›</Text>
          </TouchableOpacity>
        </View>

        {/* Why Trust Us Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Why Trust Us</Text>
        </View>

        <View style={styles.trustContainer}>
          <View style={styles.trustItem}>
            <View style={styles.trustIconBox}>
              <MaterialCommunityIcons name="shield-check-outline" size={24} color="#C2185B" />
            </View>
            <View style={styles.trustTextCol}>
              <Text style={styles.trustTitle}>Verified Profiles</Text>
              <Text style={styles.trustDesc}>Every profile is manually verified for authentic connections</Text>
            </View>
          </View>

          <View style={styles.trustItem}>
            <View style={styles.trustIconBox}>
              <MaterialCommunityIcons name="lock-outline" size={24} color="#C2185B" />
            </View>
            <View style={styles.trustTextCol}>
              <Text style={styles.trustTitle}>Privacy First</Text>
              <Text style={styles.trustDesc}>Your contact data and photo access remain 100% secure</Text>
            </View>
          </View>

          <View style={styles.trustItem}>
            <View style={styles.trustIconBox}>
              <MaterialCommunityIcons name="account-group-outline" size={24} color="#C2185B" />
            </View>
            <View style={styles.trustTextCol}>
              <Text style={styles.trustTitle}>Serious Members</Text>
              <Text style={styles.trustDesc}>Quality matches focused on marriage and family values</Text>
            </View>
          </View>
        </View>

        <View style={styles.bottomPadding} />
      </ScrollView>

      {/* Filter Selection Modals */}
      <Modal visible={activeModal !== null} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>
                Select {activeModal === 'age' ? 'Age Range' : activeModal === 'location' ? 'Location' : activeModal === 'community' ? 'Community' : 'Profession'}
              </Text>
              <TouchableOpacity onPress={() => setActiveModal(null)}>
                <Ionicons name="close" size={24} color="#2C1A1D" />
              </TouchableOpacity>
            </View>

            <ScrollView style={{ maxHeight: 320 }}>
              {(activeModal === 'age' ? ageOptions : activeModal === 'location' ? locationOptions : activeModal === 'community' ? communityOptions : professionOptions).map((opt) => {
                const isSelected = 
                  (activeModal === 'age' && ageRange === opt) ||
                  (activeModal === 'location' && location === opt) ||
                  (activeModal === 'community' && community === opt) ||
                  (activeModal === 'profession' && profession === opt);
                
                return (
                  <TouchableOpacity
                    key={opt}
                    style={[styles.modalOptionItem, isSelected && styles.modalOptionSelected]}
                    onPress={() => {
                      if (activeModal === 'age') setAgeRange(opt);
                      if (activeModal === 'location') setLocation(opt);
                      if (activeModal === 'community') setCommunity(opt);
                      if (activeModal === 'profession') setProfession(opt);
                      setActiveModal(null);
                    }}
                  >
                    <Text style={[styles.modalOptionText, isSelected && styles.modalOptionTextSelected]}>{opt}</Text>
                    {isSelected && <Ionicons name="checkmark" size={20} color="#C2185B" />}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF9F6',
    paddingTop: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
  },
  headerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#C2185B',
    fontFamily: 'serif',
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
    backgroundColor: '#C2185B',
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
  heroSection: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
    lineHeight: 36,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#8C7A7C',
    fontWeight: '500',
    marginTop: 6,
    marginBottom: 20,
  },
  searchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EFE6DD',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  searchCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  searchCardTitle: {
    fontSize: 14,
    fontWeight: '800',
    color: '#2C1A1D',
  },
  filterGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 18,
  },
  filterBox: {
    width: '47%',
  },
  filterLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#8C7A7C',
    marginBottom: 4,
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FAF5F7',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  filterValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#2C1A1D',
  },
  startMatchingBtn: {
    backgroundColor: '#C2185B',
    borderRadius: 20,
    paddingVertical: 15,
    alignItems: 'center',
    shadowColor: '#C2185B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  startMatchingBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
  },
  viewAllText: {
    fontSize: 13,
    color: '#C2185B',
    fontWeight: '800',
  },
  listContainer: {
    paddingLeft: 8,
    paddingRight: 16,
  },

  // AI-Selected Section
  aiContainer: {
    backgroundColor: '#FFF0F3',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 10,
    padding: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FFD6DF',
  },
  aiHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  aiTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
  },
  aiSubtitle: {
    fontSize: 12,
    color: '#5A4A4D',
    marginTop: 4,
    marginBottom: 16,
    lineHeight: 18,
  },
  aiGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  aiCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  aiPhoto: {
    width: '100%',
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },
  aiBadgeTag: {
    backgroundColor: '#FFF0F3',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
    maxWidth: '100%',
  },
  aiBadgeTagText: {
    fontSize: 9,
    fontWeight: '800',
    color: '#C2185B',
    textAlign: 'center',
  },
  aiName: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
  },
  aiAge: {
    fontSize: 11,
    color: '#8C7A7C',
  },

  // Success Stories
  storyCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  storyContent: {
    flexDirection: 'row',
    gap: 14,
    marginBottom: 14,
  },
  storyPhoto: {
    width: 80,
    height: 80,
    borderRadius: 14,
  },
  storyTextContainer: {
    flex: 1,
  },
  storyQuote: {
    fontSize: 12,
    color: '#5A4A4D',
    lineHeight: 18,
    fontStyle: 'italic',
    marginBottom: 6,
  },
  storyAuthor: {
    fontSize: 13,
    fontWeight: '800',
    color: '#2C1A1D',
  },
  storyDate: {
    fontSize: 11,
    color: '#8C7A7C',
  },
  readMoreBtn: {
    backgroundColor: '#FAF5F7',
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  readMoreBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#C2185B',
  },

  // Why Trust Us Section
  trustContainer: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE6DD',
    gap: 12,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trustIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#FFF0F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustTextCol: {
    flex: 1,
  },
  trustTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2C1A1D',
  },
  trustDesc: {
    fontSize: 12,
    color: '#8C7A7C',
    marginTop: 2,
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(44,26,29,0.6)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
  },
  modalOptionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderColor: '#EFE6DD',
  },
  modalOptionSelected: {
    backgroundColor: '#FFF0F3',
  },
  modalOptionText: {
    fontSize: 15,
    color: '#2C1A1D',
  },
  modalOptionTextSelected: {
    color: '#C2185B',
    fontWeight: '800',
  },

  bottomPadding: {
    height: 40,
  },
});
