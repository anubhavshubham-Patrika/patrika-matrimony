import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Profile } from '../context/AppContext';
import { LinearGradient } from 'expo-linear-gradient';

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
      ? 'https://via.placeholder.com/400x400/E31837/FFFFFF?text=F'
      : 'https://via.placeholder.com/400x400/3B82F6/FFFFFF?text=M';

  const photoUri = profile.profilePhotoURL || defaultAvatar;

  const renderBadges = () => {
    return (
      <View style={styles.badgeRow}>
        {profile.isVerified && (
          <View style={[styles.badge, styles.badgeVerified]}>
            <MaterialCommunityIcons name="check-decagram" size={12} color="#fff" />
            <Text style={styles.badgeText}>Verified</Text>
          </View>
        )}
        {profile.isPremium && (
          <View style={[styles.badge, styles.badgePremium]}>
            <MaterialCommunityIcons name="crown" size={12} color="#fff" />
            <Text style={styles.badgeText}>Premium</Text>
          </View>
        )}
        {profile.isNewspaperAdLinked && (
          <View style={[styles.badge, styles.badgeNewspaper]}>
            <MaterialCommunityIcons name="newspaper-variant-outline" size={12} color="#fff" />
            <Text style={styles.badgeText}>Newspaper Ad</Text>
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
            <Text style={styles.nameText} numberOfLines={1}>
              {profile.name}
            </Text>
            {profile.matchScore >= 60 && (
              <Text style={styles.matchTextCompact}>{profile.matchScore}% Match</Text>
            )}
          </View>
          <Text style={styles.detailText} numberOfLines={1}>
            {profile.age} yrs | {profile.height} | {profile.residentCity}
          </Text>
          <Text style={styles.detailText} numberOfLines={1}>
            {profile.caste} | {profile.occupation}
          </Text>
          {renderBadges()}
        </View>
        <View style={styles.compactActions}>
          <TouchableOpacity onPress={onShortlist} style={styles.compactIconBtn}>
            <Ionicons
              name={isShortlisted ? 'star' : 'star-outline'}
              size={20}
              color={isShortlisted ? '#F5A623' : '#666'}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={onInterest} style={styles.compactIconBtn}>
            <Ionicons
              name={isInterestSent ? 'heart' : 'heart-outline'}
              size={20}
              color={isInterestSent ? '#E31837' : '#666'}
            />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.fullCard} onPress={onPress}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: photoUri }} style={styles.fullImage} />
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.7)']}
          style={styles.imageGradient}
        />
        {profile.matchScore >= 60 && (
          <View style={styles.matchBadge}>
            <Text style={styles.matchText}>High Match {profile.matchScore}%</Text>
          </View>
        )}
      </View>

      <View style={styles.fullInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.nameTextFull} numberOfLines={1}>
            {profile.name}
          </Text>
        </View>

        <Text style={styles.detailTextFull} numberOfLines={1}>
          {profile.age} yrs | {profile.height} | {profile.residentCity}, {profile.residentState}
        </Text>
        <Text style={styles.detailTextFull} numberOfLines={1}>
          {profile.caste}, {profile.religion} | {profile.occupation}
        </Text>

        <Text style={styles.bioText} numberOfLines={1}>
          "{profile.aboutMe}"
        </Text>

        {renderBadges()}

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.actionBtn, isInterestSent ? styles.actionBtnInterestSent : null]}
            onPress={onInterest}
          >
            <Ionicons
              name={isInterestSent ? 'heart' : 'heart-outline'}
              size={18}
              color={isInterestSent ? '#fff' : '#666'}
            />
            <Text style={[styles.actionBtnText, isInterestSent ? { color: '#fff' } : null]}>
              {isInterestSent ? 'Interested' : 'Interest'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.primaryActionBtn} onPress={onPress}>
            <Ionicons name="eye-outline" size={18} color="#fff" />
            <Text style={styles.primaryActionBtnText}>View Profile</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.actionBtn, isShortlisted ? styles.actionBtnShortlistActive : null]}
            onPress={onShortlist}
          >
            <Ionicons
              name={isShortlisted ? 'star' : 'star-outline'}
              size={18}
              color={isShortlisted ? '#fff' : '#666'}
            />
            <Text style={[styles.actionBtnText, isShortlisted ? { color: '#fff' } : null]}>
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
    backgroundColor: '#fff',
    borderRadius: 12,
    marginVertical: 10,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 4,
    overflow: 'hidden',
    width: 280, // Fixed width for horizontal scrolling
  },
  imageContainer: {
    width: '100%',
    height: 220,
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
  matchBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#10B981',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  matchText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  fullInfo: {
    padding: 12,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  nameTextFull: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  detailTextFull: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  bioText: {
    fontSize: 13,
    color: '#888',
    fontStyle: 'italic',
    marginTop: 6,
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 12,
  },
  badgeVerified: {
    backgroundColor: '#10B981',
  },
  badgePremium: {
    backgroundColor: '#F5A623',
  },
  badgeNewspaper: {
    backgroundColor: '#3B82F6',
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  actionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
  },
  actionBtnInterestSent: {
    backgroundColor: '#E31837',
    borderColor: '#E31837',
  },
  actionBtnShortlistActive: {
    backgroundColor: '#F5A623',
    borderColor: '#F5A623',
  },
  actionBtnText: {
    fontSize: 12,
    marginLeft: 4,
    color: '#666',
    fontWeight: '600',
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#E31837',
  },
  primaryActionBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },

  // Compact layout styles
  compactCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    overflow: 'hidden',
  },
  compactImage: {
    width: 80,
    height: 100,
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
  nameText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  matchTextCompact: {
    fontSize: 11,
    color: '#10B981',
    fontWeight: 'bold',
  },
  detailText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  compactActions: {
    justifyContent: 'space-around',
    paddingRight: 10,
    paddingVertical: 10,
  },
  compactIconBtn: {
    padding: 4,
  },
});

export default ProfileCard;
