import React from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, Image, StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp, Profile } from '../../src/context/AppContext';
import chatsData from '../../src/data/chats.json';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants/theme';
import PremiumCard from '../../src/components/ui/PremiumCard';
import { LinearGradient } from 'expo-linear-gradient';

export default function ChatsScreen() {
  const router = useRouter();
  const { profiles } = useApp();
  const currentUserId = 'P001';

  // Filter conversations involving P001
  const userConversations = chatsData.filter((c: any) => c.participants.includes(currentUserId));

  return (
    <LinearGradient colors={Colors.gradient.background as any} style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        {/* Header Bar */}
        <View style={styles.topHeader}>
          <Text style={styles.headerTitle}>Messages</Text>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={() => (router as any).push('/calls')} style={styles.iconBtn}>
              <Ionicons name="call-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => router.push('/settings')} style={styles.iconBtn}>
              <Ionicons name="settings-outline" size={24} color={Colors.primary} />
            </TouchableOpacity>
          </View>
        </View>

        {userConversations.length > 0 ? (
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
                  onPress={() => router.push(`/chat/${item.conversationId}`)}
                  activeOpacity={0.8}
                  style={styles.cardWrapper}
                >
                  <PremiumCard variant="default" style={styles.chatRowCard} noPadding>
                    <View style={styles.avatarWrapper}>
                      <Image
                        source={{ uri: otherProfile.profilePhotoURL || 'https://randomuser.me/api/portraits/women/44.jpg' }}
                        style={styles.avatarPhoto}
                      />
                      {otherProfile.isVerified && (
                        <View style={styles.verifiedDot}>
                          <Ionicons name="checkmark-circle" size={14} color={Colors.success} />
                        </View>
                      )}
                    </View>

                    <View style={styles.chatInfoCol}>
                      <View style={styles.chatTopRow}>
                        <Text style={styles.partnerNameText} numberOfLines={1}>{otherProfile.name}</Text>
                        <Text style={styles.timeText}>10:45 AM</Text>
                      </View>

                      <Text style={[styles.lastMsgText, item.unreadCount ? styles.lastMsgUnread : null]} numberOfLines={1}>
                        {item.lastMessage || 'Namaste! I liked your matrimony profile.'}
                      </Text>
                    </View>

                    {item.unreadCount ? (
                      <View style={styles.unreadBadge}>
                        <Text style={styles.unreadCountText}>{item.unreadCount}</Text>
                      </View>
                    ) : null}
                  </PremiumCard>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <Ionicons name="chatbubbles-outline" size={64} color={Colors.primarySoft} style={{ marginBottom: Spacing.md }} />
            <Text style={styles.emptyTitle}>Start a Conversation</Text>
            <Text style={styles.emptySub}>Let's refine your preferences and find your perfect match to chat with.</Text>
          </View>
        )}
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
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.sizes['2xl'],
    fontFamily: Typography.fontFamily.serif,
    color: Colors.primaryDark,
  },
  headerActions: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  iconBtn: {
    padding: Spacing.xs,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: 90,
    paddingTop: Spacing.sm,
  },
  cardWrapper: {
    marginBottom: Spacing.md,
  },
  chatRowCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
  },
  avatarWrapper: {
    position: 'relative',
    marginRight: Spacing.md,
  },
  avatarPhoto: {
    width: 60,
    height: 60,
    borderRadius: BorderRadius.full,
    borderWidth: 2,
    borderColor: Colors.surfaceWarm,
  },
  verifiedDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.full,
    padding: 2,
  },
  chatInfoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  chatTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  partnerNameText: {
    fontSize: Typography.sizes.lg,
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.primaryDark,
    flex: 1,
  },
  timeText: {
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    fontFamily: Typography.fontFamily.sans,
    marginLeft: Spacing.sm,
  },
  lastMsgText: {
    fontSize: Typography.sizes.md,
    color: Colors.textSecondary,
    fontFamily: Typography.fontFamily.sans,
  },
  lastMsgUnread: {
    fontFamily: Typography.fontFamily.sansMedium,
    color: Colors.primaryDark,
  },
  unreadBadge: {
    backgroundColor: Colors.gold,
    borderRadius: BorderRadius.full,
    minWidth: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.sm,
    paddingHorizontal: 8,
  },
  unreadCountText: {
    color: Colors.primaryDark,
    fontSize: Typography.sizes.xs,
    fontFamily: Typography.fontFamily.sansBold,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
  },
  emptyTitle: {
    fontSize: Typography.sizes.xl,
    fontFamily: Typography.fontFamily.serif,
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  emptySub: {
    fontSize: Typography.sizes.md,
    color: Colors.textSecondary,
    fontFamily: Typography.fontFamily.sans,
    marginTop: Spacing.sm,
    textAlign: 'center',
    lineHeight: 22,
  },
});
