import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, Modal, ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp, Profile } from '../../src/context/AppContext';
import ProfileCard from '../../src/components/ProfileCard';
import MintGlassBackground from '../../src/components/MintGlassBackground';

export default function SearchScreen() {
  const router = useRouter();
  const { state, dispatch, profiles } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuickFilter, setSelectedQuickFilter] = useState<string>('All');
  const [showFilterModal, setShowFilterModal] = useState(false);

  const [selectedReligion, setSelectedReligion] = useState<string>('All');
  const [selectedCaste, setSelectedCaste] = useState<string>('All');
  const [photoOnly, setPhotoOnly] = useState<boolean>(true);

  const shortlistedIds = state.shortlistedProfiles || [];
  const sentInterests = state.sentInterests || [];

  const quickFilters = ['All', 'Verified', 'Newspaper Ad', 'Rajput', 'Agarwal', 'Brahmin', 'Marwari', 'Jain'];

  const filteredProfiles = (profiles || []).filter((profile: Profile) => {
    if (selectedQuickFilter === 'Verified' && !profile.isVerified) return false;
    if (selectedQuickFilter === 'Newspaper Ad' && !profile.isNewspaperAdLinked) return false;
    if (['Rajput', 'Agarwal', 'Brahmin', 'Marwari', 'Jain'].includes(selectedQuickFilter) && profile.caste !== selectedQuickFilter) return false;

    if (selectedReligion !== 'All' && profile.religion !== selectedReligion) return false;
    if (selectedCaste !== 'All' && profile.caste !== selectedCaste) return false;
    if (photoOnly && !profile.profilePhotoURL) return false;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchName = profile.name?.toLowerCase().includes(q);
      const matchCaste = profile.caste?.toLowerCase().includes(q);
      const matchCity = profile.residentCity?.toLowerCase().includes(q);
      const matchOccupation = profile.occupation?.toLowerCase().includes(q);
      return matchName || matchCaste || matchCity || matchOccupation;
    }

    return true;
  });

  const handleInterestToggle = (profileId: string) => {
    dispatch({ type: 'SEND_INTEREST', payload: profileId });
  };

  const handleShortlistToggle = (profileId: string) => {
    dispatch({ type: 'TOGGLE_SHORTLIST', payload: profileId });
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          <Text style={styles.headerTitle}>Find Matches</Text>
          <TouchableOpacity 
            style={styles.filterGlassBtn} 
            onPress={() => setShowFilterModal(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="options-outline" size={18} color="#0F2E2B" style={{ marginRight: 5 }} />
            <Text style={styles.filterBtnText}>Filters</Text>
          </TouchableOpacity>
        </View>

        {/* Search Bar Input */}
        <View style={styles.searchBarGlassWrapper}>
          <Ionicons name="search-outline" size={20} color="#0D9488" style={{ marginRight: 10 }} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name, caste, city, or occupation..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8C9E9B"
          />
          {searchQuery ? (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={18} color="#8C9E9B" />
            </TouchableOpacity>
          ) : null}
        </View>

        {/* Quick Filter Chips Horizontal Scroll */}
        <View style={{ height: 42, marginBottom: 12 }}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.quickFilterScroll}>
            {quickFilters.map((chip) => {
              const isSel = selectedQuickFilter === chip;
              return (
                <TouchableOpacity
                  key={chip}
                  style={[styles.quickFilterChip, isSel && styles.quickFilterChipActive]}
                  onPress={() => setSelectedQuickFilter(chip)}
                  activeOpacity={0.85}
                >
                  <Text style={[styles.quickFilterText, isSel && styles.quickFilterTextActive]}>{chip}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Results Counter Bar */}
        <View style={styles.counterRow}>
          <Text style={styles.counterText}>
            Showing <Text style={{ color: '#0D9488', fontWeight: '800' }}>{filteredProfiles.length}</Text> profiles
          </Text>
        </View>

        {/* Profiles List */}
        <FlatList
          data={filteredProfiles}
          keyExtractor={(item) => item.profileId}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProfileCard
              profile={item}
              size="compact"
              onPress={() => router.push(`/profile/${item.profileId}`)}
              onInterest={() => handleInterestToggle(item.profileId)}
              onShortlist={() => handleShortlistToggle(item.profileId)}
              isInterestSent={sentInterests.includes(item.profileId)}
              isShortlisted={shortlistedIds.includes(item.profileId)}
            />
          )}
        />

        {/* Advanced Filters Modal */}
        <Modal visible={showFilterModal} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalGlassCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Filter Matches</Text>
                <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                  <Ionicons name="close" size={24} color="#0F2E2B" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 380 }}>
                <Text style={styles.filterSectionTitle}>Religion</Text>
                <View style={styles.modalChipsRow}>
                  {['All', 'Hindu', 'Jain', 'Sikh', 'Muslim'].map((r) => (
                    <TouchableOpacity
                      key={r}
                      style={[styles.modalChip, selectedReligion === r && styles.modalChipActive]}
                      onPress={() => setSelectedReligion(r)}
                    >
                      <Text style={[styles.modalChipText, selectedReligion === r && styles.modalChipTextActive]}>{r}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.filterSectionTitle}>Caste / Community</Text>
                <View style={styles.modalChipsRow}>
                  {['All', 'Rajput', 'Agarwal', 'Brahmin', 'Marwari', 'Jain'].map((c) => (
                    <TouchableOpacity
                      key={c}
                      style={[styles.modalChip, selectedCaste === c && styles.modalChipActive]}
                      onPress={() => setSelectedCaste(c)}
                    >
                      <Text style={[styles.modalChipText, selectedCaste === c && styles.modalChipTextActive]}>{c}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <TouchableOpacity 
                style={styles.applyFilterBtn} 
                onPress={() => setShowFilterModal(false)}
                activeOpacity={0.88}
              >
                <Text style={styles.applyFilterText}>Apply Filters</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  filterGlassBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 18,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  filterBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F2E2B',
  },

  searchBarGlassWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    marginHorizontal: 16,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#0F2E2B',
  },

  quickFilterScroll: {
    paddingHorizontal: 16,
    gap: 8,
    alignItems: 'center',
  },
  quickFilterChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 7,
  },
  quickFilterChipActive: {
    backgroundColor: '#0F2E2B',
    borderColor: '#0F2E2B',
  },
  quickFilterText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F2E2B',
  },
  quickFilterTextActive: {
    color: '#FFFFFF',
  },

  counterRow: {
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  counterText: {
    fontSize: 13,
    color: '#4A6B66',
    fontWeight: '600',
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalGlassCard: {
    backgroundColor: '#F3FAF8',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  filterSectionTitle: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F2E2B',
    marginTop: 12,
    marginBottom: 8,
  },
  modalChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  modalChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1,
    borderColor: 'rgba(15, 46, 43, 0.15)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  modalChipActive: {
    backgroundColor: '#0F2E2B',
    borderColor: '#0F2E2B',
  },
  modalChipText: {
    fontSize: 12,
    color: '#0F2E2B',
    fontWeight: '600',
  },
  modalChipTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  applyFilterBtn: {
    backgroundColor: '#0F2E2B',
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 14,
  },
  applyFilterText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
