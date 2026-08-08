import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../src/constants/theme';
import PremiumCard from '../src/components/ui/PremiumCard';
import { LinearGradient } from 'expo-linear-gradient';

export default function NotificationsScreen() {
  const router = useRouter();

  const notifications = [
    { id: '1', title: 'New Match!', message: 'Priya Patel liked your profile.', time: '10m ago', type: 'match', read: false },
    { id: '2', title: 'Profile Visitor', message: 'Someone from Mumbai viewed your profile.', time: '1h ago', type: 'visitor', read: false },
    { id: '3', title: 'Message from Aarav', message: '"Namaste, how are you?"', time: 'Yesterday', type: 'message', read: true },
    { id: '4', title: 'System Update', message: 'Your profile is now 80% complete. Add hobbies!', time: '2 days ago', type: 'system', read: true },
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'match': return <MaterialCommunityIcons name="heart-circle" size={32} color={Colors.error} />;
      case 'visitor': return <Ionicons name="eye" size={30} color={Colors.primaryLight} />;
      case 'message': return <Ionicons name="chatbubble-ellipses" size={28} color={Colors.teal} />;
      case 'system': return <Ionicons name="settings" size={28} color={Colors.gold} />;
      default: return <Ionicons name="notifications" size={28} color={Colors.primary} />;
    }
  };

  return (
    <LinearGradient colors={Colors.gradient.background as any} style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={Colors.primaryDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Notifications</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="checkmark-done-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* List */}
        {notifications.length > 0 ? (
          <FlatList
            data={notifications}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <PremiumCard 
                variant={item.read ? 'default' : 'highlight'} 
                style={[styles.notificationCard, !item.read && styles.unreadCard]}
                noPadding
              >
                <TouchableOpacity style={styles.cardContent} activeOpacity={0.7}>
                  <View style={styles.iconContainer}>
                    {getIcon(item.type)}
                  </View>
                  <View style={styles.infoCol}>
                    <View style={styles.titleRow}>
                      <Text style={[styles.title, !item.read && styles.unreadText]}>{item.title}</Text>
                      <Text style={styles.time}>{item.time}</Text>
                    </View>
                    <Text style={styles.message} numberOfLines={2}>{item.message}</Text>
                  </View>
                  {!item.read && <View style={styles.unreadDot} />}
                </TouchableOpacity>
              </PremiumCard>
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="notifications-outline" size={48} color={Colors.primarySoft} />
            </View>
            <Text style={styles.emptyTitle}>You're all caught up!</Text>
            <Text style={styles.emptySub}>When you get matches, messages, or profile visits, they'll appear right here.</Text>
          </View>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  safeArea: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  backBtn: { padding: Spacing.xs },
  iconBtn: { padding: Spacing.xs },
  headerTitle: {
    fontSize: Typography.sizes.xl,
    fontFamily: Typography.fontFamily.serif,
    color: Colors.primaryDark,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing['3xl'],
  },
  notificationCard: {
    marginBottom: Spacing.md,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: Colors.gold,
  },
  cardContent: {
    flexDirection: 'row',
    padding: Spacing.md,
    alignItems: 'center',
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
    ...Shadow.sm,
  },
  infoCol: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  title: {
    fontSize: Typography.sizes.md,
    fontFamily: Typography.fontFamily.sansMedium,
    color: Colors.text,
    flex: 1,
  },
  unreadText: {
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.primaryDark,
  },
  time: {
    fontSize: 11,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.textMuted,
    marginLeft: Spacing.sm,
  },
  message: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.textSecondary,
    lineHeight: 18,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginLeft: Spacing.sm,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing['2xl'],
  },
  emptyIconCircle: {
    width: 96,
    height: 96,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
    ...Shadow.sm,
  },
  emptyTitle: {
    fontSize: Typography.sizes.lg,
    fontFamily: Typography.fontFamily.serif,
    color: Colors.primaryDark,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  emptySub: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  }
});
