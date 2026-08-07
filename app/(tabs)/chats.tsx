import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp, Profile } from '../../src/context/AppContext';
import chatsData from '../../src/data/chats.json';
import MintGlassBackground from '../../src/components/MintGlassBackground';

export default function ChatsScreen() {
  const router = useRouter();
  const { profiles } = useApp();
  const currentUserId = 'P001';

  const [activeTab, setActiveTab] = useState<'Chats' | 'Calls'>('Chats');

  // Filter conversations involving P001
  const userConversations = chatsData.filter((c: any) => c.participants.includes(currentUserId));

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Header Bar */}
        <View style={styles.topHeader}>
          <Text style={styles.headerTitle}>Messages & Calls</Text>
        </View>

        {/* Glass Segment Switcher (Chats | Calls) */}
        <View style={styles.segmentGlassWrapper}>
          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'Chats' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('Chats')}
            activeOpacity={0.88}
          >
            <Text style={[styles.segmentText, activeTab === 'Chats' && styles.segmentTextActive]}>Chats</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segmentBtn, activeTab === 'Calls' && styles.segmentBtnActive]}
            onPress={() => setActiveTab('Calls')}
            activeOpacity={0.88}
          >
            <Text style={[styles.segmentText, activeTab === 'Calls' && styles.segmentTextActive]}>Calls History</Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'Chats' ? (
          <FlatList
            data={userConversations}
            keyExtractor={(item) => item.conversationId}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => {
              const otherId = item.participants.find((p: string) => p !== currentUserId);
              const otherProfile = (profiles || []).find((p: Profile) => p.profileId === otherId);
              if (!otherProfile) return null;

              return (
                <TouchableOpacity
                  style={styles.chatRowGlassCard}
                  onPress={() => router.push(`/chat/${item.conversationId}`)}
                  activeOpacity={0.88}
                >
                  <View style={styles.avatarWrapper}>
                    <Image
                      source={{ uri: otherProfile.profilePhotoURL || 'https://randomuser.me/api/portraits/women/44.jpg' }}
                      style={styles.avatarPhoto}
                    />
                    {otherProfile.isVerified && (
                      <View style={styles.verifiedDot}>
                        <Ionicons name="checkmark-circle" size={12} color="#0D9488" />
                      </View>
                    )}
                  </View>

                  <View style={styles.chatInfoCol}>
                    <View style={styles.chatTopRow}>
                      <Text style={styles.partnerNameText} numberOfLines={1}>{otherProfile.name}</Text>
                      <Text style={styles.timeText}>10:45 AM</Text>
                    </View>

                    <Text style={styles.lastMsgText} numberOfLines={1}>
                      {item.lastMessage || 'Namaste! I liked your matrimony profile.'}
                    </Text>
                  </View>

                  {item.unreadCount ? (
                    <View style={styles.unreadBadge}>
                      <Text style={styles.unreadCountText}>{item.unreadCount}</Text>
                    </View>
                  ) : null}
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View style={styles.emptyCallsContainer}>
            <Ionicons name="call-outline" size={48} color="#0D9488" style={{ marginBottom: 12 }} />
            <Text style={styles.emptyTitle}>No Recent Calls</Text>
            <Text style={styles.emptySub}>Voice and Video call logs will appear here</Text>
          </View>
        )}
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
    fontSize: 13,
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
  chatRowGlassCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 22,
    padding: 12,
    marginBottom: 10,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 2,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: 12,
  },
  avatarPhoto: {
    width: 52,
    height: 52,
    borderRadius: 26,
  },
  verifiedDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
  },
  chatInfoCol: {
    flex: 1,
  },
  chatTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  partnerNameText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F2E2B',
  },
  timeText: {
    fontSize: 11,
    color: '#8C9E9B',
  },
  lastMsgText: {
    fontSize: 13,
    color: '#4A6B66',
  },
  unreadBadge: {
    backgroundColor: '#0D9488',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    marginLeft: 8,
  },
  unreadCountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '800',
  },

  emptyCallsContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  },
});
