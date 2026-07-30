import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Image, 
  TouchableOpacity, 
  Dimensions, 
  Modal, 
  SafeAreaView,
  StatusBar,
  Platform
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import profilesData from '../../src/data/profiles.json';

const { width } = Dimensions.get('window');

// Mock types since we might not have them exported
type Profile = any; 

const ProfileDetailScreen = () => {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { state } = useApp();
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isHoroscopeExpanded, setIsHoroscopeExpanded] = useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [bottomSheetContent, setBottomSheetContent] = useState({ title: '', desc: '' });
  
  const [isShortlisted, setIsShortlisted] = useState(false);
  const [interestSent, setInterestSent] = useState(false);
  const [galleryFullscreenVisible, setGalleryFullscreenVisible] = useState(false);

  const allProfiles = profilesData as any[];

  useEffect(() => {
    if (id) {
      const foundProfile = allProfiles.find((p: any) => p.profileId === id);
      if (foundProfile) {
        setProfile(foundProfile);
      } else {
        setProfile(allProfiles[0]);
      }
    }
  }, [id]);

  if (!profile) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading profile...</Text>
      </View>
    );
  }

  const photos = [profile.profilePhotoURL, ...(profile.galleryPhotoURLs || [])].filter(Boolean);
  const currentPhoto = photos[currentPhotoIndex];
  
  const isFreePlan = state.currentPlan === 'Free';

  const handlePhotoTap = () => {
    if (photos.length > 1) {
      setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
    }
  };

  const handleLockedAction = (actionName: string) => {
    if (isFreePlan) {
      setBottomSheetContent({
        title: 'Upgrade to Gold',
        desc: `Upgrade your plan to Gold to unlock ${actionName} and connect directly.`
      });
      setBottomSheetVisible(true);
    } else {
      // Perform action
    }
  };

  const showVerificationInfo = (badge: string) => {
    setBottomSheetContent({
      title: `${badge} Verified`,
      desc: `This user has successfully verified their ${badge.toLowerCase()} with us.`
    });
    setBottomSheetVisible(true);
  };

  const renderSectionHeader = (title: string, icon: keyof typeof Ionicons.glyphMap) => (
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={20} color="#D81B60" style={styles.sectionIcon} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  const renderDetailRow = (icon: keyof typeof MaterialCommunityIcons.glyphMap, label: string, value: string) => (
    <View style={styles.detailRow}>
      <View style={styles.detailLabelContainer}>
        <MaterialCommunityIcons name={icon} size={18} color="#666" style={styles.detailIcon} />
        <Text style={styles.detailLabel}>{label}</Text>
      </View>
      <Text style={styles.detailValue}>{value || 'Not Specified'}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        {/* 1. Hero Photo Section */}
        <View style={styles.heroContainer}>
          <TouchableOpacity activeOpacity={0.9} onPress={handlePhotoTap}>
            <Image source={{ uri: currentPhoto }} style={styles.heroImage} />
            <View style={styles.heroOverlay} />
          </TouchableOpacity>
          
          <View style={styles.heroTopBar}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#FFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="share-social" size={24} color="#FFF" />
            </TouchableOpacity>
          </View>

          {photos.length > 1 && (
            <View style={styles.paginationDots}>
              {photos.map((_, idx) => (
                <View 
                  key={idx} 
                  style={[styles.dot, currentPhotoIndex === idx && styles.activeDot]} 
                />
              ))}
            </View>
          )}
        </View>

        {/* 2. Name & Basic Info Card */}
        <View style={styles.basicInfoCard}>
          <View style={styles.nameRow}>
            <Text style={styles.nameText}>{profile.name}, {profile.age}</Text>
            {profile.matchPercentage && (
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>{profile.matchPercentage}% Match</Text>
              </View>
            )}
          </View>
          
          <View style={styles.locationRow}>
            <Ionicons name="location" size={16} color="#666" />
            <Text style={styles.locationText}>{profile.residentCity}, {profile.residentState}</Text>
          </View>
          
          <View style={styles.chipsRow}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>{profile.maritalStatus}</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>{profile.caste}</Text>
            </View>
          </View>

          <View style={styles.verificationRow}>
            {profile.verifications?.mobile && (
              <TouchableOpacity onPress={() => showVerificationInfo('Mobile')} style={styles.verificationBadge}>
                <Ionicons name="phone-portrait" size={12} color="#4CAF50" />
                <Text style={styles.verificationText}>Mobile</Text>
              </TouchableOpacity>
            )}
            {profile.verifications?.email && (
              <TouchableOpacity onPress={() => showVerificationInfo('Email')} style={styles.verificationBadge}>
                <Ionicons name="mail" size={12} color="#4CAF50" />
                <Text style={styles.verificationText}>Email</Text>
              </TouchableOpacity>
            )}
            {profile.verifications?.document && (
              <TouchableOpacity onPress={() => showVerificationInfo('Document')} style={styles.verificationBadge}>
                <Ionicons name="document-text" size={12} color="#4CAF50" />
                <Text style={styles.verificationText}>ID</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* 3. Action Buttons Row */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity 
            style={styles.actionBtn} 
            onPress={() => setIsShortlisted(!isShortlisted)}
          >
            <View style={[styles.actionIconCircle, isShortlisted && styles.actionIconCircleActive]}>
              <Ionicons name={isShortlisted ? "heart" : "heart-outline"} size={22} color={isShortlisted ? "#FFF" : "#666"} />
            </View>
            <Text style={styles.actionBtnText}>Shortlist</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => setInterestSent(!interestSent)}
          >
            <View style={[styles.actionIconCircle, interestSent && styles.actionIconCircleInterest]}>
              <MaterialCommunityIcons name="handshake" size={22} color={interestSent ? "#FFF" : "#666"} />
            </View>
            <Text style={styles.actionBtnText}>{interestSent ? 'Sent' : 'Interest'}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => handleLockedAction('Messaging')}
          >
            <View style={styles.actionIconCircle}>
              <Ionicons name="chatbubble" size={20} color={isFreePlan ? "#CCC" : "#D81B60"} />
              {isFreePlan && <Ionicons name="lock-closed" size={12} color="#666" style={styles.lockIcon} />}
            </View>
            <Text style={styles.actionBtnText}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => handleLockedAction('Calling')}
          >
            <View style={styles.actionIconCircle}>
              <Ionicons name="call" size={20} color={isFreePlan ? "#CCC" : "#D81B60"} />
              {isFreePlan && <Ionicons name="lock-closed" size={12} color="#666" style={styles.lockIcon} />}
            </View>
            <Text style={styles.actionBtnText}>Call</Text>
          </TouchableOpacity>
        </View>

        {/* 4. About Me Section */}
        {profile.aboutMe && (
          <View style={styles.sectionContainer}>
            {renderSectionHeader('About Me', 'person')}
            <Text style={styles.bioText}>{profile.aboutMe}</Text>
          </View>
        )}

        {/* 5. Basic Details Section */}
        <View style={styles.sectionContainer}>
          {renderSectionHeader('Basic Details', 'information-circle')}
          <View style={styles.detailsCard}>
            {renderDetailRow('calendar-blank', 'Date of Birth', `${profile.DOB} (${profile.age} yrs)`)}
            {renderDetailRow('human-male-height', 'Height', profile.height)}
            {renderDetailRow('hospital-box-outline', 'Physical Status', profile.physicalStatus || 'Normal')}
            {renderDetailRow('ring', 'Marital Status', profile.maritalStatus)}
            {renderDetailRow('translate', 'Mother Tongue', profile.motherTongue)}
            {renderDetailRow('food-apple-outline', 'Diet', profile.diet)}
            {renderDetailRow('cigar', 'Smoking', profile.smoking)}
            {renderDetailRow('glass-mug-variant', 'Drinking', profile.drinking)}
          </View>
        </View>

        {/* 6. Religious & Social Background */}
        <View style={styles.sectionContainer}>
          {renderSectionHeader('Religious & Social Background', 'moon')}
          <View style={styles.detailsCard}>
            {renderDetailRow('hands-pray', 'Religion', profile.religion)}
            {renderDetailRow('account-group', 'Caste', profile.caste)}
            {renderDetailRow('account-child-circle', 'Sub-Caste', profile.subCaste)}
            {renderDetailRow('family-tree', 'Gotra', profile.gotra)}
            {renderDetailRow('star-circle-outline', 'Manglik', profile.manglikStatus || 'Non-Manglik')}
          </View>
        </View>

        {/* 7. Professional Details */}
        <View style={styles.sectionContainer}>
          {renderSectionHeader('Professional Details', 'briefcase')}
          <View style={styles.detailsCard}>
            {renderDetailRow('school', 'Education', profile.education?.degree + (profile.education?.field ? ` (${profile.education.field})` : ''))}
            {renderDetailRow('office-building', 'Employment', profile.employmentType || 'Private')}
            {renderDetailRow('briefcase-outline', 'Occupation', profile.occupation)}
            {renderDetailRow('currency-inr', 'Annual Income', profile.annualIncomeRange)}
          </View>
        </View>

        {/* 8. Family Background */}
        <View style={styles.sectionContainer}>
          {renderSectionHeader('Family Background', 'home')}
          <View style={styles.detailsCard}>
            {renderDetailRow('home-group', 'Family Status', profile.familyStatus || 'Middle Class')}
            {renderDetailRow('map-marker', 'Ancestral Origin', profile.ancestralOrigin)}
          </View>
          {profile.aboutFamily && (
            <Text style={[styles.bioText, { marginTop: 10 }]}>{profile.aboutFamily}</Text>
          )}
        </View>

        {/* 9. Horoscope Section */}
        <View style={styles.sectionContainer}>
          <TouchableOpacity 
            style={styles.expandableHeader} 
            onPress={() => setIsHoroscopeExpanded(!isHoroscopeExpanded)}
            activeOpacity={0.7}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="star" size={20} color="#D81B60" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Horoscope Details</Text>
            </View>
            <Ionicons name={isHoroscopeExpanded ? "chevron-up" : "chevron-down"} size={20} color="#666" />
          </TouchableOpacity>
          
          {isHoroscopeExpanded && (
            <View style={[styles.detailsCard, { marginTop: 10 }]}>
              {renderDetailRow('star-four-points', 'Star/Nakshatra', profile.horoscope?.star || 'Rohini')}
              {renderDetailRow('clock-outline', 'Time of Birth', profile.horoscope?.timeOfBirth || '10:30 AM')}
              {renderDetailRow('map-marker-outline', 'Place of Birth', profile.horoscope?.placeOfBirth || 'Jaipur')}
            </View>
          )}
        </View>

        {/* 10. Hobbies & Interests */}
        {profile.hobbies && profile.hobbies.length > 0 && (
          <View style={styles.sectionContainer}>
            {renderSectionHeader('Hobbies & Interests', 'game-controller')}
            <View style={styles.hobbiesContainer}>
              {profile.hobbies.map((hobby: string, index: number) => (
                <View key={index} style={styles.hobbyChip}>
                  <Text style={styles.hobbyText}>{hobby}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* 11. Verification Section */}
        <View style={styles.sectionContainer}>
          {renderSectionHeader('Verification', 'shield-checkmark')}
          <View style={styles.verificationCard}>
            <TouchableOpacity style={styles.verifRow} onPress={() => showVerificationInfo('Mobile')}>
              <View style={styles.verifLeft}>
                <Ionicons name="phone-portrait-outline" size={20} color="#666" />
                <Text style={styles.verifLabel}>Mobile Number</Text>
              </View>
              {profile.verifications?.mobile ? (
                <View style={styles.verifStatusGreen}><Ionicons name="checkmark-circle" size={16} color="#4CAF50" /><Text style={styles.verifStatusTextGreen}>Verified</Text></View>
              ) : (
                <View style={styles.verifStatusGray}><Ionicons name="close-circle" size={16} color="#999" /><Text style={styles.verifStatusTextGray}>Pending</Text></View>
              )}
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.verifRow} onPress={() => showVerificationInfo('Email')}>
              <View style={styles.verifLeft}>
                <Ionicons name="mail-outline" size={20} color="#666" />
                <Text style={styles.verifLabel}>Email Address</Text>
              </View>
              {profile.verifications?.email ? (
                <View style={styles.verifStatusGreen}><Ionicons name="checkmark-circle" size={16} color="#4CAF50" /><Text style={styles.verifStatusTextGreen}>Verified</Text></View>
              ) : (
                <View style={styles.verifStatusGray}><Ionicons name="close-circle" size={16} color="#999" /><Text style={styles.verifStatusTextGray}>Pending</Text></View>
              )}
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.verifRow} onPress={() => showVerificationInfo('Govt ID')}>
              <View style={styles.verifLeft}>
                <Ionicons name="document-text-outline" size={20} color="#666" />
                <Text style={styles.verifLabel}>Government ID</Text>
              </View>
              {profile.verifications?.document ? (
                <View style={styles.verifStatusGreen}><Ionicons name="checkmark-circle" size={16} color="#4CAF50" /><Text style={styles.verifStatusTextGreen}>Verified</Text></View>
              ) : (
                <View style={styles.verifStatusGray}><Ionicons name="close-circle" size={16} color="#999" /><Text style={styles.verifStatusTextGray}>Pending</Text></View>
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* 12. Photos Gallery */}
        {photos.length > 0 && (
          <View style={styles.sectionContainer}>
            {renderSectionHeader('Photos', 'images')}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
              {photos.map((photoUrl: string, index: number) => (
                <TouchableOpacity key={index} onPress={() => { setCurrentPhotoIndex(index); setGalleryFullscreenVisible(true); }}>
                  <Image source={{ uri: photoUrl }} style={styles.galleryThumb} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

      </ScrollView>

      {/* 15. Footer Action Bar */}
      <View style={styles.footerBar}>
        <TouchableOpacity 
          style={[styles.footerBtn, interestSent && styles.footerBtnActive]} 
          onPress={() => setInterestSent(!interestSent)}
        >
          <MaterialCommunityIcons name={interestSent ? "check-circle" : "handshake"} size={20} color={interestSent ? "#4CAF50" : "#D81B60"} />
          <Text style={[styles.footerBtnText, interestSent && { color: "#4CAF50" }]}>
            {interestSent ? 'Interest Sent' : 'Send Interest'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.footerDivider} />
        
        <TouchableOpacity 
          style={styles.footerBtn}
          onPress={() => handleLockedAction('Messaging')}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#D81B60" />
          <Text style={styles.footerBtnText}>Message</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Modal for Verification/Locked actions */}
      <Modal visible={bottomSheetVisible} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <TouchableOpacity style={styles.modalBg} onPress={() => setBottomSheetVisible(false)} />
          <View style={styles.bottomSheet}>
            <View style={styles.bottomSheetHandle} />
            <Text style={styles.bottomSheetTitle}>{bottomSheetContent.title}</Text>
            <Text style={styles.bottomSheetDesc}>{bottomSheetContent.desc}</Text>
            <TouchableOpacity 
              style={styles.bottomSheetBtn}
              onPress={() => setBottomSheetVisible(false)}
            >
              <Text style={styles.bottomSheetBtnText}>Got it</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Fullscreen Gallery */}
      <Modal visible={galleryFullscreenVisible} transparent animationType="slide">
        <View style={styles.fullScreenGallery}>
          <TouchableOpacity style={styles.closeGalleryBtn} onPress={() => setGalleryFullscreenVisible(false)}>
            <Ionicons name="close" size={30} color="#FFF" />
          </TouchableOpacity>
          <Image source={{ uri: photos[currentPhotoIndex] }} style={styles.fullScreenImage} resizeMode="contain" />
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroContainer: {
    width: '100%',
    height: 350,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.2)',
    top: 200,
  },
  heroTopBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDots: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#FFF',
    width: 20,
  },
  basicInfoCard: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  matchBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchText: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: 'bold',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  chipsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  chipText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  verificationRow: {
    flexDirection: 'row',
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  verificationText: {
    fontSize: 10,
    color: '#2E7D32',
    marginLeft: 4,
    fontWeight: 'bold',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 10,
  },
  actionBtn: {
    alignItems: 'center',
  },
  actionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  actionIconCircleActive: {
    backgroundColor: '#D81B60',
  },
  actionIconCircleInterest: {
    backgroundColor: '#4CAF50',
  },
  actionBtnText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
  lockIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 2,
  },
  sectionContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    marginBottom: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionIcon: {
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  bioText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#555',
  },
  detailsCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#F0F0F0',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '45%',
  },
  detailIcon: {
    marginRight: 8,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333',
    width: '50%',
    textAlign: 'right',
  },
  expandableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  hobbiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  hobbyChip: {
    backgroundColor: '#FFF0F5',
    borderWidth: 1,
    borderColor: '#FFB6C1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  hobbyText: {
    color: '#D81B60',
    fontSize: 14,
    fontWeight: '500',
  },
  verificationCard: {
    borderWidth: 1,
    borderColor: '#F0F0F0',
    borderRadius: 12,
    padding: 16,
  },
  verifRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  verifLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifLabel: {
    fontSize: 15,
    color: '#333',
    marginLeft: 12,
    fontWeight: '500',
  },
  verifStatusGreen: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifStatusTextGreen: {
    color: '#2E7D32',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  verifStatusGray: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  verifStatusTextGray: {
    color: '#666',
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
  },
  galleryScroll: {
    flexDirection: 'row',
  },
  galleryThumb: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 8,
  },
  footerBtn: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerBtnActive: {
    opacity: 0.8,
  },
  footerBtnText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#D81B60',
  },
  footerDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E0E0E0',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBg: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  bottomSheet: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#DDD',
    borderRadius: 2,
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  bottomSheetDesc: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  bottomSheetBtn: {
    backgroundColor: '#D81B60',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 24,
    width: '100%',
    alignItems: 'center',
  },
  bottomSheetBtnText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  fullScreenGallery: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
  closeGalleryBtn: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 10,
    padding: 10,
  },
  fullScreenImage: {
    width: '100%',
    height: '80%',
  }
});

export default ProfileDetailScreen;
