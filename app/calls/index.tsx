import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, StatusBar, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../../src/constants/theme';
import PremiumCard from '../../src/components/ui/PremiumCard';
import { LinearGradient } from 'expo-linear-gradient';

export default function CallsScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'All' | 'Incoming' | 'Outgoing' | 'Missed'>('All');

  // Dummy calls data
  const callsData = [
    { id: '1', name: 'Aarav Sharma', type: 'Missed', time: 'Today, 2:30 PM', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
    { id: '2', name: 'Priya Patel', type: 'Incoming', time: 'Yesterday, 8:15 PM', avatar: 'https://randomuser.me/api/portraits/women/44.jpg' },
    { id: '3', name: 'Rohan Gupta', type: 'Outgoing', time: 'Mon, 10:00 AM', avatar: 'https://randomuser.me/api/portraits/men/45.jpg' },
  ];

  const filteredCalls = callsData.filter(call => activeTab === 'All' || call.type === activeTab);

  const renderCallIcon = (type: string) => {
    switch(type) {
      case 'Missed': return <Ionicons name="call" size={16} color={Colors.error} />;
      case 'Incoming': return <Ionicons name="arrow-down-circle" size={16} color={Colors.success} />;
      case 'Outgoing': return <Ionicons name="arrow-up-circle" size={16} color={Colors.primaryLight} />;
      default: return <Ionicons name="call" size={16} color={Colors.textMuted} />;
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
          <Text style={styles.headerTitle}>Calls</Text>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="call-outline" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Custom Tabs */}
        <View style={styles.tabsContainer}>
          {['All', 'Incoming', 'Outgoing', 'Missed'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabBtn, activeTab === tab && styles.activeTabBtn]}
              onPress={() => setActiveTab(tab as any)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Calls List */}
        {filteredCalls.length > 0 ? (
          <FlatList
            data={filteredCalls}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <PremiumCard variant="default" style={styles.callCard} noPadding>
                <View style={styles.callContent}>
                  <Image source={{ uri: item.avatar }} style={styles.avatar} />
                  <View style={styles.callInfo}>
                    <Text style={[styles.nameText, item.type === 'Missed' && { color: Colors.error }]}>{item.name}</Text>
                    <View style={styles.callMeta}>
                      {renderCallIcon(item.type)}
                      <Text style={styles.timeText}>{item.time}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons name="call-outline" size={22} color={Colors.primary} />
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.actionBtn}>
                    <Ionicons name="videocam-outline" size={22} color={Colors.primary} />
                  </TouchableOpacity>
                </View>
              </PremiumCard>
            )}
          />
        ) : (
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Ionicons name="call-outline" size={48} color={Colors.primarySoft} />
            </View>
            <Text style={styles.emptyTitle}>No {activeTab !== 'All' ? activeTab : ''} Calls Yet</Text>
            <Text style={styles.emptySub}>Looks like your call history is clear. Connect with your matches via voice or video calls!</Text>
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
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  tabBtn: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    borderRadius: BorderRadius.pill,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  activeTabBtn: {
    backgroundColor: Colors.primaryDark,
    borderColor: Colors.primaryDark,
  },
  tabText: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sansMedium,
    color: Colors.textSecondary,
  },
  activeTabText: {
    color: Colors.surface,
  },
  listContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['3xl'],
  },
  callCard: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  callContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: BorderRadius.full,
    marginRight: Spacing.md,
  },
  callInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  nameText: {
    fontSize: Typography.sizes.md,
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.primaryDark,
    marginBottom: 4,
  },
  callMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  timeText: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.textMuted,
  },
  actionBtn: {
    padding: Spacing.sm,
    marginLeft: Spacing.xs,
    backgroundColor: Colors.background,
    borderRadius: BorderRadius.full,
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
