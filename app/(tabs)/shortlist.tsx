import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp, Profile } from '../../src/context/AppContext';
import ProfileCard from '../../src/components/ProfileCard';
import MintGlassBackground from '../../src/components/MintGlassBackground';

export default function ShortlistScreen() {
  const router = useRouter();
  const { state, dispatch, profiles } = useApp();

  const [activeSubTab, setActiveSubTab] = useState<'Shortlisted' | 'Received' | 'Sent'>('Shortlisted');

  const shortlistedIds = state.shortlistedProfiles || [];
  const sentInterests = state.sentInterests || [];

  const myShortlistedProfiles = (profiles || []).filter((p: Profile) => shortlistedIds.includes(p.profileId));
  // Mock received/sent for the UI
  const receivedProfiles = (profiles || []).slice(10, 15);
  const sentProfiles = (profiles || []).filter((p: Profile) => sentInterests.includes(p.profileId));

  const currentDisplayProfiles = 
    activeSubTab === 'Shortlisted' ? myShortlistedProfiles : 
    activeSubTab === 'Received' ? receivedProfiles : 
    sentProfiles;

  const handleInterestToggle = (profileId: string) => {
    dispatch({ type: 'SEND_INTEREST', payload: profileId });
  };

  const handleShortlistToggle = (profileId: string) => {
    dispatch({ type: 'TOGGLE_SHORTLIST', payload: profileId });
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <Text style={styles.headerTitle}>Saved & Shortlisted</Text>
        </View>

        {/* Sub-Tab Glass Switcher */}
        <View style={styles.segmentGlassWrapper}>
          <TouchableOpacity
            style={[styles.segmentBtn, activeSubTab === 'Shortlisted' && styles.segmentBtnActive]}
            onPress={() => setActiveSubTab('Shortlisted')}
            activeOpacity={0.88}
          >
            <Text style={[styles.segmentText, activeSubTab === 'Shortlisted' && styles.segmentTextActive]}>
              Shortlisted
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segmentBtn, activeSubTab === 'Received' && styles.segmentBtnActive]}
            onPress={() => setActiveSubTab('Received')}
            activeOpacity={0.88}
          >
            <Text style={[styles.segmentText, activeSubTab === 'Received' && styles.segmentTextActive]}>
              Received
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segmentBtn, activeSubTab === 'Sent' && styles.segmentBtnActive]}
            onPress={() => setActiveSubTab('Sent')}
            activeOpacity={0.88}
          >
            <Text style={[styles.segmentText, activeSubTab === 'Sent' && styles.segmentTextActive]}>
              Sent
            </Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={currentDisplayProfiles}
          keyExtractor={(item) => item.profileId}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyContainer}>
              <Ionicons name="star-outline" size={48} color="#0D9488" style={{ marginBottom: 12 }} />
              <Text style={styles.emptyTitle}>No Shortlisted Profiles Yet</Text>
              <Text style={styles.emptySub}>Tap the star icon on any profile to save it here</Text>
            </View>
          )}
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
      </SafeAreaView>
    </MintGlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topHeader: {
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
  segmentGlassWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.75)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    marginHorizontal: 16,
    padding: 4,
    marginBottom: 12,
  },
  segmentBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 16,
  },
  segmentBtnActive: {
    backgroundColor: '#0F2E2B',
  },
  segmentText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F2E2B',
  },
  segmentTextActive: {
    color: '#FFFFFF',
  },

  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  emptySub: {
    fontSize: 13,
    color: '#4A6B66',
    marginTop: 4,
    textAlign: 'center',
  },
});
