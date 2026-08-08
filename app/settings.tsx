import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, StatusBar, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius, Shadow } from '../src/constants/theme';
import PremiumCard from '../src/components/ui/PremiumCard';
import { LinearGradient } from 'expo-linear-gradient';

export default function SettingsScreen() {
  const router = useRouter();
  const [notificationsEnabled, setNotificationsEnabled] = React.useState(true);
  const [privateMode, setPrivateMode] = React.useState(false);

  const SettingRow = ({ 
    icon, 
    title, 
    subtitle, 
    value, 
    onPress,
    isDestructive = false,
    hasToggle = false,
    toggleValue = false,
    onToggle,
  }: any) => (
    <TouchableOpacity 
      style={styles.settingRow} 
      onPress={onPress} 
      activeOpacity={hasToggle ? 1 : 0.7}
      disabled={hasToggle}
    >
      <View style={[styles.iconBox, isDestructive && styles.iconBoxDestructive]}>
        <Ionicons name={icon} size={22} color={isDestructive ? Colors.error : Colors.primaryDark} />
      </View>
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, isDestructive && styles.destructiveText]}>{title}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      
      {hasToggle ? (
        <Switch
          value={toggleValue}
          onValueChange={onToggle}
          trackColor={{ false: Colors.border, true: Colors.gold }}
          thumbColor={Colors.surface}
        />
      ) : (
        <View style={styles.settingAction}>
          {value && <Text style={styles.settingValue}>{value}</Text>}
          <Ionicons name="chevron-forward" size={20} color={Colors.textMuted} />
        </View>
      )}
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={Colors.gradient.background as any} style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.safeArea}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={24} color={Colors.primaryDark} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={{ width: 40 }} /> {/* Spacer */}
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* Account Section */}
          <Text style={styles.sectionTitle}>Account</Text>
          <PremiumCard variant="default" style={styles.sectionCard} noPadding>
            <SettingRow icon="person-outline" title="Edit Profile" onPress={() => {}} />
            <View style={styles.divider} />
            <SettingRow icon="shield-checkmark-outline" title="Security & Password" onPress={() => {}} />
            <View style={styles.divider} />
            <SettingRow icon="star-outline" title="Subscription Plan" value="Gold Premium" onPress={() => router.push('/subscription')} />
          </PremiumCard>

          {/* Preferences Section */}
          <Text style={styles.sectionTitle}>Preferences</Text>
          <PremiumCard variant="default" style={styles.sectionCard} noPadding>
            <SettingRow 
              icon="notifications-outline" 
              title="Push Notifications" 
              hasToggle 
              toggleValue={notificationsEnabled}
              onToggle={setNotificationsEnabled}
            />
            <View style={styles.divider} />
            <SettingRow 
              icon="eye-off-outline" 
              title="Incognito Mode" 
              subtitle="Browse profiles secretly"
              hasToggle 
              toggleValue={privateMode}
              onToggle={setPrivateMode}
            />
            <View style={styles.divider} />
            <SettingRow icon="language-outline" title="Language" value="English" onPress={() => {}} />
          </PremiumCard>

          {/* Help & Support */}
          <Text style={styles.sectionTitle}>Support</Text>
          <PremiumCard variant="default" style={styles.sectionCard} noPadding>
            <SettingRow icon="help-circle-outline" title="Help Center" onPress={() => {}} />
            <View style={styles.divider} />
            <SettingRow icon="document-text-outline" title="Terms & Privacy Policy" onPress={() => {}} />
          </PremiumCard>

          {/* Destructive Actions */}
          <View style={styles.dangerZone}>
            <PremiumCard variant="default" style={styles.sectionCard} noPadding>
              <SettingRow icon="log-out-outline" title="Log Out" isDestructive onPress={() => {}} />
            </PremiumCard>
          </View>

          <Text style={styles.versionText}>Patrika Matrimony App v1.0.0</Text>
          
        </ScrollView>
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
  backBtn: { padding: Spacing.xs, width: 40 },
  headerTitle: {
    fontSize: Typography.sizes.xl,
    fontFamily: Typography.fontFamily.serif,
    color: Colors.primaryDark,
  },
  scrollContent: {
    paddingHorizontal: Spacing.lg,
    paddingBottom: Spacing['4xl'],
    paddingTop: Spacing.md,
  },
  sectionTitle: {
    fontSize: Typography.sizes.md,
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.textSecondary,
    marginBottom: Spacing.sm,
    marginLeft: Spacing.xs,
    marginTop: Spacing.lg,
  },
  sectionCard: {
    overflow: 'hidden',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.surface,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.md,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  iconBoxDestructive: {
    backgroundColor: Colors.error + '15', // 15% opacity
  },
  settingInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  settingTitle: {
    fontSize: Typography.sizes.base,
    fontFamily: Typography.fontFamily.sansMedium,
    color: Colors.text,
  },
  settingSubtitle: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  destructiveText: {
    color: Colors.error,
  },
  settingAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  settingValue: {
    fontSize: Typography.sizes.sm,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginLeft: 76, // Align with text
  },
  dangerZone: {
    marginTop: Spacing.xl,
  },
  versionText: {
    textAlign: 'center',
    color: Colors.textMuted,
    fontSize: Typography.sizes.xs,
    fontFamily: Typography.fontFamily.sans,
    marginTop: Spacing.xl,
    marginBottom: Spacing.md,
  }
});
