import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';

export default function ProfileTab() {
  const router = useRouter();
  const { state, dispatch, profiles } = useApp();
  const [editModalVisible, setEditModalVisible] = useState(false);
  
  // For dummy purposes, use current user's profile if set, or default to P001
  const userProfile = state.myProfile || profiles.find(p => p.profileId === 'P001') || profiles[0];
  const { currentPlan } = state;

  const [editForm, setEditForm] = useState({
    name: userProfile?.name || '',
    age: userProfile?.age?.toString() || '',
    height: userProfile?.height || '',
    occupation: userProfile?.occupation || '',
    city: userProfile?.residentCity || ''
  });

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.replace('/');
  };

  const handleSaveProfile = () => {
    // Ideally dispatch update profile
    setEditModalVisible(false);
  };

  if (!userProfile) {
    return (
      <View style={styles.centerContainer}>
        <Text>Loading Profile...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image source={{ uri: userProfile.profilePhotoURL }} style={styles.profilePhoto} />
          <Text style={styles.userName}>{userProfile.name}, {userProfile.age}</Text>
          <Text style={styles.userId}>{userProfile.profileId}</Text>
          
          <View style={styles.planBadgeContainer}>
            <View style={[styles.planBadge, currentPlan === 'Free' ? styles.freeBadge : styles.premiumBadge]}>
              <Text style={styles.planBadgeText}>{currentPlan === 'Free' ? 'Free Member' : `${currentPlan} Member`}</Text>
            </View>
          </View>

          {currentPlan === 'Free' && (
            <TouchableOpacity style={styles.upgradeBtn} onPress={() => router.push('/subscription')}>
              <Text style={styles.upgradeBtnText}>Upgrade Plan</Text>
            </TouchableOpacity>
          )}

          <View style={styles.progressContainer}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressText}>Profile Completion</Text>
              <Text style={styles.progressPercent}>75%</Text>
            </View>
            <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, { width: '75%' }]} />
            </View>
            <Text style={styles.progressHint}>Complete your profile to get more matches</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Interests Received</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>5</Text>
            <Text style={styles.statLabel}>Interests Accepted</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statBox}>
            <Text style={styles.statValue}>234</Text>
            <Text style={styles.statLabel}>Profile Views</Text>
          </View>
        </View>

        {/* Menu Sections */}
        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>My Account</Text>
          <MenuItem icon="person-outline" title="Edit Profile" onPress={() => setEditModalVisible(true)} />
          <MenuItem icon="heart-outline" title="Partner Preferences" />
          <MenuItem icon="star-outline" title="My Subscription" onPress={() => router.push('/subscription')} />
          <MenuItem icon="shield-checkmark-outline" title="Verification Centre" onPress={() => router.push('/verification')} />
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Newspaper Integration</Text>
          <MenuItem icon="newspaper-outline" title="Link Rajasthan Patrika Ad" onPress={() => router.push('/newspaper-ads')} />
          {userProfile.isNewspaperAdLinked && (
            <MenuItem icon="document-text-outline" title="My Linked Ad" />
          )}
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Privacy & Safety</Text>
          <MenuItem icon="lock-closed-outline" title="Privacy Settings" />
          <MenuItem icon="close-circle-outline" title="Block & Report" />
          <MenuItem icon="bulb-outline" title="Safety Tips" />
          <MenuItem icon="key-outline" title="Change Password" />
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Support</Text>
          <MenuItem icon="help-circle-outline" title="Help & Support" />
          <MenuItem icon="call-outline" title="Contact Us" />
          <MenuItem icon="document-outline" title="Terms of Service" />
          <MenuItem icon="shield-outline" title="Privacy Policy" />
          <MenuItem icon="star-half-outline" title="Rate the App" />
        </View>

        <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#E74C3C" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
        
        <View style={styles.footerSpace} />
      </ScrollView>

      {/* Edit Profile Modal */}
      <Modal visible={editModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <TouchableOpacity onPress={() => setEditModalVisible(false)}>
                <Ionicons name="close" size={28} color="#333" />
              </TouchableOpacity>
            </View>
            <ScrollView>
              <Text style={styles.inputLabel}>Name</Text>
              <TextInput style={styles.input} value={editForm.name} onChangeText={t => setEditForm({...editForm, name: t})} />
              
              <Text style={styles.inputLabel}>Age</Text>
              <TextInput style={styles.input} value={editForm.age} keyboardType="numeric" onChangeText={t => setEditForm({...editForm, age: t})} />
              
              <Text style={styles.inputLabel}>Height</Text>
              <TextInput style={styles.input} value={editForm.height} onChangeText={t => setEditForm({...editForm, height: t})} />
              
              <Text style={styles.inputLabel}>Occupation</Text>
              <TextInput style={styles.input} value={editForm.occupation} onChangeText={t => setEditForm({...editForm, occupation: t})} />
              
              <Text style={styles.inputLabel}>City</Text>
              <TextInput style={styles.input} value={editForm.city} onChangeText={t => setEditForm({...editForm, city: t})} />

              <TouchableOpacity style={styles.saveBtn} onPress={handleSaveProfile}>
                <Text style={styles.saveBtnText}>Save Changes</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const MenuItem = ({ icon, title, onPress }: { icon: any, title: string, onPress?: () => void }) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={styles.menuItemLeft}>
      <Ionicons name={icon} size={24} color="#666" />
      <Text style={styles.menuItemText}>{title}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#CCC" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  scrollContent: {
    paddingBottom: 20,
  },
  headerContainer: {
    backgroundColor: '#FFF',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  profilePhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 12,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  userId: {
    fontSize: 14,
    color: '#888',
    marginBottom: 12,
  },
  planBadgeContainer: {
    marginBottom: 16,
  },
  planBadge: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  freeBadge: {
    backgroundColor: '#F0F0F0',
  },
  premiumBadge: {
    backgroundColor: '#FFD700',
  },
  planBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  upgradeBtn: {
    backgroundColor: '#C0392B',
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
    marginBottom: 20,
  },
  upgradeBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  progressContainer: {
    width: '100%',
    backgroundColor: '#F9F9F9',
    padding: 16,
    borderRadius: 12,
  },
  progressHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#555',
  },
  progressPercent: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#C0392B',
  },
  progressBarBg: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 8,
  },
  progressBarFill: {
    height: 6,
    backgroundColor: '#27AE60',
    borderRadius: 3,
  },
  progressHint: {
    fontSize: 12,
    color: '#777',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginTop: 12,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#C0392B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#EEE',
  },
  menuSection: {
    backgroundColor: '#FFF',
    marginTop: 12,
    paddingTop: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#444',
    marginLeft: 16,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    marginTop: 24,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EEE',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#E74C3C',
    marginLeft: 8,
  },
  footerSpace: {
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  inputLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
    color: '#333',
  },
  saveBtn: {
    backgroundColor: '#C0392B',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  saveBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  }
});
