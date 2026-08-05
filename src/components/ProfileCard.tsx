import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Profile } from '../context/AppContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '../constants/theme';

interface ProfileCardProps {
  profile: Profile;
  onPress: () => void;
  onInterest: () => void;
  onShortlist: () => void;
  isShortlisted: boolean;
  isInterestSent: boolean;
  size?: 'full' | 'compact';
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  profile,
  onPress,
  onInterest,
  onShortlist,
  isShortlisted,
  isInterestSent,
  size = 'full',
}) => {
  const isCompact = size === 'compact';

  const defaultAvatar =
    profile.gender === 'Female'
      ? 'https://via.placeholder.com/400x400/6B0000/FFFFFF?text=F'
      : 'https://via.placeholder.com/400x400/786C10/FFFFFF?text=M';

  const photoUri = profile.profilePhotoURL || defaultAvatar;

  const renderBadges = () => {
    return (
      <View style={styles.badgeRow}>
        {profile.isVerified && (
          <View style={[styles.badge, styles.badgeVerified]}>
            <MaterialCommunityIcons name="check-decagram" size={12} color="#786C10" />
            <Text style={styles.badgeTextVerified}>Royal Verified</Text>
          </View>
        )}
        {profile.isPremium && (
          <View style={[styles.badge, styles.badgePremium]}>
            <MaterialCommunityIcons name="crown" size={12} color="#6B0000" />
            <Text style={styles.badgeTextPremium}>Rajgharana Premium</Text>
          </View>
        )}
        {profile.isNewspaperAdLinked && (
          <View style={[styles.badge, styles.badgeNewspaper]}>
            <MaterialCommunityIcons name="newspaper-variant-outline" size={12} color="#6B0000" />
            <Text style={styles.badgeTextNewspaper}>Patrika Ad</Text>
          </View>
        )}
      </View>
    );
  };

  if (isCompact) {
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.compactCard} onPress={onPress}>
        <Image source={{ uri: photoUri }} style={styles.compactImage} />
        <View style={styles.compactInfo}>
          <View style={styles.compactHeader}>
            <Text style={styles.nameTextSerif} numberOfLines={1}>
              {profile.name}
            </Text>
            {profile.matchScore >= 60 && (
              <Text style={styles.matchTextCompact}>{profile.matchScore}% Match</Text>
            )}
          </View>
          <Text style={styles.detailText} numberOfLines={1}>
            {profile.caste || profile.religion} • {profile.age} yrs • {profile.height}
          </Text>
          <View style={styles.compactChipRow}>
            <View style={styles.infoChip}>
              <Text style={styles.infoChipText}>{profile.occupation}</Text>
            </View>
            <View style={styles.infoChip}>
              <Text style={styles.infoChipText}>{profile.residentCity}</Text>
            </View>
          </View>
          {renderBadges()}
        </View>
        <View style={styles.compactActions}>
          <TouchableOpacity onPress={onShortlist} style={styles.compactIconBtn}>
            <Ionicons
              name={isShortlisted ? 'star' : 'star-outline'}
              size={20}
              color={isShortlisted ? '#D4AF37' : '#8C7B6B'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onInterest} style={styles.compactIconBtn}>
            <Ionicons
              name={isInterestSent ? 'heart' : 'heart-outline'}
              size={20}
              color={isInterestSent ? '#6B0000' : '#8C7B6B'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.fullCard} onPress={onPress}>
      {/* Photo Container */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: photoUri }} style={styles.fullImage} />
        <LinearGradient
          colors={['transparent', 'rgba(32,13,8,0.75)']}
          style={styles.imageGradient}
        />
        {/* Royal Verified Badge Overlay (Matching Reference Image 2) */}
        <View style={styles.royalVerifiedOverlay}>
          <MaterialCommunityIcons name="check-decagram" size={13} color="#786C10" />
          <Text style={styles.royalVerifiedText}>Royal Verified</Text>
        </View>
      </View>

      {/* Profile Details (Matching Reference Image 2 Layout) */}
      <View style={styles.fullInfo}>
        <Text style={styles.nameTextSerif} numberOfLines={1}>
          {profile.name}
        </Text>

        <Text style={styles.detailText} numberOfLines={1}>
          {profile.caste || profile.religion} • {profile.age} yrs • {profile.height}
        </Text>

        {/* Feature Chips */}
        <View style={styles.chipRow}>
          <View style={styles.infoChip}>
            <Text style={styles.infoChipText}>{profile.occupation}</Text>
          </View>
          <View style={styles.infoChip}>
            <Text style={styles.infoChipText}>{profile.residentCity}</Text>
          </View>
        </View>

        {/* Full-width Royal Gold Outline CTA Button (Matching Reference Image 2) */}
        <TouchableOpacity style={styles.royalViewBtn} onPress={onPress} activeOpacity={0.85}>
          <Text style={styles.royalViewBtnText}>View Profile</Text>
        </TouchableOpacity>

        {/* Action Row */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionBtn, isInterestSent ? styles.actionBtnInterestSent : null]}
            onPress={onInterest}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isInterestSent ? 'heart' : 'heart-outline'}
              size={16}
              color={isInterestSent ? '#FFFFFF' : '#6B0000'}
            />
            <Text style={[styles.actionBtnText, isInterestSent ? { color: '#FFFFFF' } : { color: '#6B0000' }]}>
              {isInterestSent ? 'Interested' : 'Send Interest'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, isShortlisted ? styles.actionBtnShortlisted : null]}
            onPress={onShortlist}
            activeOpacity={0.8}
          >
            <Ionicons
              name={isShortlisted ? 'star' : 'star-outline'}
              size={16}
              color={isShortlisted ? '#FFFFFF' : '#786C10'}
            />
            <Text style={[styles.actionBtnText, isShortlisted ? { color: '#FFFFFF' } : { color: '#786C10' }]}>
              {isShortlisted ? 'Shortlisted' : 'Shortlist'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fullCard: {
    backgroundColor: '#FFFDF9', // Warm Parchment Ivory
    borderRadius: 16,
    marginVertical: 10,
    marginHorizontal: 14,
    borderWidth: 1,
    borderColor: '#E2D7C7',
    shadowColor: '#6B0000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
    width: 290, // Fixed width for horizontal scrolling
  },
  imageContainer: {
    width: '100%',
    height: 240,
    position: 'relative',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 80,
  },
  royalVerifiedOverlay: {
    position: 'absolute',
    top: 12,
    right: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    borderWidth: 1,
    borderColor: '#786C10',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 14,
    gap: 4,
  },
  royalVerifiedText: {
    color: '#786C10',
    fontSize: 11,
    fontWeight: '700',
  },
  fullInfo: {
    padding: 16,
  },
  nameTextSerif: {
    fontSize: 20,
    fontWeight: '800',
    color: '#200D08', // Royal Dark Maroon/Brown
    letterSpacing: -0.3,
    marginBottom: 4,
  },
  detailText: {
    fontSize: 13,
    color: '#665544', // Warm Medium Brown Subtext
    fontWeight: '500',
    marginBottom: 10,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 14,
  },
  compactChipRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  infoChip: {
    backgroundColor: '#F5EFE6', // Soft Warm Cream Chip (Matching Reference Image 2)
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: '#E2D7C7',
  },
  infoChipText: {
    fontSize: 12,
    color: '#3A2A1A',
    fontWeight: '600',
  },
  royalViewBtn: {
    backgroundColor: '#FFFDF9',
    borderWidth: 1.5,
    borderColor: '#786C10', // Royal Gold Border (Matching Reference Image 2)
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
  },
  royalViewBtnText: {
    color: '#786C10',
    fontSize: 14,
    fontWeight: '700',
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2D7C7',
    backgroundColor: '#FAF6F0',
    gap: 4,
  },
  actionBtnInterestSent: {
    backgroundColor: '#6B0000',
    borderColor: '#6B0000',
  },
  actionBtnShortlisted: {
    backgroundColor: '#786C10',
    borderColor: '#786C10',
  },
  actionBtnText: {
    fontSize: 12,
    fontWeight: '700',
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 6,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    gap: 4,
  },
  badgeVerified: {
    backgroundColor: '#FFF9E6',
    borderWidth: 1,
    borderColor: '#786C10',
  },
  badgePremium: {
    backgroundColor: '#FFF5F6',
    borderWidth: 1,
    borderColor: '#6B0000',
  },
  badgeNewspaper: {
    backgroundColor: '#FAF6F0',
    borderWidth: 1,
    borderColor: '#6B0000',
  },
  badgeTextVerified: {
    color: '#786C10',
    fontSize: 10,
    fontWeight: '700',
  },
  badgeTextPremium: {
    color: '#6B0000',
    fontSize: 10,
    fontWeight: '700',
  },
  badgeTextNewspaper: {
    color: '#6B0000',
    fontSize: 10,
    fontWeight: '700',
  },

  // Compact card layout
  compactCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFDF9',
    borderRadius: 14,
    marginVertical: 6,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E2D7C7',
    shadowColor: '#6B0000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    overflow: 'hidden',
  },
  compactImage: {
    width: 90,
    height: 115,
    resizeMode: 'cover',
  },
  compactInfo: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  compactHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  matchTextCompact: {
    fontSize: 11,
    color: '#786C10',
    fontWeight: '700',
  },
  compactActions: {
    justifyContent: 'space-around',
    paddingRight: 12,
    paddingVertical: 10,
  },
  compactIconBtn: {
    padding: 6,
  },
});

export default ProfileCard;
