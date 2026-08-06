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

type Profile = any; 

const defaultMalePhotos = [
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&auto=format&fit=crop&q=80'
];

const defaultFemalePhotos = [
  'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&auto=format&fit=crop&q=80'
];

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
        <Text style={{ color: '#2C1A1D' }}>Loading profile...</Text>
      </View>
    );
  }

  const rawPhotos = [profile.profilePhotoURL, ...(profile.galleryPhotoURLs || [])].filter(Boolean);
  const fallbackList = profile.gender === 'Female' ? defaultFemalePhotos : defaultMalePhotos;
  const photos = rawPhotos.length > 0 ? rawPhotos : fallbackList;
  const currentPhoto = photos[currentPhotoIndex] || fallbackList[0];
  
  const isFreePlan = state.currentPlan === 'Free';

  const handlePhotoTap = () => {
    setGalleryFullscreenVisible(true);
  };

  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const handleLockedAction = (actionName: string) => {
    if (isFreePlan) {
      setBottomSheetContent({
        title: 'Upgrade to Patrika Gold',
        desc: `Upgrade your plan to Gold to unlock ${actionName} and connect directly.`
      });
      setBottomSheetVisible(true);
    }
  };

  const showVerificationInfo = (badge: string) => {
    setBottomSheetContent({
      title: `${badge} Verified Profile`,
      desc: `This member has successfully verified their ${badge.toLowerCase()} with Patrika Matrimony.`
    });
    setBottomSheetVisible(true);
  };

  const renderSectionHeader = (title: string, icon: keyof typeof Ionicons.glyphMap) => (
    <View style={styles.sectionHeader}>
      <Ionicons name={icon} size={20} color="#E31E25" style={styles.sectionIcon} />
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );

  const renderDetailRow = (icon: keyof typeof MaterialCommunityIcons.glyphMap, label: string, value: string) => (
    <View style={styles.detailRow}>
      <View style={styles.detailLabelContainer}>
        <MaterialCommunityIcons name={icon} size={18} color="#E31E25" style={styles.detailIcon} />
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
          <TouchableOpacity activeOpacity={0.92} onPress={handlePhotoTap} style={styles.heroImageTouchable}>
            <Image source={{ uri: currentPhoto }} style={styles.heroImage} />
            <View style={styles.heroOverlay} />

            {/* Tap to View Fullscreen Hint Badge */}
            <View style={styles.zoomHintBadge}>
              <Ionicons name="expand" size={14} color="#FFFFFF" />
              <Text style={styles.zoomHintText}>Tap to View Photos ({photos.length})</Text>
            </View>
          </TouchableOpacity>
          
          <View style={styles.heroTopBar}>
            <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handlePhotoTap}>
              <Ionicons name="images-outline" size={22} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {photos.length > 1 && (
            <View style={styles.paginationDots}>
              {photos.map((_, idx) => (
                <TouchableOpacity 
                  key={idx} 
                  onPress={() => setCurrentPhotoIndex(idx)}
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
            {profile.matchScore && (
              <View style={styles.matchBadge}>
                <Text style={styles.matchText}>{profile.matchScore}% Match</Text>
              </View>
            )}
          </View>
          
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color="#8C7A7C" />
            <Text style={styles.locationText}>{profile.residentCity}, {profile.residentState} • {profile.occupation}</Text>
          </View>
          
          <View style={styles.chipsRow}>
            <View style={styles.chip}>
              <Text style={styles.chipText}>{profile.maritalStatus}</Text>
            </View>
            <View style={styles.chip}>
              <Text style={styles.chipText}>{profile.caste}</Text>
            </View>
            {profile.motherTongue && (
              <View style={styles.chip}>
                <Text style={styles.chipText}>{profile.motherTongue}</Text>
              </View>
            )}
          </View>

          <View style={styles.verificationRow}>
            <TouchableOpacity onPress={() => showVerificationInfo('Mobile')} style={styles.verificationBadge}>
              <Ionicons name="phone-portrait" size={12} color="#1E8449" />
              <Text style={styles.verificationText}>Mobile Verified</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => showVerificationInfo('Govt ID')} style={styles.verificationBadge}>
              <Ionicons name="shield-checkmark" size={12} color="#1E8449" />
              <Text style={styles.verificationText}>Selfie & Govt ID</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* 3. Action Buttons Row */}
        <View style={styles.actionButtonsRow}>
          <TouchableOpacity 
            style={styles.actionBtn} 
            onPress={() => setIsShortlisted(!isShortlisted)}
          >
            <View style={[styles.actionIconCircle, isShortlisted && styles.actionIconCircleActive]}>
              <Ionicons name={isShortlisted ? "heart" : "heart-outline"} size={22} color={isShortlisted ? "#FFFFFF" : "#E31E25"} />
            </View>
            <Text style={styles.actionBtnText}>Shortlist</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => setInterestSent(!interestSent)}
          >
            <View style={[styles.actionIconCircle, interestSent && styles.actionIconCircleInterest]}>
              <MaterialCommunityIcons name="handshake" size={22} color={interestSent ? "#FFFFFF" : "#E31E25"} />
            </View>
            <Text style={styles.actionBtnText}>{interestSent ? 'Sent' : 'Interest'}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => handleLockedAction('Messaging')}
          >
            <View style={styles.actionIconCircle}>
              <Ionicons name="chatbubble" size={20} color={isFreePlan ? "#8C7A7C" : "#E31E25"} />
              {isFreePlan && <Ionicons name="lock-closed" size={12} color="#E31E25" style={styles.lockIcon} />}
            </View>
            <Text style={styles.actionBtnText}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.actionBtn}
            onPress={() => handleLockedAction('Calling')}
          >
            <View style={styles.actionIconCircle}>
              <Ionicons name="call" size={20} color={isFreePlan ? "#8C7A7C" : "#E31E25"} />
              {isFreePlan && <Ionicons name="lock-closed" size={12} color="#E31E25" style={styles.lockIcon} />}
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
              <Ionicons name="star" size={20} color="#E31E25" style={styles.sectionIcon} />
              <Text style={styles.sectionTitle}>Horoscope Details</Text>
            </View>
            <Ionicons name={isHoroscopeExpanded ? "chevron-up" : "chevron-down"} size={20} color="#5A4A4D" />
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

        {/* 11. Photos Gallery */}
        {photos.length > 0 && (
          <View style={styles.sectionContainer}>
            {renderSectionHeader('Photos Gallery', 'images')}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.galleryScroll}>
              {photos.map((photoUrl: string, index: number) => (
                <TouchableOpacity 
                  key={index} 
                  onPress={() => { setCurrentPhotoIndex(index); setGalleryFullscreenVisible(true); }}
                  activeOpacity={0.85}
                >
                  <Image source={{ uri: photoUrl }} style={styles.galleryThumb} />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

      </ScrollView>

      {/* Footer Action Bar */}
      <View style={styles.footerBar}>
        <TouchableOpacity 
          style={[styles.footerBtn, interestSent && styles.footerBtnActive]} 
          onPress={() => setInterestSent(!interestSent)}
        >
          <MaterialCommunityIcons name={interestSent ? "check-circle" : "handshake"} size={20} color="#E31E25" />
          <Text style={styles.footerBtnText}>
            {interestSent ? 'Interest Sent' : 'Send Interest'}
          </Text>
        </TouchableOpacity>
        
        <View style={styles.footerDivider} />
        
        <TouchableOpacity 
          style={styles.footerBtn}
          onPress={() => handleLockedAction('Messaging')}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={20} color="#E31E25" />
          <Text style={styles.footerBtnText}>Message</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Sheet Modal */}
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

      {/* Fullscreen Interactive Photo Viewer Modal */}
      <Modal visible={galleryFullscreenVisible} transparent animationType="slide">
        <SafeAreaView style={styles.fullScreenGallery}>
          {/* Top Bar with Close and Photo Counter */}
          <View style={styles.fullScreenHeader}>
            <TouchableOpacity style={styles.closeGalleryBtn} onPress={() => setGalleryFullscreenVisible(false)}>
              <Ionicons name="close" size={28} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.fullScreenCounter}>
              Photo {currentPhotoIndex + 1} of {photos.length}
            </Text>
            <View style={{ width: 40 }} />
          </View>

          {/* Main Fullscreen Photo View with Navigation Arrows */}
          <View style={styles.fullScreenImageWrapper}>
            {photos.length > 1 && (
              <TouchableOpacity style={styles.navArrowLeft} onPress={handlePrevPhoto}>
                <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
              </TouchableOpacity>
            )}

            <Image 
              source={{ uri: photos[currentPhotoIndex] }} 
              style={styles.fullScreenImage} 
              resizeMode="contain" 
            />

            {photos.length > 1 && (
              <TouchableOpacity style={styles.navArrowRight} onPress={handleNextPhoto}>
                <Ionicons name="chevron-forward" size={28} color="#FFFFFF" />
              </TouchableOpacity>
            )}
          </View>

          {/* Bottom Thumbnail Strip */}
          {photos.length > 1 && (
            <View style={styles.thumbnailStrip}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {photos.map((url: string, idx: number) => (
                  <TouchableOpacity
                    key={idx}
                    onPress={() => setCurrentPhotoIndex(idx)}
                    style={[styles.stripThumbWrapper, currentPhotoIndex === idx && styles.stripThumbActive]}
                  >
                    <Image source={{ uri: url }} style={styles.stripThumbImage} />
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </SafeAreaView>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F6',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF9F6',
  },
  heroContainer: {
    width: '100%',
    height: 400,
    position: 'relative',
    backgroundColor: '#2C1A1D',
  },
  heroImageTouchable: {
    width: '100%',
    height: '100%',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(44,26,29,0.22)',
  },
  zoomHintBadge: {
    position: 'absolute',
    bottom: 24,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(44, 26, 29, 0.75)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  zoomHintText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  heroTopBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 50 : 20,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(44,26,29,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationDots: {
    position: 'absolute',
    bottom: 24,
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
    backgroundColor: '#E31E25',
    width: 20,
  },
  basicInfoCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#EFE6DD',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
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
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
  },
  matchBadge: {
    backgroundColor: '#FFF0F3',
    borderWidth: 1,
    borderColor: '#FFD6DF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  matchText: {
    color: '#E31E25',
    fontSize: 11,
    fontWeight: '800',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  locationText: {
    fontSize: 14,
    color: '#5A4A4D',
    marginLeft: 4,
  },
  chipsRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  chip: {
    backgroundColor: '#FAF5F7',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginRight: 8,
  },
  chipText: {
    fontSize: 12,
    color: '#2C1A1D',
    fontWeight: '600',
  },
  verificationRow: {
    flexDirection: 'row',
    gap: 8,
  },
  verificationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8F8F5',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A3E4D7',
  },
  verificationText: {
    fontSize: 10,
    color: '#1E8449',
    marginLeft: 4,
    fontWeight: '700',
  },
  actionButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
    marginBottom: 10,
  },
  actionBtn: {
    alignItems: 'center',
  },
  actionIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FAF5F7',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    position: 'relative',
  },
  actionIconCircleActive: {
    backgroundColor: '#E31E25',
    borderColor: '#E31E25',
  },
  actionIconCircleInterest: {
    backgroundColor: '#E31E25',
    borderColor: '#E31E25',
  },
  actionBtnText: {
    fontSize: 12,
    color: '#5A4A4D',
    fontWeight: '600',
  },
  lockIcon: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#FFF9F6',
    borderRadius: 10,
    padding: 2,
  },
  sectionContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    marginBottom: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#EFE6DD',
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
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
  },
  bioText: {
    fontSize: 15,
    lineHeight: 24,
    color: '#5A4A4D',
  },
  detailsCard: {
    backgroundColor: '#FAF5F7',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
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
    color: '#5A4A4D',
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C1A1D',
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
    backgroundColor: '#FFF0F3',
    borderWidth: 1,
    borderColor: '#FFD6DF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  hobbyText: {
    color: '#E31E25',
    fontSize: 14,
    fontWeight: '700',
  },
  galleryScroll: {
    flexDirection: 'row',
  },
  galleryThumb: {
    width: 100,
    height: 100,
    borderRadius: 12,
    marginRight: 12,
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  footerBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: '#EFE6DD',
    alignItems: 'center',
    shadowColor: '#2C1A1D',
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
    fontWeight: '800',
    color: '#E31E25',
  },
  footerDivider: {
    width: 1,
    height: 24,
    backgroundColor: '#EFE6DD',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(44,26,29,0.6)',
    justifyContent: 'flex-end',
  },
  modalBg: {
    flex: 1,
  },
  bottomSheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  bottomSheetHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#EFE6DD',
    marginBottom: 16,
  },
  bottomSheetTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
    marginBottom: 8,
  },
  bottomSheetDesc: {
    fontSize: 14,
    color: '#5A4A4D',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  bottomSheetBtn: {
    backgroundColor: '#E31E25',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
  },
  bottomSheetBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
  },

  /* Fullscreen Photo Viewer Modal */
  fullScreenGallery: {
    flex: 1,
    backgroundColor: '#0D0608',
  },
  fullScreenHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  closeGalleryBtn: {
    padding: 6,
  },
  fullScreenCounter: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  fullScreenImageWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  fullScreenImage: {
    width: width,
    height: '100%',
  },
  navArrowLeft: {
    position: 'absolute',
    left: 12,
    zIndex: 20,
    backgroundColor: 'rgba(44, 26, 29, 0.65)',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navArrowRight: {
    position: 'absolute',
    right: 12,
    zIndex: 20,
    backgroundColor: 'rgba(44, 26, 29, 0.65)',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  thumbnailStrip: {
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  stripThumbWrapper: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  stripThumbActive: {
    borderColor: '#E31E25',
  },
  stripThumbImage: {
    width: '100%',
    height: '100%',
  },
});

export default ProfileDetailScreen;
