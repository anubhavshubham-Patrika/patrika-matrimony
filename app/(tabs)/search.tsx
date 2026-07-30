import React, { useState, useMemo } from 'react';
import { 
  View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, 
  Image, Modal, ScrollView, SafeAreaView, Platform 
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
// import { useApp } from '../../src/context/AppContext';

const DUMMY_PROFILES = [
  { id: '1', name: 'Riya Sharma', age: 26, height: '5\'4"', caste: 'Brahmin', occupation: 'Software Engineer', city: 'Jaipur', photo: 'https://randomuser.me/api/portraits/women/44.jpg', isVerified: true, isNew: true },
  { id: '2', name: 'Aarav Gupta', age: 29, height: '5\'10"', caste: 'Baniya', occupation: 'Business Analyst', city: 'Delhi', photo: 'https://randomuser.me/api/portraits/men/32.jpg', isVerified: true, isNew: false },
  { id: '3', name: 'Priya Singh', age: 27, height: '5\'5"', caste: 'Rajput', occupation: 'Doctor', city: 'Mumbai', photo: 'https://randomuser.me/api/portraits/women/68.jpg', isVerified: false, isNew: true },
];

export default function SearchScreen() {
  const router = useRouter();
  // const { profiles } = useApp();
  const profiles = DUMMY_PROFILES; // using dummy for standalone
  
  const [searchQuery, setSearchQuery] = useState('');
  const [activeChip, setActiveChip] = useState('All');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [sortOption, setSortOption] = useState('Best Match');
  const [showSortMenu, setShowSortMenu] = useState(false);

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
        p.caste.toLowerCase().includes(q) || 
        p.occupation.toLowerCase().includes(q) || 
        p.city.toLowerCase().includes(q)
      );
    }
    if (activeChip !== 'All') {
      if (activeChip === 'New') result = result.filter(p => p.isNew);
      if (activeChip === 'Verified') result = result.filter(p => p.isVerified);
    }
    return result;
  }, [profiles, searchQuery, activeChip]);

  const renderProfileCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => router.push(`/profile/${item.id}` as any)}
      activeOpacity={0.9}
    >
      <Image source={{ uri: item.photo }} style={styles.cardImage} />
      <View style={styles.cardInfo}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardName}>{item.name}</Text>
          {item.isVerified && <MaterialCommunityIcons name="check-decagram" size={16} color="#4CAF50" />}
        </View>
        <Text style={styles.cardDetails}>{item.age} yrs • {item.height}</Text>
        <Text style={styles.cardDetails}>{item.caste}</Text>
        <Text style={styles.cardDetails}>{item.occupation}</Text>
        <Text style={styles.cardDetails} numberOfLines={1}>{item.city}</Text>
      </View>
    </TouchableOpacity>
  );

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
            <MaterialCommunityIcons name="magnify" size={20} color="#7F8C8D" />
            <TextInput 
              style={styles.searchInput}
              placeholder="Search by name, caste, city..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#95A5A6"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <MaterialCommunityIcons name="close-circle" size={20} color="#BDC3C7" />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity style={styles.filterBtn} onPress={() => setIsFilterVisible(true)}>
            <MaterialCommunityIcons name="tune" size={24} color="#C0392B" />
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
          <MaterialCommunityIcons name="chevron-down" size={20} color="#7F8C8D" />
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredProfiles}
        keyExtractor={item => item.id}
        renderItem={renderProfileCard}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <MaterialCommunityIcons name="account-search-outline" size={64} color="#BDC3C7" />
            <Text style={styles.emptyTitle}>No profiles found</Text>
            <Text style={styles.emptySub}>Try adjusting your filters or search terms</Text>
          </View>
        }
      />

      <Modal visible={isFilterVisible} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setIsFilterVisible(false)}>
              <MaterialCommunityIcons name="close" size={24} color="#2C3E50" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Filters</Text>
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
  container: { flex: 1, backgroundColor: '#F8F9F9' },
  header: { backgroundColor: '#FFF', paddingTop: Platform.OS === 'android' ? 40 : 10, paddingBottom: 10, borderBottomWidth: 1, borderBottomColor: '#EAEDED' },
  searchRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, marginBottom: 12 },
  searchBar: { flex: 1, flexDirection: 'row', alignItems: 'center', backgroundColor: '#F2F4F4', borderRadius: 8, paddingHorizontal: 12, height: 44, marginRight: 12 },
  searchInput: { flex: 1, marginLeft: 8, fontSize: 16, color: '#2C3E50' },
  filterBtn: { width: 44, height: 44, borderRadius: 8, backgroundColor: '#FADBD8', justifyContent: 'center', alignItems: 'center' },
  filterBadge: { position: 'absolute', top: -4, right: -4, backgroundColor: '#C0392B', borderRadius: 10, minWidth: 20, height: 20, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: '#FFF' },
  filterBadgeText: { color: '#FFF', fontSize: 10, fontWeight: 'bold' },
  chipsScroll: { maxHeight: 40 },
  chipsContainer: { paddingHorizontal: 16, paddingBottom: 8 },
  quickChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F2F4F4', marginRight: 8, borderWidth: 1, borderColor: '#EAEDED' },
  quickChipActive: { backgroundColor: '#C0392B', borderColor: '#C0392B' },
  quickChipText: { color: '#7F8C8D', fontSize: 14, fontWeight: '500' },
  quickChipTextActive: { color: '#FFF' },
  resultsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12 },
  resultCount: { fontSize: 14, color: '#7F8C8D', fontWeight: '500' },
  sortBtn: { flexDirection: 'row', alignItems: 'center' },
  sortText: { fontSize: 14, color: '#2C3E50', marginRight: 4, fontWeight: '500' },
  listContainer: { paddingHorizontal: 16, paddingBottom: 20 },
  card: { flexDirection: 'row', backgroundColor: '#FFF', borderRadius: 12, padding: 12, marginBottom: 12, elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.05, shadowRadius: 3 },
  cardImage: { width: 80, height: 100, borderRadius: 8, backgroundColor: '#EAEDED' },
  cardInfo: { flex: 1, marginLeft: 12, justifyContent: 'center' },
  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 4 },
  cardName: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginRight: 4 },
  cardDetails: { fontSize: 14, color: '#7F8C8D', marginBottom: 2 },
  emptyContainer: { alignItems: 'center', justifyContent: 'center', paddingVertical: 60 },
  emptyTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50', marginTop: 16, marginBottom: 8 },
  emptySub: { fontSize: 14, color: '#7F8C8D', textAlign: 'center' },
  modalContainer: { flex: 1, backgroundColor: '#FFF' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#EAEDED' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#2C3E50' },
  resetText: { fontSize: 16, color: '#C0392B', fontWeight: '500' },
  modalContent: { flex: 1, padding: 16 },
  filterSection: { marginBottom: 24 },
  filterTitle: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50', marginBottom: 12 },
  filterOptions: { flexDirection: 'row', flexWrap: 'wrap' },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#F8F9F9', borderWidth: 1, borderColor: '#EAEDED', marginRight: 8, marginBottom: 8 },
  filterChipSelected: { backgroundColor: '#FADBD8', borderColor: '#C0392B' },
  filterChipText: { fontSize: 14, color: '#2C3E50' },
  filterChipTextSelected: { color: '#C0392B', fontWeight: '500' },
  modalFooter: { padding: 16, borderTopWidth: 1, borderTopColor: '#EAEDED', backgroundColor: '#FFF' },
  applyBtn: { backgroundColor: '#C0392B', borderRadius: 8, paddingVertical: 14, alignItems: 'center' },
  applyBtnText: { color: '#FFF', fontSize: 16, fontWeight: 'bold' }
});
