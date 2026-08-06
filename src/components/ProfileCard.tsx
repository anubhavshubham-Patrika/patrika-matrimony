import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Profile } from '../context/AppContext';
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
      ? 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?w=800&auto=format&fit=crop&q=80'
      : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&auto=format&fit=crop&q=80';

  const photoUri = profile.profilePhotoURL || defaultAvatar;

  if (isCompact) {
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.compactCard} onPress={onPress}>
        <Image source={{ uri: photoUri }} style={styles.compactImage} />
        <View style={styles.compactInfo}>
          <View style={styles.compactHeader}>
            <Text style={styles.compactName} numberOfLines={1}>
              {profile.name}, {profile.age}
            </Text>
            {profile.matchScore >= 60 && (
              <View style={styles.matchBadgeCompact}>
                <Text style={styles.matchBadgeTextCompact}>{profile.matchScore}% Match</Text>
              </View>
            )}
          </View>
          <Text style={styles.compactMeta} numberOfLines={1}>
            {profile.caste || profile.religion} • {profile.height}
          </Text>
          <Text style={styles.compactSubtext} numberOfLines={1}>
            {profile.occupation} • {profile.residentCity}
          </Text>
        </View>
        <View style={styles.compactActions}>
          <TouchableOpacity onPress={onShortlist} style={styles.compactIconBtn}>
            <Ionicons
              name={isShortlisted ? 'bookmark' : 'bookmark-outline'}
              size={20}
              color={isShortlisted ? '#C5A059' : '#8C7A7C'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onInterest} style={styles.compactIconBtn}>
            <Ionicons
              name={isInterestSent ? 'heart' : 'heart-outline'}
              size={20}
              color={isInterestSent ? '#E31E25' : '#8C7A7C'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.93} style={styles.fullCard} onPress={onPress}>
      {/* High-Res Photo Container */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: photoUri }} style={styles.fullImage} />
        
        {/* Match Percentage Top-Right Badge (Matching Screenshots 4 & 5) */}
        <View style={styles.matchBadgeContainer}>
          <Text style={styles.matchBadgeText}>• {profile.matchScore || 92}% Match</Text>
        </View>

        {/* Verification Pill Overlay if verified */}
        {profile.isVerified && (
          <View style={styles.verifiedOverlay}>
            <MaterialCommunityIcons name="check-decagram" size={12} color="#FFFFFF" />
            <Text style={styles.verifiedOverlayText}>Verified</Text>
          </View>
        )}
      </View>

      {/* Card Information Body (Matching Screenshots 4 & 5 Layout) */}
      <View style={styles.fullInfo}>
        {/* Name & Age Heading */}
        <View style={styles.nameRow}>
          <Text style={styles.nameTextSerif} numberOfLines={1}>
            {profile.name}, {profile.age}
          </Text>
          <View style={styles.goldDot} />
        </View>

        {/* Location Row */}
        <View style={styles.metaRow}>
          <Ionicons name="location-outline" size={14} color="#8C7A7C" style={{ marginRight: 4 }} />
          <Text style={styles.metaText} numberOfLines={1}>
            {profile.residentCity}, {profile.residentState || 'India'}
          </Text>
        </View>

        {/* Occupation Row */}
        <View style={styles.metaRow}>
          <Ionicons name="briefcase-outline" size={14} color="#8C7A7C" style={{ marginRight: 4 }} />
          <Text style={styles.metaText} numberOfLines={1}>
            {profile.occupation || 'Professional'}
          </Text>
        </View>

        {/* About Bio Snippet */}
        <Text style={styles.bioSnippet} numberOfLines={2}>
          {profile.aboutMe || 'Looking for a compassionate life partner who values family, growth and meaningful conversations.'}
        </Text>

        {/* Action Row (Matching Screenshot 4: Express Interest + View Icon) */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.expressBtn, isInterestSent && styles.expressBtnSent]}
            onPress={onInterest}
            activeOpacity={0.85}
          >
            <Ionicons
              name={isInterestSent ? 'heart' : 'heart-outline'}
              size={18}
              color={isInterestSent ? '#FFFFFF' : '#5A4A4D'}
              style={{ marginRight: 6 }}
            />
            <Text style={[styles.expressBtnText, isInterestSent && { color: '#FFFFFF' }]}>
              {isInterestSent ? 'Interest Sent' : 'Express Interest'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.viewIconBtn}
            onPress={onPress}
            activeOpacity={0.85}
          >
            <Ionicons name="eye-outline" size={18} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fullCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginVertical: 10,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: '#EFE6DD',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
    overflow: 'hidden',
    width: 290,
  },
  imageContainer: {
    width: '100%',
    height: 250,
    position: 'relative',
  },
  fullImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  matchBadgeContainer: {
    position: 'absolute',
    top: 14,
    right: 14,
    backgroundColor: 'rgba(70,50,40,0.65)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.4)',
  },
  matchBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  verifiedOverlay: {
    position: 'absolute',
    bottom: 12,
    left: 12,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#27AE60',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    gap: 4,
  },
  verifiedOverlayText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
  },
  fullInfo: {
    padding: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  nameTextSerif: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2C1A1D',
    letterSpacing: -0.3,
    fontFamily: 'serif',
  },
  goldDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C5A059',
    marginLeft: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  metaText: {
    fontSize: 13,
    color: '#5A4A4D',
    fontWeight: '500',
  },
  bioSnippet: {
    fontSize: 12,
    color: '#8C7A7C',
    lineHeight: 18,
    marginTop: 6,
    marginBottom: 16,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  expressBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EFE5DF',
    paddingVertical: 12,
    borderRadius: 14,
  },
  expressBtnSent: {
    backgroundColor: '#E91E63',
  },
  expressBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#5A4A4D',
  },
  viewIconBtn: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: '#A67C52',
    alignItems: 'center',
    justifyContent: 'center',
  },

  // Compact layout
  compactCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EFE6DD',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  compactImage: {
    width: 95,
    height: 110,
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
    marginBottom: 4,
  },
  compactName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
  },
  matchBadgeCompact: {
    backgroundColor: 'rgba(197,160,89,0.15)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  matchBadgeTextCompact: {
    fontSize: 10,
    color: '#C5A059',
    fontWeight: '700',
  },
  compactMeta: {
    fontSize: 12,
    color: '#5A4A4D',
    fontWeight: '600',
    marginBottom: 2,
  },
  compactSubtext: {
    fontSize: 11,
    color: '#8C7A7C',
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
