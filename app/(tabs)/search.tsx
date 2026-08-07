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

  // Filter States
  const [selectedMatchStatus, setSelectedMatchStatus] = useState<string>('All');
  const [selectedProfileFor, setSelectedProfileFor] = useState<string>('All');
  const [selectedReligion, setSelectedReligion] = useState<string>('All');
  const [selectedMotherTongue, setSelectedMotherTongue] = useState<string>('All');
  const [selectedCaste, setSelectedCaste] = useState<string>('All');
  const [selectedState, setSelectedState] = useState<string>('All');
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState<string>('All');
  const [selectedManglik, setSelectedManglik] = useState<string>('All');
  const [selectedDiet, setSelectedDiet] = useState<string>('All');
  const [selectedEmployment, setSelectedEmployment] = useState<string>('All');
  const [selectedEducation, setSelectedEducation] = useState<string>('All');
  const [selectedIncome, setSelectedIncome] = useState<string>('All');
  const [photoOnly, setPhotoOnly] = useState<boolean>(true);

  const shortlistedIds = state.shortlistedProfiles || [];
  const sentInterests = state.sentInterests || [];

  const quickFilters = ['All', 'Verified', 'Newspaper Ad', 'Rajput', 'Agarwal', 'Brahmin', 'Marwari', 'Jain'];

  // Count Active Custom Filters
  const activeFiltersCount = [
    selectedMatchStatus !== 'All',
    selectedProfileFor !== 'All',
    selectedReligion !== 'All',
    selectedMotherTongue !== 'All',
    selectedCaste !== 'All',
    selectedState !== 'All',
    selectedMaritalStatus !== 'All',
    selectedManglik !== 'All',
    selectedDiet !== 'All',
    selectedEmployment !== 'All',
    selectedEducation !== 'All',
    selectedIncome !== 'All',
    !photoOnly,
  ].filter(Boolean).length;

  const resetAllFilters = () => {
    setSelectedMatchStatus('All');
    setSelectedProfileFor('All');
    setSelectedReligion('All');
    setSelectedMotherTongue('All');
    setSelectedCaste('All');
    setSelectedState('All');
    setSelectedMaritalStatus('All');
    setSelectedManglik('All');
    setSelectedDiet('All');
    setSelectedEmployment('All');
    setSelectedEducation('All');
    setSelectedIncome('All');
    setPhotoOnly(true);
    setSelectedQuickFilter('All');
    setSearchQuery('');
  };

  const filteredProfiles = (profiles || []).filter((profile: Profile) => {
    // Quick filter check
    if (selectedQuickFilter === 'Verified' && !profile.isVerified) return false;
    if (selectedQuickFilter === 'Newspaper Ad' && !profile.isNewspaperAdLinked) return false;
    if (['Rajput', 'Agarwal', 'Brahmin', 'Marwari', 'Jain'].includes(selectedQuickFilter) && profile.caste !== selectedQuickFilter) return false;

    // Detailed Drawer Filters
    if (selectedMatchStatus === 'Verified' && !profile.isVerified) return false;
    if (selectedMatchStatus === 'Newspaper Ad' && !profile.isNewspaperAdLinked) return false;

    if (selectedProfileFor !== 'All' && profile.profileFor !== selectedProfileFor) return false;
    if (selectedReligion !== 'All' && profile.religion !== selectedReligion) return false;
    if (selectedMotherTongue !== 'All' && !profile.motherTongue?.includes(selectedMotherTongue)) return false;
    if (selectedCaste !== 'All' && profile.caste !== selectedCaste) return false;
    if (selectedState !== 'All' && profile.residentState !== selectedState) return false;
    if (selectedMaritalStatus !== 'All' && profile.maritalStatus !== selectedMaritalStatus) return false;
    if (selectedManglik !== 'All' && profile.manglikStatus !== selectedManglik) return false;
    if (selectedDiet !== 'All' && profile.diet !== selectedDiet) return false;
    if (selectedEmployment !== 'All' && profile.employmentType !== selectedEmployment) return false;
    if (selectedEducation !== 'All' && profile.education?.degree !== selectedEducation) return false;
    if (selectedIncome !== 'All' && profile.annualIncomeRange !== selectedIncome) return false;
    if (photoOnly && !profile.profilePhotoURL) return false;

    // Search text query
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
            <Text style={styles.filterBtnText}>
              Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
            </Text>
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

        {/* Results Counter & Reset Bar */}
        <View style={styles.counterRow}>
          <Text style={styles.counterText}>
            Showing <Text style={{ color: '#0D9488', fontWeight: '800' }}>{filteredProfiles.length}</Text> profiles
          </Text>

          {activeFiltersCount > 0 || searchQuery || selectedQuickFilter !== 'All' ? (
            <TouchableOpacity onPress={resetAllFilters}>
              <Text style={styles.resetText}>Clear All Filters</Text>
            </TouchableOpacity>
          ) : null}
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

        {/* Advanced Comprehensive Filters Modal */}
        <Modal visible={showFilterModal} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalGlassCard}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>All Search Filters</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <TouchableOpacity onPress={resetAllFilters}>
                    <Text style={styles.modalResetText}>Reset All</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                    <Ionicons name="close" size={24} color="#0F2E2B" />
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView style={{ maxHeight: 460 }} showsVerticalScrollIndicator={false}>
                {/* 1. Verification & Status */}
                <Text style={styles.filterSectionTitle}>Profile Verification & Status</Text>
                <View style={styles.modalChipsRow}>
                  {['All', 'Verified', 'Newspaper Ad'].map((s) => (
                    <TouchableOpacity
                      key={s}
                      style={[styles.modalChip, selectedMatchStatus === s && styles.modalChipActive]}
                      onPress={() => setSelectedMatchStatus(s)}
                    >
                      <Text style={[styles.modalChipText, selectedMatchStatus === s && styles.modalChipTextActive]}>{s}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 2. Profile Posted By */}
                <Text style={styles.filterSectionTitle}>Profile Posted By</Text>
                <View style={styles.modalChipsRow}>
                  {['All', 'Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Friend', 'Relative'].map((p) => (
                    <TouchableOpacity
                      key={p}
                      style={[styles.modalChip, selectedProfileFor === p && styles.modalChipActive]}
                      onPress={() => setSelectedProfileFor(p)}
                    >
                      <Text style={[styles.modalChipText, selectedProfileFor === p && styles.modalChipTextActive]}>{p}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 3. Religion */}
                <Text style={styles.filterSectionTitle}>Religion</Text>
                <View style={styles.modalChipsRow}>
                  {['All', 'Hindu', 'Jain', 'Sikh', 'Muslim', 'Christian', 'Other'].map((r) => (
                    <TouchableOpacity
                      key={r}
                      style={[styles.modalChip, selectedReligion === r && styles.modalChipActive]}
                      onPress={() => setSelectedReligion(r)}
                    >
                      <Text style={[styles.modalChipText, selectedReligion === r && styles.modalChipTextActive]}>{r}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 4. Mother Tongue */}
                <Text style={styles.filterSectionTitle}>Mother Tongue</Text>
                <View style={styles.modalChipsRow}>
                  {['All', 'Hindi', 'Marwari', 'Punjabi', 'Gujarati', 'Marathi', 'Tamil', 'English'].map((m) => (
                    <TouchableOpacity
                      key={m}
                      style={[styles.modalChip, selectedMotherTongue === m && styles.modalChipActive]}
                      onPress={() => setSelectedMotherTongue(m)}
                    >
                      <Text style={[styles.modalChipText, selectedMotherTongue === m && styles.modalChipTextActive]}>{m}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 5. Caste / Community */}
                <Text style={styles.filterSectionTitle}>Caste / Community</Text>
                <View style={styles.modalChipsRow}>
                  {['All', 'Rajput', 'Agarwal', 'Brahmin', 'Marwari', 'Jain', 'Sindhi', 'Jat', 'Gupta', 'Maheshwari'].map((c) => (
                    <TouchableOpacity
                      key={c}
                      style={[styles.modalChip, selectedCaste === c && styles.modalChipActive]}
                      onPress={() => setSelectedCaste(c)}
                    >
                      <Text style={[styles.modalChipText, selectedCaste === c && styles.modalChipTextActive]}>{c}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 6. Resident State */}
                <Text style={styles.filterSectionTitle}>Resident Location State</Text>
                <View style={styles.modalChipsRow}>
                  {['All', 'Rajasthan', 'Delhi', 'Maharashtra', 'Karnataka', 'Gujarat', 'Punjab', 'Uttar Pradesh'].map((st) => (
                    <TouchableOpacity
                      key={st}
                      style={[styles.modalChip, selectedState === st && styles.modalChipActive]}
                      onPress={() => setSelectedState(st)}
                    >
                      <Text style={[styles.modalChipText, selectedState === st && styles.modalChipTextActive]}>{st}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 7. Marital Status */}
                <Text style={styles.filterSectionTitle}>Marital Status</Text>
                <View style={styles.modalChipsRow}>
                  {['All', 'Never Married', 'Divorced', 'Widowed', 'Separated'].map((ms) => (
                    <TouchableOpacity
                      key={ms}
                      style={[styles.modalChip, selectedMaritalStatus === ms && styles.modalChipActive]}
                      onPress={() => setSelectedMaritalStatus(ms)}
                    >
                      <Text style={[styles.modalChipText, selectedMaritalStatus === ms && styles.modalChipTextActive]}>{ms}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 8. Manglik Status */}
                <Text style={styles.filterSectionTitle}>Manglik Status</Text>
                <View style={styles.modalChipsRow}>
                  {['All', 'Non-Manglik', 'Manglik', 'Partial Manglik'].map((mg) => (
                    <TouchableOpacity
                      key={mg}
                      style={[styles.modalChip, selectedManglik === mg && styles.modalChipActive]}
                      onPress={() => setSelectedManglik(mg)}
                    >
                      <Text style={[styles.modalChipText, selectedManglik === mg && styles.modalChipTextActive]}>{mg}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 9. Dietary Habits */}
                <Text style={styles.filterSectionTitle}>Dietary Habits</Text>
                <View style={styles.modalChipsRow}>
                  {['All', 'Vegetarian', 'Jain', 'Eggetarian', 'Non-Vegetarian'].map((d) => (
                    <TouchableOpacity
                      key={d}
                      style={[styles.modalChip, selectedDiet === d && styles.modalChipActive]}
                      onPress={() => setSelectedDiet(d)}
                    >
                      <Text style={[styles.modalChipText, selectedDiet === d && styles.modalChipTextActive]}>{d}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 10. Employment Type */}
                <Text style={styles.filterSectionTitle}>Employment Type</Text>
                <View style={styles.modalChipsRow}>
                  {['All', 'Private', 'Govt / Public', 'Business / Self-Employed', 'Defence', 'Civil Services'].map((emp) => (
                    <TouchableOpacity
                      key={emp}
                      style={[styles.modalChip, selectedEmployment === emp && styles.modalChipActive]}
                      onPress={() => setSelectedEmployment(emp)}
                    >
                      <Text style={[styles.modalChipText, selectedEmployment === emp && styles.modalChipTextActive]}>{emp}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 11. Highest Education */}
                <Text style={styles.filterSectionTitle}>Highest Education</Text>
                <View style={styles.modalChipsRow}>
                  {['All', 'B.Tech / B.E.', 'MBBS / MD', 'MBA / PGDM', 'B.Com / M.Com', 'B.Sc / M.Sc', 'CA / CS', 'PhD'].map((ed) => (
                    <TouchableOpacity
                      key={ed}
                      style={[styles.modalChip, selectedEducation === ed && styles.modalChipActive]}
                      onPress={() => setSelectedEducation(ed)}
                    >
                      <Text style={[styles.modalChipText, selectedEducation === ed && styles.modalChipTextActive]}>{ed}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 12. Annual Income */}
                <Text style={styles.filterSectionTitle}>Annual Income Range</Text>
                <View style={styles.modalChipsRow}>
                  {['All', 'Below 2L', '2-5L', '5-10L', '10-20L', '20-30L', '30-50L', '50L+'].map((inc) => (
                    <TouchableOpacity
                      key={inc}
                      style={[styles.modalChip, selectedIncome === inc && styles.modalChipActive]}
                      onPress={() => setSelectedIncome(inc)}
                    >
                      <Text style={[styles.modalChipText, selectedIncome === inc && styles.modalChipTextActive]}>{inc}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* 13. Photo Required */}
                <Text style={styles.filterSectionTitle}>Profile Photo Option</Text>
                <TouchableOpacity 
                  style={styles.photoToggleRow} 
                  onPress={() => setPhotoOnly(!photoOnly)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.photoToggleLabel}>Show profiles with photo only</Text>
                  <Ionicons 
                    name={photoOnly ? "checkbox" : "square-outline"} 
                    size={22} 
                    color={photoOnly ? "#0D9488" : "#8C9E9B"} 
                  />
                </TouchableOpacity>
              </ScrollView>

              <TouchableOpacity 
                style={styles.applyFilterBtn} 
                onPress={() => setShowFilterModal(false)}
                activeOpacity={0.88}
              >
                <Text style={styles.applyFilterText}>Apply Filters ({filteredProfiles.length} Matches)</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  counterText: {
    fontSize: 13,
    color: '#4A6B66',
    fontWeight: '600',
  },
  resetText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#E31E25',
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
    marginBottom: 14,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  modalResetText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#E31E25',
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
    marginBottom: 10,
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
  photoToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderRadius: 16,
    padding: 12,
    marginTop: 4,
    marginBottom: 12,
  },
  photoToggleLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F2E2B',
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
