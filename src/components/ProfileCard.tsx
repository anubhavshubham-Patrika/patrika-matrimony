import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Profile } from '../context/AppContext';

interface ProfileCardProps {
  profile: Profile;
  onPress: () => void;
  onInterest: () => void;
  onShortlist: () => void;
  isShortlisted: boolean;
  isInterestSent: boolean;
  size?: 'full' | 'compact';
}

export default function ProfileCard({
  profile,
  onPress,
  onInterest,
  onShortlist,
  isShortlisted,
  isInterestSent,
  size = 'full',
}: ProfileCardProps) {
  if (size === 'compact') {
    return (
      <TouchableOpacity 
        style={styles.compactGlassCard} 
        onPress={onPress} 
        activeOpacity={0.88}
      >
        <Image 
          source={{ uri: profile.profilePhotoURL || 'https://randomuser.me/api/portraits/women/44.jpg' }} 
          style={styles.compactPhoto}
          resizeMode="cover"
        />
        <View style={styles.compactInfoCol}>
          <View style={styles.compactHeaderRow}>
            <Text style={styles.compactNameText} numberOfLines={1}>
              {profile.name}, {profile.age}
            </Text>
            {profile.isVerified && (
              <Ionicons name="checkmark-circle" size={16} color="#0D9488" style={{ marginLeft: 4 }} />
            )}
          </View>

          <Text style={styles.compactSubText} numberOfLines={1}>
            {profile.height} • {profile.caste} • {profile.residentCity}
          </Text>

          <Text style={styles.compactJobText} numberOfLines={1}>
            {profile.occupation}
          </Text>

          <View style={styles.compactActionRow}>
            <TouchableOpacity 
              style={[styles.compactInterestBtn, isInterestSent && styles.compactInterestBtnSent]} 
              onPress={onInterest}
            >
              <Ionicons 
                name={isInterestSent ? "checkmark-circle" : "heart"} 
                size={14} 
                color={isInterestSent ? "#FFFFFF" : "#0F2E2B"} 
              />
              <Text style={[styles.compactInterestText, isInterestSent && { color: '#FFFFFF' }]}>
                {isInterestSent ? 'Sent' : 'Interest'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.compactShortlistBtn} onPress={onShortlist}>
              <Ionicons 
                name={isShortlisted ? "star" : "star-outline"} 
                size={16} 
                color={isShortlisted ? "#D4AF37" : "#64748B"} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity 
      style={styles.fullGlassCard} 
      onPress={onPress} 
      activeOpacity={0.9}
    >
      {/* Profile Photo Header */}
      <View style={styles.photoWrapper}>
        <Image 
          source={{ uri: profile.profilePhotoURL || 'https://randomuser.me/api/portraits/women/44.jpg' }} 
          style={styles.fullPhoto}
          resizeMode="cover"
        />

        {/* Top Badges Floating Row */}
        <View style={styles.topBadgesRow}>
          {profile.matchScore && profile.matchScore >= 80 ? (
            <View style={styles.matchScoreGlassBadge}>
              <MaterialCommunityIcons name="auto-fix" size={14} color="#0D9488" style={{ marginRight: 4 }} />
              <Text style={styles.matchScoreText}>{profile.matchScore}% Match</Text>
            </View>
          ) : null}

          {profile.isNewspaperAdLinked && (
            <View style={styles.newspaperGlassBadge}>
              <Ionicons name="newspaper-outline" size={13} color="#0F2E2B" style={{ marginRight: 4 }} />
              <Text style={styles.newspaperText}>Patrika Ad</Text>
            </View>
          )}
        </View>

        {/* Shortlist Floating Star Button */}
        <TouchableOpacity 
          style={[styles.floatingStarBtn, isShortlisted && styles.floatingStarBtnActive]} 
          onPress={onShortlist}
          activeOpacity={0.8}
        >
          <Ionicons 
            name={isShortlisted ? "star" : "star-outline"} 
            size={18} 
            color={isShortlisted ? "#D4AF37" : "#475569"} 
          />
        </TouchableOpacity>
      </View>

      {/* Info Section */}
      <View style={styles.cardInfoSection}>
        <View style={styles.nameRow}>
          <Text style={styles.nameText}>{profile.name}, {profile.age}</Text>
          {profile.isVerified && (
            <View style={styles.verifiedGlassPill}>
              <Ionicons name="shield-checkmark" size={13} color="#0D9488" style={{ marginRight: 3 }} />
              <Text style={styles.verifiedText}>Verified</Text>
            </View>
          )}
        </View>

        <Text style={styles.detailsSubText}>
          {profile.height} • {profile.religion} ({profile.caste}) • {profile.residentCity}, {profile.residentState}
        </Text>

        <View style={styles.jobRow}>
          <MaterialCommunityIcons name="briefcase-outline" size={15} color="#0D9488" style={{ marginRight: 6 }} />
          <Text style={styles.jobText} numberOfLines={1}>{profile.occupation} • {profile.education?.degree}</Text>
        </View>

        {/* Action Buttons Row */}
        <View style={styles.actionBtnRow}>
          <TouchableOpacity 
            style={[styles.interestMainBtn, isInterestSent && styles.interestMainBtnSent]} 
            onPress={onInterest}
            activeOpacity={0.88}
          >
            <Ionicons 
              name={isInterestSent ? "checkmark-circle" : "heart"} 
              size={18} 
              color="#FFFFFF" 
              style={{ marginRight: 6 }} 
            />
            <Text style={styles.interestMainText}>
              {isInterestSent ? 'Interest Sent' : 'Send Interest'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.viewProfileBtn} onPress={onPress} activeOpacity={0.88}>
            <Text style={styles.viewProfileText}>View Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  compactGlassCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 22,
    padding: 12,
    marginBottom: 12,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
  compactPhoto: {
    width: 80,
    height: 96,
    borderRadius: 16,
    marginRight: 12,
  },
  compactInfoCol: {
    flex: 1,
    justifyContent: 'center',
  },
  compactHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  compactNameText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0F2E2B',
  },
  compactSubText: {
    fontSize: 12,
    color: '#4A6B66',
    marginTop: 2,
  },
  compactJobText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0D9488',
    marginTop: 2,
  },
  compactActionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 8,
  },
  compactInterestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(15, 46, 43, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(15, 46, 43, 0.2)',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  compactInterestBtnSent: {
    backgroundColor: '#0D9488',
    borderColor: '#0D9488',
  },
  compactInterestText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#0F2E2B',
    marginLeft: 4,
  },
  compactShortlistBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(15, 46, 43, 0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  fullGlassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 26,
    overflow: 'hidden',
    marginBottom: 18,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 4,
  },
  photoWrapper: {
    position: 'relative',
    width: '100%',
    height: 220,
  },
  fullPhoto: {
    width: '100%',
    height: '100%',
  },
  topBadgesRow: {
    position: 'absolute',
    top: 12,
    left: 12,
    flexDirection: 'row',
    gap: 8,
  },
  matchScoreGlassBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  matchScoreText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0D9488',
  },
  newspaperGlassBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(232, 245, 243, 0.95)',
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: 'rgba(13, 148, 136, 0.3)',
  },
  newspaperText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0F2E2B',
  },
  floatingStarBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.88)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingStarBtnActive: {
    backgroundColor: '#FFFBEB',
  },

  cardInfoSection: {
    padding: 16,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nameText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  verifiedGlassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    borderRadius: 14,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  verifiedText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0D9488',
  },
  detailsSubText: {
    fontSize: 13,
    color: '#4A6B66',
    marginBottom: 6,
  },
  jobRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  jobText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0D9488',
    flex: 1,
  },
  actionBtnRow: {
    flexDirection: 'row',
    gap: 10,
  },
  interestMainBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0F2E2B',
    borderRadius: 20,
    paddingVertical: 12,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  interestMainBtnSent: {
    backgroundColor: '#0D9488',
    shadowColor: '#0D9488',
  },
  interestMainText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  viewProfileBtn: {
    backgroundColor: 'rgba(15, 46, 43, 0.08)',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewProfileText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0F2E2B',
  },
});
