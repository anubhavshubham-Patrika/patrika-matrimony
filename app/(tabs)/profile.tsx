import React from 'react';
import { 
  View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import MintGlassBackground from '../../src/components/MintGlassBackground';

export default function ProfileTabScreen() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const user = state.currentUser;
  const onboarding = state.onboardingData;

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.replace('/(auth)/splash');
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.topHeader}>
          <Text style={styles.headerTitle}>My Profile</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
            <Ionicons name="log-out-outline" size={20} color="#E31E25" />
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Main User Card */}
          <View style={styles.profileGlassCard}>
            <View style={styles.avatarRow}>
              <View style={styles.photoContainer}>
                <Image
                  source={{ uri: onboarding?.profilePhotoURL || 'https://randomuser.me/api/portraits/men/32.jpg' }}
                  style={styles.profilePhoto}
                />
                <View style={styles.verifiedBadge}>
                  <Ionicons name="checkmark-circle" size={16} color="#0D9488" />
                </View>
              </View>

              <View style={styles.userTextCol}>
                <Text style={styles.userNameText}>{onboarding?.name || user?.name || 'Arjun Singh'}</Text>
                <Text style={styles.userSubText}>Profile ID: {user?.profileId || 'P001'}</Text>
                <View style={styles.planPillBadge}>
                  <MaterialCommunityIcons name="crown" size={14} color="#D4AF37" style={{ marginRight: 4 }} />
                  <Text style={styles.planPillText}>{state.currentPlan || 'Gold'} Member</Text>
                </View>
              </View>
            </View>

            {/* Quick Stats Grid */}
            <View style={styles.statsGlassGrid}>
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>142</Text>
                <Text style={styles.statLabel}>Profile Views</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{state.sentInterests?.length || 28}</Text>
                <Text style={styles.statLabel}>Interests</Text>
              </View>
              <View style={styles.statDivider} />
              <View style={styles.statBox}>
                <Text style={styles.statNumber}>{state.shortlistedProfiles?.length || 19}</Text>
                <Text style={styles.statLabel}>Shortlists</Text>
              </View>
            </View>

            <TouchableOpacity 
              style={styles.editProfileBtn} 
              onPress={() => router.push('/(auth)/onboarding/step1')}
              activeOpacity={0.88}
            >
              <Ionicons name="create-outline" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
              <Text style={styles.editProfileText}>Edit Matrimonial Profile</Text>
            </TouchableOpacity>
          </View>

          {/* Profile Information Summary */}
          <View style={styles.infoGlassCard}>
            <Text style={styles.groupTitle}>Profile Summary Information</Text>

            <View style={styles.detailsGrid}>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Full Name</Text>
                <Text style={styles.gridValue}>{onboarding?.name || user?.name || 'Arjun Singh'}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Mobile Number</Text>
                <Text style={styles.gridValue}>{user?.mobile || '+91-9876543210'}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Email Address</Text>
                <Text style={styles.gridValue}>{user?.email || 'arjun@example.com'}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Profile Created For</Text>
                <Text style={styles.gridValue}>{onboarding?.profileFor || 'Self'}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Mother Tongue</Text>
                <Text style={styles.gridValue}>{onboarding?.motherTongue || 'Hindi'}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Religion & Caste</Text>
                <Text style={styles.gridValue}>{onboarding?.religion || 'Hindu'} ({onboarding?.caste || 'Rajput'})</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Resident Location</Text>
                <Text style={styles.gridValue}>{onboarding?.residentCity || 'Jaipur'}, {onboarding?.residentState || 'Rajasthan'}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Highest Education</Text>
                <Text style={styles.gridValue}>{onboarding?.education?.degree || 'B.Tech'}</Text>
              </View>
              <View style={styles.gridItem}>
                <Text style={styles.gridLabel}>Occupation</Text>
                <Text style={styles.gridValue}>{onboarding?.occupation || 'Software Engineer'}</Text>
              </View>
            </View>
          </View>

          {/* Account Settings Glass List */}
          <View style={styles.settingsGroupGlassCard}>
            <Text style={styles.groupTitle}>Account & Subscription</Text>

            <TouchableOpacity 
              style={styles.settingRow} 
              onPress={() => router.push('/plans')}
              activeOpacity={0.85}
            >
              <View style={[styles.settingIconBadge, { backgroundColor: 'rgba(212, 175, 55, 0.15)' }]}>
                <MaterialCommunityIcons name="crown" size={20} color="#D4AF37" />
              </View>
              <Text style={styles.settingLabel}>Membership Plans & Upgrade</Text>
              <Ionicons name="chevron-forward" size={18} color="#8C9E9B" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingRow} activeOpacity={0.85}>
              <View style={[styles.settingIconBadge, { backgroundColor: 'rgba(227, 30, 37, 0.12)' }]}>
                <MaterialCommunityIcons name="newspaper-variant-outline" size={20} color="#E31E25" />
              </View>
              <Text style={styles.settingLabel}>Link Rajasthan Patrika Print Ad</Text>
              <Ionicons name="chevron-forward" size={18} color="#8C9E9B" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.settingRow} activeOpacity={0.85}>
              <View style={[styles.settingIconBadge, { backgroundColor: 'rgba(13, 148, 136, 0.15)' }]}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#0D9488" />
              </View>
              <Text style={styles.settingLabel}>Govt ID & Selfie Verification</Text>
              <Ionicons name="chevron-forward" size={18} color="#8C9E9B" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </MintGlassBackground>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
  logoutBtn: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(227, 30, 37, 0.1)',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },

  profileGlassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 26,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  photoContainer: {
    position: 'relative',
    marginRight: 14,
  },
  profilePhoto: {
    width: 68,
    height: 68,
    borderRadius: 34,
    borderWidth: 2,
    borderColor: '#0D9488',
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
  },
  userTextCol: {
    flex: 1,
  },
  userNameText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  userSubText: {
    fontSize: 12,
    color: '#4A6B66',
    marginTop: 2,
  },
  planPillBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF08A',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginTop: 6,
  },
  planPillText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#854D0E',
  },

  statsGlassGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 46, 43, 0.04)',
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E2B',
  },
  statLabel: {
    fontSize: 11,
    color: '#4A6B66',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(15, 46, 43, 0.12)',
  },

  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F2E2B',
    borderRadius: 20,
    paddingVertical: 13,
  },
  editProfileText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },

  infoGlassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 26,
    padding: 18,
    marginBottom: 14,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },

  detailsGrid: {
    gap: 10,
    marginTop: 4,
  },
  gridItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 46, 43, 0.06)',
  },
  gridLabel: {
    fontSize: 13,
    color: '#4A6B66',
  },
  gridValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F2E2B',
  },

  settingsGroupGlassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 26,
    padding: 18,
  },
  groupTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
    marginBottom: 14,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(15, 46, 43, 0.06)',
  },
  settingIconBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingLabel: {
    flex: 1,
    fontSize: 14,
    fontWeight: '700',
    color: '#0F2E2B',
  },
});
