import React, { useState, useMemo } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, 
  Image, Modal, ScrollView, SafeAreaView, Platform 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useApp } from '../../src/context/AppContext';
import ProfileCard from '../../src/components/ProfileCard';
import { Colors } from '../../src/constants/theme';

export default function SearchScreen() {
  const router = useRouter();
  const { state, dispatch, profiles } = useApp();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChip, setActiveChip] = useState('All');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortOption, setSortOption] = useState('Best Match');
  const [showSortMenu, setShowSortMenu] = useState(false);

  const isShortlisted = (id: string) => state.shortlistedProfiles.includes(id);
  const isInterestSent = (id: string) => state.sentInterests.includes(id);

  const chips = ['All', 'Nearby', 'New', 'Verified', 'Newspaper Ad'];

  const [filters, setFilters] = useState<Record<string, string[]>>({
    types: [], onlineStatus: [], activity: [], postedBy: [],
    religion: [], motherTongue: [], caste: [], location: [],
    income: [], employment: [], education: [], occupation: [],
    photo: [], diet: [], maritalStatus: [], manglik: []
  });

  const activeFiltersCount = Object.values(filters).reduce((acc, val) => 
    acc + (Array.isArray(val) ? val.length : val ? 1 : 0), 0
  );

  const filteredProfiles = useMemo(() => {
    let result = profiles;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        (p.caste && p.caste.toLowerCase().includes(q)) || 
        (p.occupation && p.occupation.toLowerCase().includes(q)) || 
        (p.residentCity && p.residentCity.toLowerCase().includes(q))
      );
    }
    if (activeChip !== 'All') {
      if (activeChip === 'Verified') result = result.filter(p => p.isVerified);
      if (activeChip === 'Newspaper Ad') result = result.filter(p => p.isNewspaperAdLinked);
    }
    return result;
  }, [profiles, searchQuery, activeChip]);

  const renderFilterSection = (title: string, options: string[], filterKey: string) => {
    return (
      <View style={styles.filterSection}>
        <Text style={styles.filterTitle}>{title}</Text>
        <View style={styles.filterOptions}>
          {options.map(opt => {
            const isSelected = filters[filterKey].includes(opt);
            return (
              <TouchableOpacity 
                key={opt}
                style={[styles.filterChip, isSelected && styles.filterChipSelected]}
                onPress={() => {
                  const curr = filters[filterKey];
                  setFilters({
                    ...filters,
                    [filterKey]: isSelected ? curr.filter(x => x !== opt) : [...curr, opt]
                  });
                }}
              >
                <Text style={[styles.filterChipText, isSelected && styles.filterChipTextSelected]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.searchRow}>
          <View style={styles.searchBar}>
            <MaterialCommunityIcons name="magnify" size={20} color="#8C7B6B" />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search by name, caste, city..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#8C7B6B"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <MaterialCommunityIcons name="close-circle" size={20} color="#8C7B6B" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterBtn} onPress={() => setIsFilterVisible(true)}>
            <MaterialCommunityIcons name="tune" size={22} color="#6B0000" />
            {activeFiltersCount > 0 && (
              <View style={styles.filterBadge}>
                <Text style={styles.filterBadgeText}>{activeFiltersCount}</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsScroll} contentContainerStyle={styles.chipsContainer}>
          {chips.map(chip => (
            <TouchableOpacity 
              key={chip} 
              style={[styles.quickChip, activeChip === chip && styles.quickChipActive]}
              onPress={() => setActiveChip(chip)}
            >
              <Text style={[styles.quickChipText, activeChip === chip && styles.quickChipTextActive]}>
                {chip}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View style={styles.resultsHeader}>
        <Text style={styles.resultCount}>Showing {filteredProfiles.length} profiles</Text>
        <TouchableOpacity style={styles.sortBtn} onPress={() => setShowSortMenu(!showSortMenu)}>
          <Text style={styles.sortText}>{sortOption}</Text>
          <MaterialCommunityIcons name="chevron-down" size={18} color="#665544" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProfiles}
        keyExtractor={item => item.profileId}
        renderItem={({ item }) => (
          <ProfileCard
            profile={item}
            size="compact"
            onPress={() => router.push(`/profile/${item.profileId}`)}
            onInterest={() => dispatch({ type: 'SEND_INTEREST', payload: item.profileId })}
            onShortlist={() => dispatch({ type: 'TOGGLE_SHORTLIST', payload: item.profileId })}
            isShortlisted={isShortlisted(item.profileId)}
            isInterestSent={isInterestSent(item.profileId)}
          />
        )}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="account-search-outline" size={64} color="#8C7B6B" />
            <Text style={styles.emptyTitle}>No profiles found</Text>
            <Text style={styles.emptySub}>Try adjusting your filters or search terms</Text>
          </View>
        }
      />

      {/* Filter Modal */}
      <Modal visible={isFilterVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
              <MaterialCommunityIcons name="close" size={24} color="#200D08" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Royal Filters</Text>
            <TouchableOpacity onPress={() => setFilters({
              types: [], onlineStatus: [], activity: [], postedBy: [],
              religion: [], motherTongue: [], caste: [], location: [],
              income: [], employment: [], education: [], occupation: [],
              photo: [], diet: [], maritalStatus: [], manglik: []
            })}>
              <Text style={styles.resetText}>Reset All</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.modalContent}>
            {renderFilterSection('Types of Matches', ['All', 'Verified', 'Just Joined', 'Nearby', 'Newspaper-linked'], 'types')}
            {renderFilterSection('Online Status', ['All', 'Online Now'], 'onlineStatus')}
            {renderFilterSection('Activity', ['Active last week', 'Active last month', 'Active last 2 months'], 'activity')}
            {renderFilterSection('Profile Posted By', ['Self', 'Parent', 'Sibling', 'Relative', 'Friend'], 'postedBy')}
            {renderFilterSection('Religion', ['Hindu', 'Muslim', 'Sikh', 'Jain', 'Christian', 'Others'], 'religion')}
            {renderFilterSection('Mother Tongue', ['Hindi', 'Marwari/Rajasthani', 'Punjabi', 'Gujarati', 'Marathi', 'Tamil', 'Others'], 'motherTongue')}
            {renderFilterSection('Caste', ['Rajput', 'Agarwal', 'Brahmin', 'Marwari', 'Jain', 'Sindhi', 'Others'], 'caste')}
            {renderFilterSection('Employment', ['Private', 'Govt/Public', 'Business/Self-employed', 'Defence', 'Civil Services'], 'employment')}
            {renderFilterSection('Education', ['Engineering', 'Medicine', 'Management', 'Arts/Science', 'Law', 'Doctorate', 'Others'], 'education')}
            {renderFilterSection('Photo', ['All', 'With Photo only'], 'photo')}
            {renderFilterSection('Marital Status', ['Doesn\'t matter', 'Never married', 'Divorced', 'Widowed'], 'maritalStatus')}
            {renderFilterSection('Diet', ['Veg', 'Non-veg', 'Eggetarian', 'Jain'], 'diet')}
            {renderFilterSection('Manglik', ['Manglik', 'Non-manglik', 'Doesn\'t matter'], 'manglik')}
            <View style={{height: 100}} />
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.applyBtn} onPress={() => setIsFilterVisible(false)}>
              <Text style={styles.applyBtnText}>Apply Filters</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAF6F0' },
  header: { backgroundColor: '#FFFDF9', paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#E2D7C7' },
  searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F4EEE5', borderRadius: 12, paddingHorizontal: 12, height: 44, marginRight: 12, borderWidth: 1, borderColor: '#E8DFD3' },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 15, color: '#200D08' },
  filterBtn: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#FFF5F6', borderWidth: 1, borderColor: '#E2D7C7', justifyContent: 'center', alignItems: 'center' },
  filterBadge: { position: 'absolute', top: -4, right: -4, backgroundColor: '#6B0000', borderRadius: 10, minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFFDF9' },
  filterBadgeText: { color: '#FFF', fontSize: 10, fontWeight: '800' },
  chipsScroll: { maxHeight: 40 },
  chipsContainer: { paddingHorizontal: 16, paddingBottom: 8 },
  quickChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F5EFE6', marginRight: 8, borderWidth: 1, borderColor: '#E2D7C7' },
  quickChipActive: { backgroundColor: '#6B0000', borderColor: '#6B0000' },
  quickChipText: { color: '#665544', fontSize: 13, fontWeight: '600' },
  quickChipTextActive: { color: '#FFFDF9', fontWeight: '700' },
  resultsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  resultCount: { fontSize: 13, color: '#665544', fontWeight: '600' },
  sortBtn: { flexDirection: 'row', alignItems: 'center' },
  sortText: { fontSize: 13, color: '#200D08', marginRight: 4, fontWeight: '700' },
  listContainer: { paddingBottom: 20 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#200D08', marginTop: 16, marginBottom: 8 },
  emptySub: { fontSize: 14, color: '#665544', textAlign: 'center' },
  modalContainer: { flex: 1, backgroundColor: '#FAF6F0' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E2D7C7', backgroundColor: '#FFFDF9' },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#200D08' },
  resetText: { fontSize: 15, color: '#6B0000', fontWeight: '700' },
  modalContent: { flex: 1, padding: 16 },
  filterSection: { marginBottom: 24 },
  filterTitle: { fontSize: 15, fontWeight: '800', color: '#200D08', marginBottom: 12 },
  filterOptions: { flexDirection: 'row', flexWrap: 'wrap' },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 18, backgroundColor: '#FFFDF9', borderWidth: 1, borderColor: '#E2D7C7', marginRight: 8, marginBottom: 8 },
  filterChipSelected: { backgroundColor: '#FFF5F6', borderColor: '#6B0000' },
  filterChipText: { fontSize: 13, color: '#554433' },
  filterChipTextSelected: { color: '#6B0000', fontWeight: '700' },
  modalFooter: { padding: 16, borderTopWidth: 1, borderTopColor: '#E2D7C7', backgroundColor: '#FFFDF9' },
  applyBtn: { backgroundColor: '#6B0000', borderRadius: 28, paddingVertical: 14, alignItems: 'center' },
  applyBtnText: { color: '#FFF', fontSize: 16, fontWeight: '700' }
});
