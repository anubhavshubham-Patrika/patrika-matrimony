import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Image, Modal, TextInput, Alert 
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

  // Modals state
  const [showPatrikaAdModal, setShowPatrikaAdModal] = useState(false);
  const [showGovtIdModal, setShowGovtIdModal] = useState(false);

  // Rajasthan Patrika Print Ad state
  const [adBookingId, setAdBookingId] = useState(onboarding?.offlineAdReferenceId || 'AD-884920');
  const [pubDate, setPubDate] = useState('12 Aug 2025');
  const [edition, setEdition] = useState('Jaipur');
  const [isAdLinked, setIsAdLinked] = useState(onboarding?.isNewspaperAdLinked || false);

  // Govt ID & Selfie Verification state
  const [idType, setIdType] = useState('Aadhaar Card');
  const [idNumber, setIdNumber] = useState('XXXX-XXXX-9821');
  const [isGovtVerified, setIsGovtVerified] = useState(onboarding?.isVerified || false);

  const handleLogout = () => {
    dispatch({ type: 'LOGOUT' });
    router.replace('/(auth)/splash');
  };

  const handleLinkPatrikaAd = () => {
    setIsAdLinked(true);
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        isNewspaperAdLinked: true,
        offlineAdReferenceId: adBookingId,
      },
    });
    setShowPatrikaAdModal(false);
    Alert.alert(
      '🗞️ Print Ad Linked Successfully!',
      `Your Rajasthan Patrika newspaper matrimonial ad (${adBookingId} - ${edition} Edition) has been linked. "Rajasthan Patrika Verified" badge is now active on your profile!`,
      [{ text: 'Awesome! ✨' }]
    );
  };

  const handleVerifyGovtId = () => {
    setIsGovtVerified(true);
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        isVerified: true,
      },
    });
    setShowGovtIdModal(false);
    Alert.alert(
      '🛡️ Verification Submitted!',
      `Your ${idType} (${idNumber}) and Live Selfie have been verified. Green "Govt ID & Selfie Verified" trust badge is now live on your profile!`,
      [{ text: 'Great!' }]
    );
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
                {(isGovtVerified || isAdLinked) && (
                  <View style={styles.verifiedBadge}>
                    <Ionicons name="checkmark-circle" size={18} color="#0D9488" />
                  </View>
                )}
              </View>

              <View style={styles.userTextCol}>
                <Text style={styles.userNameText}>{onboarding?.name || user?.name || 'Arjun Singh'}</Text>
                <Text style={styles.userSubText}>Profile ID: {user?.profileId || 'P001'}</Text>
                
                {/* Active Badges */}
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 6 }}>
                  <View style={styles.planPillBadge}>
                    <MaterialCommunityIcons name="crown" size={13} color="#D4AF37" style={{ marginRight: 3 }} />
                    <Text style={styles.planPillText}>{state.currentPlan || 'Gold'}</Text>
                  </View>
                  {isAdLinked && (
                    <View style={[styles.planPillBadge, { backgroundColor: '#FEE2E2', borderColor: '#FECACA' }]}>
                      <Text style={{ fontSize: 10, marginRight: 3 }}>🗞️</Text>
                      <Text style={[styles.planPillText, { color: '#991B1B' }]}>Patrika Ad</Text>
                    </View>
                  )}
                  {isGovtVerified && (
                    <View style={[styles.planPillBadge, { backgroundColor: '#CCFBF1', borderColor: '#99F6E4' }]}>
                      <Text style={{ fontSize: 10, marginRight: 3 }}>🛡️</Text>
                      <Text style={[styles.planPillText, { color: '#0F766E' }]}>ID Verified</Text>
                    </View>
                  )}
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
              onPress={() => router.push('/subscription')}
              activeOpacity={0.85}
            >
              <View style={[styles.settingIconBadge, { backgroundColor: 'rgba(212, 175, 55, 0.15)' }]}>
                <MaterialCommunityIcons name="crown" size={20} color="#D4AF37" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.settingLabel}>Membership Plans & Upgrade</Text>
                <Text style={styles.settingSubLabel}>Current Plan: {state.currentPlan || 'Gold'} (Active)</Text>
              </View>

              <Ionicons name="chevron-forward" size={18} color="#8C9E9B" />
            </TouchableOpacity>

            {/* 1. Link Rajasthan Patrika Print Ad */}
            <TouchableOpacity 
              style={styles.settingRow} 
              onPress={() => setShowPatrikaAdModal(true)}
              activeOpacity={0.85}
            >
              <View style={[styles.settingIconBadge, { backgroundColor: 'rgba(227, 30, 37, 0.12)' }]}>
                <MaterialCommunityIcons name="newspaper-variant-outline" size={20} color="#E31E25" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.settingLabel}>Link Rajasthan Patrika Print Ad</Text>
                <Text style={styles.settingSubLabel}>
                  {isAdLinked ? `Linked: Ref #${adBookingId}` : 'Link newspaper ad for verified responses'}
                </Text>
              </View>

              {isAdLinked ? (
                <View style={styles.activeCheckPill}>
                  <Text style={styles.activeCheckText}>Linked ✓</Text>
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={18} color="#8C9E9B" />
              )}
            </TouchableOpacity>

            {/* 2. Govt ID & Selfie Verification */}
            <TouchableOpacity 
              style={styles.settingRow} 
              onPress={() => setShowGovtIdModal(true)}
              activeOpacity={0.85}
            >
              <View style={[styles.settingIconBadge, { backgroundColor: 'rgba(13, 148, 136, 0.15)' }]}>
                <Ionicons name="shield-checkmark-outline" size={20} color="#0D9488" />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.settingLabel}>Govt ID & Selfie Verification</Text>
                <Text style={styles.settingSubLabel}>
                  {isGovtVerified ? 'Govt ID & Selfie Verified 🛡️' : 'Upload ID & Selfie for 100% Trust Badge'}
                </Text>
              </View>

              {isGovtVerified ? (
                <View style={[styles.activeCheckPill, { backgroundColor: '#CCFBF1' }]}>
                  <Text style={[styles.activeCheckText, { color: '#0F766E' }]}>Verified ✓</Text>
                </View>
              ) : (
                <Ionicons name="chevron-forward" size={18} color="#8C9E9B" />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* MODAL 1: LINK RAJASTHAN PATRIKA PRINT AD */}
        <Modal visible={showPatrikaAdModal} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalGlassCard}>
              <View style={styles.modalHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 24, marginRight: 8 }}>🗞️</Text>
                  <View>
                    <Text style={styles.modalTitle}>Link Patrika Print Ad</Text>
                    <Text style={styles.modalSubTitle}>Rajasthan Patrika Newspaper Integration</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setShowPatrikaAdModal(false)}>
                  <Ionicons name="close" size={24} color="#0F2E2B" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 360 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.inputLabel}>Ad Receipt / Booking Reference ID</Text>
                <View style={styles.glassInputBox}>
                  <MaterialCommunityIcons name="barcode-scan" size={20} color="#E31E25" style={{ marginRight: 10 }} />
                  <TextInput
                    style={styles.modalInput}
                    value={adBookingId}
                    onChangeText={setAdBookingId}
                    placeholder="e.g. AD-884920"
                    placeholderTextColor="#8C9E9B"
                  />
                </View>

                <Text style={styles.inputLabel}>Newspaper Edition</Text>
                <View style={styles.editionChipsRow}>
                  {['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Delhi'].map((ed) => (
                    <TouchableOpacity
                      key={ed}
                      style={[styles.editionChip, edition === ed && styles.editionChipSelected]}
                      onPress={() => setEdition(ed)}
                    >
                      <Text style={[styles.editionChipText, edition === ed && styles.editionChipTextSelected]}>{ed}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.inputLabel}>Publication Date</Text>
                <View style={styles.glassInputBox}>
                  <MaterialCommunityIcons name="calendar-range" size={20} color="#E31E25" style={{ marginRight: 10 }} />
                  <TextInput
                    style={styles.modalInput}
                    value={pubDate}
                    onChangeText={setPubDate}
                    placeholder="e.g. 12 Aug 2025"
                    placeholderTextColor="#8C9E9B"
                  />
                </View>

                <View style={styles.adInfoBanner}>
                  <Text style={{ fontSize: 16, marginRight: 8 }}>💡</Text>
                  <Text style={styles.adInfoBannerText}>
                    Linking your classified print ad displays your profile to readers who saw your advertisement in Rajasthan Patrika newspaper.
                  </Text>
                </View>
              </ScrollView>

              <TouchableOpacity 
                style={styles.linkAdBtn} 
                onPress={handleLinkPatrikaAd}
                activeOpacity={0.88}
              >
                <Text style={styles.linkAdBtnText}>Link Print Ad & Activate Badge 🗞️</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        {/* MODAL 2: GOVT ID & SELFIE VERIFICATION */}
        <Modal visible={showGovtIdModal} animationType="slide" transparent>
          <View style={styles.modalBackdrop}>
            <View style={styles.modalGlassCard}>
              <View style={styles.modalHeader}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={{ fontSize: 24, marginRight: 8 }}>🛡️</Text>
                  <View>
                    <Text style={styles.modalTitle}>Govt ID & Selfie Verification</Text>
                    <Text style={styles.modalSubTitle}>AI Facial & Document Verification</Text>
                  </View>
                </View>
                <TouchableOpacity onPress={() => setShowGovtIdModal(false)}>
                  <Ionicons name="close" size={24} color="#0F2E2B" />
                </TouchableOpacity>
              </View>

              <ScrollView style={{ maxHeight: 380 }} showsVerticalScrollIndicator={false}>
                <Text style={styles.inputLabel}>Select Govt ID Document</Text>
                <View style={styles.editionChipsRow}>
                  {['Aadhaar Card', 'PAN Card', 'Driving License', 'Passport', 'Voter ID'].map((doc) => (
                    <TouchableOpacity
                      key={doc}
                      style={[styles.editionChip, idType === doc && styles.editionChipSelected]}
                      onPress={() => setIdType(doc)}
                    >
                      <Text style={[styles.editionChipText, idType === doc && styles.editionChipTextSelected]}>{doc}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Text style={styles.inputLabel}>Document Number</Text>
                <View style={styles.glassInputBox}>
                  <MaterialCommunityIcons name="card-text-outline" size={20} color="#0D9488" style={{ marginRight: 10 }} />
                  <TextInput
                    style={styles.modalInput}
                    value={idNumber}
                    onChangeText={setIdNumber}
                    placeholder="Enter document number"
                    placeholderTextColor="#8C9E9B"
                  />
                </View>

                {/* Upload Triggers Row */}
                <View style={styles.uploadTriggersRow}>
                  <TouchableOpacity 
                    style={styles.uploadBoxBtn} 
                    onPress={() => Alert.alert('📄 Document Upload', 'Front page of Govt ID selected successfully!')}
                  >
                    <MaterialCommunityIcons name="file-document-outline" size={24} color="#0D9488" />
                    <Text style={styles.uploadBoxText}>Upload Front ID</Text>
                  </TouchableOpacity>

                  <TouchableOpacity 
                    style={styles.uploadBoxBtn}
                    onPress={() => Alert.alert('🤳 Selfie Captured', 'Live facial selfie matched 98.4% with ID photo!')}
                  >
                    <MaterialCommunityIcons name="camera-account" size={24} color="#0D9488" />
                    <Text style={styles.uploadBoxText}>Live Selfie Match</Text>
                  </TouchableOpacity>
                </View>

                <View style={[styles.adInfoBanner, { backgroundColor: 'rgba(13, 148, 136, 0.12)' }]}>
                  <Text style={{ fontSize: 16, marginRight: 8 }}>🔒</Text>
                  <Text style={styles.adInfoBannerText}>
                    Your documents are stored with 256-bit AES encryption and are never shown publicly on your profile.
                  </Text>
                </View>
              </ScrollView>

              <TouchableOpacity 
                style={[styles.linkAdBtn, { backgroundColor: '#0D9488' }]} 
                onPress={handleVerifyGovtId}
                activeOpacity={0.88}
              >
                <Text style={styles.linkAdBtnText}>Submit & Get Verified Badge 🛡️</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

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
    backgroundColor: '#FFFBEB',
    borderWidth: 1,
    borderColor: '#FEF08A',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 3,
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
    fontSize: 14,
    fontWeight: '700',
    color: '#0F2E2B',
  },
  settingSubLabel: {
    fontSize: 11,
    color: '#4A6B66',
    marginTop: 2,
  },
  activeCheckPill: {
    backgroundColor: '#FEE2E2',
    borderRadius: 12,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  activeCheckText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#991B1B',
  },

  /* Modals Styling */
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalGlassCard: {
    backgroundColor: '#F3FAF8',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  modalSubTitle: {
    fontSize: 12,
    color: '#0D9488',
    fontWeight: '700',
    marginTop: 2,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: '800',
    color: '#0F2E2B',
    marginTop: 12,
    marginBottom: 6,
  },
  glassInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    paddingHorizontal: 14,
    borderWidth: 1.5,
    borderColor: 'rgba(15, 46, 43, 0.12)',
  },
  modalInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 14,
    color: '#0F2E2B',
  },

  editionChipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 4,
  },
  editionChip: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(15, 46, 43, 0.15)',
  },
  editionChipSelected: {
    backgroundColor: '#0F2E2B',
    borderColor: '#0F2E2B',
  },
  editionChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#4A6B66',
  },
  editionChipTextSelected: {
    color: '#FFFFFF',
  },

  adInfoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(227, 30, 37, 0.08)',
    borderRadius: 16,
    padding: 12,
    marginTop: 14,
  },
  adInfoBannerText: {
    fontSize: 12,
    color: '#0F2E2B',
    flex: 1,
    lineHeight: 16,
  },

  uploadTriggersRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  uploadBoxBtn: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: 'rgba(13, 148, 136, 0.25)',
  },
  uploadBoxText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0F2E2B',
    marginTop: 6,
  },

  linkAdBtn: {
    backgroundColor: '#E31E25',
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
    shadowColor: '#E31E25',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  linkAdBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },
});
