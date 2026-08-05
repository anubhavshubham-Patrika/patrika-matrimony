import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import chatsData from '../../src/data/chats.json';
import profilesData from '../../src/data/profiles.json';

const MY_PROFILE_ID = 'P001';
const PRIMARY = '#E91E63';

export default function ChatsScreen() {
  const router = useRouter();
  const { state } = useApp();
  const [activeMainTab, setActiveMainTab] = useState<'Chats' | 'Calls'>('Chats');
  const [activeFilter, setActiveFilter] = useState<'All' | 'Accepted' | 'New'>('All');

  const { currentPlan } = state;
  const isPremium = currentPlan !== 'Free';

  // Build chat list from chats.json
  const chatList = (chatsData as any[])
    .filter((conv: any) => conv.participants?.includes(MY_PROFILE_ID))
    .map((conv: any) => {
      const otherParticipantId = conv.participants?.find((p: string) => p !== MY_PROFILE_ID);
      const otherProfile = (profilesData as any[]).find((p: any) => p.profileId === otherParticipantId);
      const messages = conv.messages || [];
      const lastMsg = messages[messages.length - 1];
      return {
        conversationId: conv.conversationId,
        otherProfile,
        lastMessage: lastMsg,
        lastMessageText: conv.lastMessage || (lastMsg?.text ?? ''),
        lastMessageTime: conv.lastMessageTime || lastMsg?.timestamp,
        unreadCount: conv.unreadCount || 0,
      };
    })
    .filter((c: any) => c.otherProfile)
    .slice(0, 30);

  const dummyCalls = [
    { id: '1', type: 'Incoming', time: 'Today, 2:30 PM', duration: '5:02', profile: (profilesData as any[])[1] },
    { id: '2', type: 'Outgoing', time: 'Yesterday, 10:15 AM', duration: 'Missed', profile: (profilesData as any[])[2] },
    { id: '3', type: 'Incoming', time: 'Yesterday, 6:45 PM', duration: '12:33', profile: (profilesData as any[])[4] },
    { id: '4', type: 'Missed', time: '2 days ago, 9:00 AM', duration: 'Missed', profile: (profilesData as any[])[7] },
  ];

  const renderChatItem = ({ item }: { item: any }) => {
    const isUnread = item.unreadCount > 0;
    const timeStr = item.lastMessageTime
      ? new Date(item.lastMessageTime).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true })
      : '';

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => router.push(`/chat/${item.conversationId}`)}
      >
        <Image
          source={{ uri: item.otherProfile?.profilePhotoURL || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' }}
          style={styles.avatar}
        />
        {isUnread && <View style={styles.onlineDot} />}
        <View style={styles.chatDetails}>
          <View style={styles.chatHeader}>
            <Text style={[styles.chatName, isUnread && styles.chatNameUnread]} numberOfLines={1}>
              {item.otherProfile?.name || 'Unknown'}
            </Text>
            <Text style={[styles.chatTime, isUnread && styles.chatTimeUnread]}>{timeStr}</Text>
          </View>
          <View style={styles.chatMessageRow}>
            <Text style={[styles.chatMessage, isUnread && styles.chatMessageUnread]} numberOfLines={1}>
              {item.lastMessageText || 'Tap to view conversation'}
            </Text>
            {isUnread && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadBadgeText}>{item.unreadCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderCallItem = ({ item }: { item: any }) => (
    <View style={styles.chatItem}>
      <Image
        source={{ uri: item.profile?.profilePhotoURL || 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400' }}
        style={styles.avatar}
      />
      <View style={styles.chatDetails}>
        <View style={styles.chatHeader}>
          <Text style={styles.chatName}>{item.profile?.name || 'Unknown'}</Text>
          <Text style={styles.chatTime}>{item.time}</Text>
        </View>
        <View style={styles.chatMessageRow}>
          <MaterialCommunityIcons
            name={item.type === 'Incoming' ? 'phone-incoming' : item.type === 'Missed' ? 'phone-missed' : 'phone-outgoing'}
            size={14}
            color={item.type === 'Incoming' ? '#27AE60' : item.type === 'Missed' ? '#E91E63' : '#C5A059'}
          />
          <Text style={styles.callTypeText}>
            {item.type} call • {item.duration}
          </Text>
        </View>
      </View>
      <TouchableOpacity style={styles.callBackButton}>
        <Ionicons name="call" size={20} color={PRIMARY} />
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9F6F0" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats & Calls</Text>
        <TouchableOpacity style={styles.searchIconBtn}>
          <Ionicons name="search-outline" size={22} color="#2C1A1D" />
        </TouchableOpacity>
      </View>

      {/* Main Tabs */}
      <View style={styles.mainTabs}>
        {(['Chats', 'Calls'] as const).map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.mainTab, activeMainTab === tab && styles.activeMainTab]}
            onPress={() => setActiveMainTab(tab)}
          >
            <Text style={[styles.mainTabText, activeMainTab === tab && styles.activeMainTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Premium gate banner */}
      {!isPremium && activeMainTab === 'Chats' && (
        <TouchableOpacity style={styles.premiumPrompt} onPress={() => router.push('/subscription')}>
          <MaterialCommunityIcons name="crown" size={16} color="#C5A059" />
          <Text style={styles.premiumPromptText}>Upgrade to Gold to chat with matches →</Text>
        </TouchableOpacity>
      )}

      {activeMainTab === 'Chats' ? (
        <>
          {/* Sub-filter tabs */}
          <View style={styles.filterTabs}>
            {([
              { key: 'All', label: `All (${chatList.length})` },
              { key: 'Accepted', label: 'Accepted' },
              { key: 'New', label: 'New Interests' },
            ] as const).map(({ key, label }) => (
              <TouchableOpacity
                key={key}
                style={[styles.filterTab, activeFilter === key && styles.activeFilterTab]}
                onPress={() => setActiveFilter(key)}
              >
                <Text style={[styles.filterTabText, activeFilter === key && styles.activeFilterTabText]}>
                  {label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {chatList.length > 0 ? (
            <FlatList
              data={chatList}
              keyExtractor={(item) => item.conversationId}
              renderItem={renderChatItem}
              contentContainerStyle={styles.listContent}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="chatbubbles-outline" size={64} color="#8C7A7C" />
              <Text style={styles.emptyStateText}>No conversations yet.</Text>
              <Text style={styles.emptyStateSubtext}>Send an interest to start chatting!</Text>
            </View>
          )}
        </>
      ) : (
        <FlatList
          data={dummyCalls}
          keyExtractor={(item) => item.id}
          renderItem={renderCallItem}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons name="call-outline" size={64} color="#8C7A7C" />
              <Text style={styles.emptyStateText}>No call history</Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
  },
  headerTitle: { fontSize: 22, fontWeight: '800', color: '#2C1A1D', fontFamily: 'serif' },
  searchIconBtn: { padding: 4 },
  mainTabs: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
  },
  mainTab: {
    flex: 1,
    paddingVertical: 13,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeMainTab: { borderBottomColor: PRIMARY },
  mainTabText: { fontSize: 15, fontWeight: '600', color: '#8C7A7C' },
  activeMainTabText: { color: PRIMARY, fontWeight: '800' },
  premiumPrompt: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF9E6',
    padding: 10,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
  },
  premiumPromptText: { color: '#C5A059', fontWeight: '700', fontSize: 13 },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
  },
  filterTab: {
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#FAF5F7',
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  activeFilterTab: { backgroundColor: PRIMARY, borderColor: PRIMARY },
  filterTabText: { fontSize: 12, color: '#5A4A4D', fontWeight: '600' },
  activeFilterTabText: { color: '#FFFFFF', fontWeight: '800' },
  listContent: { paddingBottom: 20 },
  chatItem: {
    flexDirection: 'row',
    padding: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
    alignItems: 'center',
    position: 'relative',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#F5EFE6',
  },
  onlineDot: {
    position: 'absolute',
    left: 52,
    top: 14,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#27AE60',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  chatDetails: { flex: 1, marginLeft: 12 },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  chatName: { fontSize: 15, fontWeight: '700', color: '#2C1A1D', flex: 1, fontFamily: 'serif' },
  chatNameUnread: { fontWeight: '800' },
  chatTime: { fontSize: 12, color: '#8C7A7C' },
  chatTimeUnread: { color: PRIMARY },
  chatMessageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chatMessage: { flex: 1, fontSize: 13, color: '#5A4A4D', marginRight: 8 },
  chatMessageUnread: { color: '#2C1A1D', fontWeight: '600' },
  unreadBadge: {
    backgroundColor: PRIMARY,
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5,
  },
  unreadBadgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '800' },
  callTypeText: { fontSize: 13, color: '#5A4A4D', marginLeft: 6 },
  callBackButton: { padding: 10 },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyStateText: { marginTop: 16, fontSize: 17, fontWeight: '800', color: '#2C1A1D', textAlign: 'center', fontFamily: 'serif' },
  emptyStateSubtext: { marginTop: 6, fontSize: 14, color: '#8C7A7C', textAlign: 'center' },
});
