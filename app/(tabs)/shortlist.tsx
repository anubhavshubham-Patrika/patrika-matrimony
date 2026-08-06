import React, { useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, TouchableOpacity, Image,
  SafeAreaView, StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import profilesData from '../../src/data/profiles.json';
import interestsData from '../../src/data/interests.json';

const PRIMARY = '#E31E25';
const GOLD = '#C5A059';

export default function ShortlistScreen() {
  const { state, dispatch } = useApp();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'shortlisted' | 'received' | 'sent'>('shortlisted');

  const myProfileId = state.currentUser?.profileId || 'P001';

  const shortlistedProfiles = (profilesData as any[]).filter((p: any) =>
    state.shortlistedProfiles.includes(p.profileId)
  );

  const receivedInterests = (interestsData as any[])
    .filter((i: any) => i.toProfileId === myProfileId && i.status === 'InterestSent')
    .slice(0, 15)
    .map((i: any) => {
      const profile = (profilesData as any[]).find((p: any) => p.profileId === i.fromProfileId);
      return { ...i, profile };
    })
    .filter((i) => i.profile);

  const sentInterests = (interestsData as any[])
    .filter((i: any) => i.fromProfileId === myProfileId)
    .slice(0, 15)
    .map((i: any) => {
      const profile = (profilesData as any[]).find((p: any) => p.profileId === i.toProfileId);
      return { ...i, profile };
    })
    .filter((i) => i.profile);

  const renderShortlistCard = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.shortlistCard}
      onPress={() => router.push(`/profile/${item.profileId}`)}
      activeOpacity={0.9}
    >
      <Image
        source={{ uri: item.profilePhotoURL || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' }}
        style={styles.shortlistPhoto}
      />
      <TouchableOpacity
        style={styles.removeBtn}
        onPress={() => dispatch({ type: 'TOGGLE_SHORTLIST', payload: item.profileId })}
      >
        <Ionicons name="heart" size={18} color={PRIMARY} />
      </TouchableOpacity>
      <View style={styles.shortlistInfo}>
        <Text style={styles.shortlistName} numberOfLines={1}>{item.name}</Text>
        <Text style={styles.shortlistMeta} numberOfLines={1}>
          {item.age} yrs • {item.residentCity}
        </Text>
        <Text style={styles.shortlistCaste} numberOfLines={1}>{item.caste}</Text>
      </View>
    </TouchableOpacity>
  );

  const renderInterestRow = ({ item }: { item: any }) => (
    <View style={styles.interestRow}>
      <TouchableOpacity onPress={() => router.push(`/profile/${item.profile.profileId}`)}>
        <Image
          source={{ uri: item.profile.profilePhotoURL }}
          style={styles.interestAvatar}
        />
      </TouchableOpacity>
      <View style={styles.interestInfo}>
        <Text style={styles.interestName}>{item.profile.name}</Text>
        <Text style={styles.interestMeta}>
          {item.profile.age} yrs • {item.profile.occupation} • {item.profile.residentCity}
        </Text>
        <Text style={styles.interestCaste}>{item.profile.caste} • {item.profile.religion}</Text>
      </View>
      {activeTab === 'received' && (
        <View style={styles.interestActions}>
          <TouchableOpacity
            style={styles.acceptBtn}
            onPress={() => dispatch({ type: 'SEND_INTEREST', payload: item.profile.profileId })}
          >
            <Text style={styles.acceptBtnText}>Accept</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.declineBtn}>
            <Text style={styles.declineBtnText}>Decline</Text>
          </TouchableOpacity>
        </View>
      )}
      {activeTab === 'sent' && (
        <View style={styles.statusBadge}>
          <Text style={[styles.statusText,
            item.status === 'Accepted' && { color: '#27AE60' },
            item.status === 'Declined' && { color: '#E31E25' },
            item.status === 'InterestSent' && { color: '#C5A059' },
          ]}>
            {item.status === 'InterestSent' ? 'Pending' : item.status}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F6F0" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Matches</Text>
      </View>

      {/* Tabs */}
      <View style={styles.tabRow}>
        {[
          { key: 'shortlisted', label: `Shortlisted (${shortlistedProfiles.length})` },
          { key: 'received', label: `Received (${receivedInterests.length})` },
          { key: 'sent', label: `Sent (${sentInterests.length})` },
        ].map((tab) => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tabBtn, activeTab === tab.key && styles.activeTabBtn]}
            onPress={() => setActiveTab(tab.key as any)}
          >
            <Text style={[styles.tabBtnText, activeTab === tab.key && styles.activeTabBtnText]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Content */}
      {activeTab === 'shortlisted' && (
        shortlistedProfiles.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="heart-outline" size={64} color="#8C7A7C" />
            <Text style={styles.emptyTitle}>No profiles shortlisted yet</Text>
            <Text style={styles.emptySubtitle}>Tap the heart icon on any profile card to save it here</Text>
            <TouchableOpacity style={styles.explorBtn} onPress={() => router.push('/(tabs)/home')}>
              <Text style={styles.explorBtnText}>Explore Matches</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={shortlistedProfiles}
            keyExtractor={(item) => item.profileId}
            renderItem={renderShortlistCard}
            numColumns={2}
            contentContainerStyle={styles.shortlistGrid}
            columnWrapperStyle={{ gap: 12 }}
          />
        )
      )}

      {(activeTab === 'received' || activeTab === 'sent') && (
        <FlatList
          data={activeTab === 'received' ? receivedInterests : sentInterests}
          keyExtractor={(item) => item.matchId}
          renderItem={renderInterestRow}
          contentContainerStyle={{ padding: 12 }}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="heart-dislike-outline" size={64} color="#8C7A7C" />
              <Text style={styles.emptyTitle}>
                {activeTab === 'received' ? 'No interests received yet' : 'No interests sent yet'}
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F9F6F0' },
  header: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#2C1A1D', fontFamily: 'serif' },
  tabRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabBtn: { borderBottomColor: PRIMARY },
  tabBtnText: { fontSize: 12, color: '#8C7A7C', fontWeight: '600' },
  activeTabBtnText: { color: PRIMARY, fontWeight: '800' },
  shortlistGrid: { padding: 12 },
  shortlistCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFE6DD',
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  shortlistPhoto: { width: '100%', height: 165, resizeMode: 'cover' },
  removeBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 14,
    padding: 6,
  },
  shortlistInfo: { padding: 10 },
  shortlistName: { fontSize: 15, fontWeight: '800', color: '#2C1A1D', fontFamily: 'serif' },
  shortlistMeta: { fontSize: 12, color: '#5A4A4D', marginTop: 2 },
  shortlistCaste: { fontSize: 12, color: PRIMARY, fontWeight: '700', marginTop: 2 },
  interestRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EFE6DD',
    padding: 12,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 2,
  },
  interestAvatar: { width: 58, height: 58, borderRadius: 29, marginRight: 12 },
  interestInfo: { flex: 1 },
  interestName: { fontSize: 15, fontWeight: '800', color: '#2C1A1D', fontFamily: 'serif' },
  interestMeta: { fontSize: 12, color: '#5A4A4D', marginTop: 2 },
  interestCaste: { fontSize: 12, color: PRIMARY, fontWeight: '700', marginTop: 2 },
  interestActions: { gap: 6 },
  acceptBtn: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  acceptBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 12 },
  declineBtn: {
    borderWidth: 1,
    borderColor: '#EFE6DD',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 16,
  },
  declineBtnText: { color: '#5A4A4D', fontSize: 12 },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  statusText: { fontSize: 12, fontWeight: '800' },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 40 },
  emptyTitle: { fontSize: 18, fontWeight: '800', color: '#2C1A1D', marginTop: 16, textAlign: 'center', fontFamily: 'serif' },
  emptySubtitle: { fontSize: 14, color: '#8C7A7C', marginTop: 8, textAlign: 'center' },
  explorBtn: {
    marginTop: 20,
    backgroundColor: PRIMARY,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  explorBtnText: { color: '#FFFFFF', fontWeight: '800', fontSize: 15 },
});
