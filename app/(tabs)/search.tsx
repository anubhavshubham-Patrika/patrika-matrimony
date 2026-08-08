import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, SafeAreaView, Modal, ScrollView, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useApp, Profile } from '../../src/context/AppContext';
import ProfileCard from '../../src/components/ProfileCard';
import PremiumButton from '../../src/components/ui/PremiumButton';
import PremiumCard from '../../src/components/ui/PremiumCard';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';

const TOP_TABS = ['For You', 'New', 'Compatible', 'Nearby'];

export default function SearchScreen() {
  const router = useRouter();
  const { state, dispatch, profiles } = useApp();

  const [activeTab, setActiveTab] = useState('For You');
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
    if (selectedQuickFilter === 'Verified' && !profile.isVerified) return false;
    if (selectedQuickFilter === 'Newspaper Ad' && !profile.isNewspaperAdLinked) return false;
    if (['Rajput', 'Agarwal', 'Brahmin', 'Marwari', 'Jain'].includes(selectedQuickFilter) && profile.caste !== selectedQuickFilter) return false;

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
    <LinearGradient colors={Colors.gradient.background as any} style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Matches</Text>
          <TouchableOpacity 
            style={styles.filterBtn} 
            onPress={() => setShowFilterModal(true)}
            activeOpacity={0.8}
          >
            <Ionicons name="options-outline" size={18} color={Colors.primaryDark} style={{ marginRight: 6 }} />
            <Text style={styles.filterBtnText}>
              Filters {activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Top Tabs */}
        <View style={styles.tabContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
            {TOP_TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <TouchableOpacity
                  key={tab}
                  style={[styles.tabBtn, isActive && styles.tabBtnActive]}
                  onPress={() => setActiveTab(tab)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.tabText, isActive && styles.tabTextActive]}>{tab}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Search */}
        <PremiumCard variant="glass" style={styles.searchCard} noPadding>
          <View style={styles.searchWrapper}>
            <Ionicons name="search-outline" size={20} color={Colors.textMuted} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search by name, caste, city..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={Colors.textMuted}
            />
            {searchQuery ? (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={18} color={Colors.textMuted} />
              </TouchableOpacity>
            ) : null}
          </View>
        </PremiumCard>

        {/* Quick Filters */}
        <View style={{ height: 44, marginBottom: Spacing.sm }}>
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

        {/* Results Info */}
        <View style={styles.counterRow}>
          <Text style={styles.counterText}>
            Showing <Text style={{ color: Colors.primaryDark, fontWeight: '700' }}>{filteredProfiles.length}</Text> matches
          </Text>
          {(activeFiltersCount > 0 || searchQuery || selectedQuickFilter !== 'All') && (
            <TouchableOpacity onPress={resetAllFilters}>
              <Text style={styles.resetText}>Clear All</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* List */}
        <FlatList
          data={filteredProfiles}
          keyExtractor={(item) => item.profileId}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <ProfileCard
              profile={item}
              size="full"
              onPress={() => router.push(`/profile/${item.profileId}`)}
              onInterest={() => handleInterestToggle(item.profileId)}
              onShortlist={() => handleShortlistToggle(item.profileId)}
              isInterestSent={sentInterests.includes(item.profileId)}
              isShortlisted={shortlistedIds.includes(item.profileId)}
            />
          )}
        />

        {/* Modal */}
        <Modal visible={showFilterModal} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalContent}>
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Search Filters</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: Spacing.md }}>
                  <TouchableOpacity onPress={resetAllFilters}>
                    <Text style={styles.modalResetText}>Reset</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowFilterModal(false)}>
                    <Ionicons name="close" size={26} color={Colors.primaryDark} />
                  </TouchableOpacity>
                </View>
              </View>

              <ScrollView style={{ maxHeight: 500 }} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: Spacing.xl }}>
                
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

                {/* 2. Religion */}
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

                {/* 3. Mother Tongue */}
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

                {/* 4. Caste / Community */}
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

                {/* 5. Resident State */}
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

                {/* 6. Marital Status */}
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

                {/* 7. Employment Type */}
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

                {/* 8. Highest Education */}
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

                {/* 9. Annual Income */}
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

                {/* Photo Required */}
                <Text style={styles.filterSectionTitle}>Profile Photo Option</Text>
                <TouchableOpacity 
                  style={styles.photoToggleRow} 
                  onPress={() => setPhotoOnly(!photoOnly)}
                  activeOpacity={0.8}
                >
                  <Text style={styles.photoToggleLabel}>Show profiles with photo only</Text>
                  <Ionicons 
                    name={photoOnly ? "checkbox" : "square-outline"} 
                    size={24} 
                    color={photoOnly ? Colors.primary : Colors.textMuted} 
                  />
                </TouchableOpacity>

              </ScrollView>

              <PremiumButton 
                title={`Apply Filters (${filteredProfiles.length} Matches)`} 
                onPress={() => setShowFilterModal(false)}
                variant="premium"
                style={{ marginTop: Spacing.md }}
              />
            </View>
          </View>
        </Modal>

      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  headerTitle: {
    fontSize: Typography.sizes['2xl'],
    fontFamily: Typography.fontFamily.serif,
    color: Colors.primaryDark,
  },
  filterBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceGlass,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Shadow.sm,
  },
  filterBtnText: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.primaryDark,
  },

  tabContainer: {
    marginVertical: Spacing.sm,
  },
  tabScroll: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
  },
  tabBtn: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: 10,
    borderRadius: BorderRadius.pill,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabBtnActive: {
    backgroundColor: Colors.surface,
    borderColor: Colors.goldLight,
    ...Shadow.sm,
  },
  tabText: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sansMedium,
    color: Colors.textSecondary,
  },
  tabTextActive: {
    color: Colors.primaryDark,
    fontFamily: Typography.fontFamily.sansBold,
  },

  searchCard: {
    marginHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: Spacing.sm,
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.text,
  },

  quickFilterScroll: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.sm,
    alignItems: 'center',
  },
  quickFilterChip: {
    backgroundColor: Colors.surfaceGlass,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
  },
  quickFilterChipActive: {
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryDark,
  },
  quickFilterText: {
    fontSize: Typography.sizes.xs,
    fontFamily: Typography.fontFamily.sansMedium,
    color: Colors.primaryDark,
  },
  quickFilterTextActive: {
    color: Colors.surface,
  },

  counterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.sm,
  },
  counterText: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.textSecondary,
  },
  resetText: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.error,
  },

  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 100,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: BorderRadius['3xl'],
    borderTopRightRadius: BorderRadius['3xl'],
    padding: Spacing.xl,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  modalTitle: {
    fontSize: Typography.sizes.xl,
    fontFamily: Typography.fontFamily.serif,
    color: Colors.primaryDark,
  },
  modalResetText: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.error,
  },
  filterSectionTitle: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.primaryDark,
    marginTop: Spacing.md,
    marginBottom: Spacing.sm,
  },
  modalChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  modalChip: {
    backgroundColor: Colors.background,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.pill,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
  },
  modalChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  modalChipText: {
    fontSize: Typography.sizes.xs,
    fontFamily: Typography.fontFamily.sansMedium,
    color: Colors.text,
  },
  modalChipTextActive: {
    color: Colors.surface,
  },
  photoToggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.lg,
    padding: Spacing.md,
    marginTop: Spacing.sm,
    marginBottom: Spacing.md,
  },
  photoToggleLabel: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sansMedium,
    color: Colors.primaryDark,
  },
});

