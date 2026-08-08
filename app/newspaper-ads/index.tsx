import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, TextInput, Modal, ScrollView, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import newspaperAdsData from '../../src/data/newspaper-ads.json';
import profilesData from '../../src/data/profiles.json';

const PRIMARY = '#C0392B';

const CATEGORY_COLORS: Record<string, string> = {
  'Hindu-Rajput': '#C0392B',
  'Hindu-Brahmin': '#8E44AD',
  'Hindu-Agarwal': '#E67E22',
  'Hindu-Marwari': '#2980B9',
  'Jain': '#16A085',
  'Muslim': '#27AE60',
  'Sikh': '#F39C12',
  'Sindhi': '#D35400',
  'Hindu-Gurjar': '#2ECC71',
  'Hindu-Kayastha': '#1ABC9C',
};

export default function NewspaperAdsScreen() {
  const router = useRouter();
  const { state } = useApp();
  const [activeFilter, setActiveFilter] = useState<'all' | 'linked' | 'linkable'>('all');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkDate, setLinkDate] = useState('');
  const [linkCity, setLinkCity] = useState('');
  const [linkAdId, setLinkAdId] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const filteredAds = (newspaperAdsData as any[]).filter((ad: any) => {
    if (activeFilter === 'linked' && ad.status !== 'Linked') return false;
    if (activeFilter === 'linkable' && ad.status !== 'Linkable') return false;
    if (categoryFilter && ad.category !== categoryFilter) return false;
    return true;
  });

  const allCategories = [...new Set((newspaperAdsData as any[]).map((a: any) => a.category))];

  const handleSearch = () => {
    const results = (newspaperAdsData as any[]).filter((ad: any) => {
      const matchCity = linkCity ? ad.cityEdition.toLowerCase().includes(linkCity.toLowerCase()) : true;
      const matchDate = linkDate ? ad.editionDate.includes(linkDate) : true;
      const matchId = linkAdId ? ad.offlineAdId.includes(linkAdId.toUpperCase()) : true;
      return matchCity && matchDate && matchId;
    });
    setSearchResults(results);
  };

  const handleLink = (adId: string) => {
    Alert.alert('Success!', `Ad ${adId} has been linked to your profile. Your profile will now show "Linked to Rajasthan Patrika" badge.`);
    setShowLinkModal(false);
  };

  const getLinkedProfile = (profileId: string) => {
    return (profilesData as any[]).find((p: any) => p.profileId === profileId);
  };

  const renderAd = ({ item }: { item: any }) => {
    const linkedProfile = item.linkedProfileId ? getLinkedProfile(item.linkedProfileId) : null;
    const catColor = CATEGORY_COLORS[item.category] || PRIMARY;

    return (
      <View style={styles.adCard}>
        {/* Header row */}
        <View style={styles.adHeader}>
          <View style={styles.adDateBadge}>
            <Text style={styles.adDateDay}>{new Date(item.editionDate).toLocaleDateString('en-IN', { day: 'numeric' })}</Text>
            <Text style={styles.adDateMonth}>{new Date(item.editionDate).toLocaleDateString('en-IN', { month: 'short' })}</Text>
          </View>
          <View style={{ flex: 1, marginLeft: 12 }}>
            <View style={styles.adTagRow}>
              <View style={[styles.categoryChip, { backgroundColor: catColor }]}>
                <Text style={styles.categoryChipText}>{item.category}</Text>
              </View>
              <View style={[styles.cityChip]}>
                <MaterialCommunityIcons name="map-marker" size={11} color="#666" />
                <Text style={styles.cityChipText}>{item.cityEdition}</Text>
              </View>
            </View>
            <Text style={styles.adId}>Ref: {item.offlineAdId}</Text>
          </View>
          <View style={[styles.statusBadge, { backgroundColor: item.status === 'Linked' ? '#E8F5E9' : '#E3F2FD' }]}>
            <MaterialCommunityIcons
              name={item.status === 'Linked' ? 'check-circle' : 'link-variant'}
              size={12}
              color={item.status === 'Linked' ? '#27AE60' : '#3498DB'}
            />
            <Text style={[styles.statusText, { color: item.status === 'Linked' ? '#27AE60' : '#3498DB' }]}>
              {item.status}
            </Text>
          </View>
        </View>

        {/* Ad text in newspaper style */}
        <View style={styles.adTextBox}>
          <MaterialCommunityIcons name="newspaper-variant" size={16} color="#999" style={{ marginBottom: 6 }} />
          <Text style={styles.adText}>{item.adText}</Text>
          <Text style={styles.adContact}>📞 {item.contactNumberMasked}</Text>
        </View>

        {/* Linked profile mini-card */}
        {linkedProfile && (
          <TouchableOpacity
            style={styles.linkedProfileCard}
            onPress={() => router.push(`/profile/${linkedProfile.profileId}`)}
          >
            <MaterialCommunityIcons name="account-circle" size={28} color={PRIMARY} />
            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.linkedProfileName}>{linkedProfile.name}</Text>
              <Text style={styles.linkedProfileMeta}>
                {linkedProfile.age} yrs • {linkedProfile.occupation} • {linkedProfile.residentCity}
              </Text>
            </View>
            <MaterialCommunityIcons name="chevron-right" size={20} color="#ccc" />
          </TouchableOpacity>
        )}

        {/* Link button */}
        {item.status === 'Linkable' && (
          <TouchableOpacity
            style={styles.linkBtn}
            onPress={() => { handleLink(item.offlineAdId); }}
          >
            <MaterialCommunityIcons name="link-variant" size={16} color="#fff" />
            <Text style={styles.linkBtnText}>Link to My Profile</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Rajasthan Patrika</Text>
          <Text style={styles.headerSubtitle}>Matrimonial Ads</Text>
        </View>
        <TouchableOpacity style={styles.linkMyAdBtn} onPress={() => setShowLinkModal(true)}>
          <Text style={styles.linkMyAdText}>Link My Ad</Text>
        </TouchableOpacity>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        <MaterialCommunityIcons name="newspaper-variant-outline" size={24} color={PRIMARY} />
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>Have an ad in Rajasthan Patrika?</Text>
          <Text style={styles.bannerSubtitle}>Link your print ad to get 'Patrika Verified' badge on your digital profile.</Text>
        </View>
      </View>

      {/* Filter chips */}
      <View style={styles.filterRow}>
        {(['all', 'linked', 'linkable'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, activeFilter === f && styles.filterChipActive]}
            onPress={() => setActiveFilter(f)}
          >
            <Text style={[styles.filterChipText, activeFilter === f && styles.filterChipTextActive]}>
              {f === 'all' ? 'All Ads' : f === 'linked' ? '✓ Linked' : 'Linkable'}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Category filter */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.catScroll} contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}>
        <TouchableOpacity
          style={[styles.catChip, !categoryFilter && styles.catChipActive]}
          onPress={() => setCategoryFilter('')}
        >
          <Text style={[styles.catChipText, !categoryFilter && styles.catChipTextActive]}>All</Text>
        </TouchableOpacity>
        {allCategories.map((cat: string) => (
          <TouchableOpacity
            key={cat}
            style={[styles.catChip, categoryFilter === cat && styles.catChipActive]}
            onPress={() => setCategoryFilter(categoryFilter === cat ? '' : cat)}
          >
            <Text style={[styles.catChipText, categoryFilter === cat && styles.catChipTextActive]}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.resultsCount}>Showing {filteredAds.length} ads</Text>

      <FlatList
        data={filteredAds}
        keyExtractor={(item) => item.offlineAdId}
        renderItem={renderAd}
        contentContainerStyle={{ padding: 12, paddingBottom: 32 }}
      />

      {/* Link My Ad Modal */}
      <Modal visible={showLinkModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowLinkModal(false)}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Link Your Newspaper Ad</Text>
            <View style={{ width: 24 }} />
          </View>

          <ScrollView contentContainerStyle={{ padding: 16 }}>
            <Text style={styles.modalDesc}>
              Enter the details from your Rajasthan Patrika matrimonial ad to link it to your profile.
            </Text>

            <Text style={styles.inputLabel}>Edition Date (YYYY-MM-DD)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. 2025-07-15"
              value={linkDate}
              onChangeText={setLinkDate}
            />

            <Text style={styles.inputLabel}>City Edition</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. Jaipur, Jodhpur, Udaipur"
              value={linkCity}
              onChangeText={setLinkCity}
            />

            <Text style={styles.inputLabel}>Ad Reference ID (Optional)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g. AD001"
              value={linkAdId}
              onChangeText={setLinkAdId}
            />

            <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
              <Text style={styles.searchBtnText}>Search Ads</Text>
            </TouchableOpacity>

            {searchResults.length > 0 && (
              <View style={{ marginTop: 16 }}>
                <Text style={styles.resultsCount}>Found {searchResults.length} matching ads:</Text>
                {searchResults.map((ad: any) => (
                  <View key={ad.offlineAdId} style={styles.resultAdCard}>
                    <Text style={styles.resultAdDate}>{ad.editionDate} • {ad.cityEdition}</Text>
                    <Text style={styles.resultAdText} numberOfLines={3}>{ad.adText}</Text>
                    <TouchableOpacity
                      style={styles.confirmLinkBtn}
                      onPress={() => handleLink(ad.offlineAdId)}
                    >
                      <Text style={styles.confirmLinkBtnText}>Confirm & Link This Ad</Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            {searchResults.length === 0 && linkDate && (
              <View style={styles.noResultsBox}>
                <MaterialCommunityIcons name="magnify" size={32} color="#ccc" />
                <Text style={styles.noResultsText}>No ads found. Try different criteria.</Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 17, fontWeight: '900', color: '#fff' },
  headerSubtitle: { fontSize: 12, color: 'rgba(255,255,255,0.8)' },
  linkMyAdBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  linkMyAdText: { color: '#fff', fontWeight: '700', fontSize: 12 },
  banner: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    padding: 14,
    gap: 12,
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#FFD9D9',
  },
  bannerTitle: { fontSize: 13, fontWeight: '700', color: PRIMARY },
  bannerSubtitle: { fontSize: 12, color: '#666', marginTop: 3, lineHeight: 17 },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    backgroundColor: '#fff',
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterChipActive: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  filterChipText: { fontSize: 12, color: '#666', fontWeight: '600' },
  filterChipTextActive: { color: '#fff' },
  catScroll: { paddingVertical: 8, backgroundColor: '#fff', borderBottomWidth: 1, borderBottomColor: '#eee' },
  catChip: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
    backgroundColor: '#F5F5F5',
  },
  catChipActive: { backgroundColor: '#FFF5F5', borderWidth: 1, borderColor: PRIMARY },
  catChipText: { fontSize: 12, color: '#666' },
  catChipTextActive: { color: PRIMARY, fontWeight: '700' },
  resultsCount: { fontSize: 12, color: '#999', paddingHorizontal: 16, paddingVertical: 6 },
  adCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  adHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  adDateBadge: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  adDateDay: { color: '#fff', fontSize: 16, fontWeight: '900', lineHeight: 18 },
  adDateMonth: { color: 'rgba(255,255,255,0.8)', fontSize: 10, fontWeight: '600' },
  adTagRow: { flexDirection: 'row', gap: 6, marginBottom: 3 },
  categoryChip: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  categoryChipText: { color: '#fff', fontSize: 10, fontWeight: '700' },
  cityChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  cityChipText: { color: '#666', fontSize: 10 },
  adId: { fontSize: 10, color: '#bbb' },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: { fontSize: 10, fontWeight: '700' },
  adTextBox: {
    padding: 14,
    backgroundColor: '#FFFBF0',
  },
  adText: {
    fontSize: 13,
    color: '#333',
    lineHeight: 20,
    fontStyle: 'italic',
  },
  adContact: { fontSize: 12, color: '#999', marginTop: 6 },
  linkedProfileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    backgroundColor: '#FAFAFA',
  },
  linkedProfileName: { fontSize: 14, fontWeight: '700', color: '#1A1A2E' },
  linkedProfileMeta: { fontSize: 12, color: '#666', marginTop: 2 },
  linkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3498DB',
    padding: 12,
    gap: 8,
  },
  linkBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  modalContainer: { flex: 1, backgroundColor: '#fff' },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: { fontSize: 17, fontWeight: '800', color: '#1A1A2E' },
  modalDesc: { fontSize: 14, color: '#666', marginBottom: 20, lineHeight: 20 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#333', marginBottom: 6, marginTop: 12 },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#1A1A2E',
    backgroundColor: '#F9F9F9',
  },
  searchBtn: {
    backgroundColor: PRIMARY,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  searchBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  resultAdCard: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 14,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  resultAdDate: { fontSize: 12, color: PRIMARY, fontWeight: '700', marginBottom: 6 },
  resultAdText: { fontSize: 13, color: '#333', lineHeight: 18, fontStyle: 'italic' },
  confirmLinkBtn: {
    marginTop: 12,
    backgroundColor: '#27AE60',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },
  confirmLinkBtnText: { color: '#fff', fontWeight: '700', fontSize: 13 },
  noResultsBox: {
    alignItems: 'center',
    padding: 32,
    gap: 12,
  },
  noResultsText: { color: '#999', fontSize: 14 },
});
