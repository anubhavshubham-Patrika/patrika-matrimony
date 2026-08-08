import React from 'react';
import { View, Text, StyleSheet, Image, ViewStyle, StyleProp } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import PremiumCard from './PremiumCard';
import PremiumButton from './PremiumButton';
import { Colors, Typography, Spacing, BorderRadius } from '../../constants/theme';

export interface ProfileCardProps {
  name: string;
  age: number;
  location: string;
  imageUrl: string;
  compatibility: number;
  reasons: string[];
  onLike?: () => void;
  onMessage?: () => void;
  onViewProfile?: () => void;
  style?: StyleProp<ViewStyle>;
}

export default function ProfileCard({
  name,
  age,
  location,
  imageUrl,
  compatibility,
  reasons,
  onLike,
  onMessage,
  onViewProfile,
  style,
}: ProfileCardProps) {
  return (
    <PremiumCard style={[styles.container, style]} noPadding>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUrl }} style={styles.image} resizeMode="cover" />
        <LinearGradient
          colors={['transparent', 'rgba(11, 31, 69, 0.8)', Colors.primaryDark]}
          style={styles.gradient}
        >
          <View style={styles.headerInfo}>
            <View>
              <Text style={styles.nameAge}>{name}, {age}</Text>
              <View style={styles.locationContainer}>
                <Ionicons name="location-outline" size={14} color={Colors.surface} />
                <Text style={styles.locationText}>{location}</Text>
              </View>
            </View>
            <View style={styles.compatibilityBadge}>
              <Text style={styles.compatibilityText}>{compatibility}% Match</Text>
            </View>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Why it's a match</Text>
        <View style={styles.reasonsContainer}>
          {reasons.slice(0, 4).map((reason, index) => (
            <View key={index} style={styles.reasonItem}>
              <Ionicons name="checkmark-circle" size={16} color={Colors.success} />
              <Text style={styles.reasonText}>{reason}</Text>
            </View>
          ))}
        </View>

        <View style={styles.actions}>
          <PremiumButton 
            title="Like" 
            icon="heart" 
            variant="premium" 
            onPress={() => onLike && onLike()} 
            style={styles.actionBtn} 
            fullWidth={false}
          />
          <PremiumButton 
            title="Message" 
            icon="chatbubble-outline" 
            variant="secondary" 
            onPress={() => onMessage && onMessage()} 
            style={styles.actionBtn} 
            fullWidth={false}
          />
        </View>
        
        <PremiumButton 
          title="View Full Profile" 
          variant="text" 
          onPress={() => onViewProfile && onViewProfile()} 
          style={styles.viewProfileBtn}
        />
      </View>
    </PremiumCard>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: Colors.surface,
  },
  imageContainer: {
    width: '100%',
    height: 380,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 180,
    justifyContent: 'flex-end',
    padding: Spacing.lg,
  },
  headerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  nameAge: {
    fontFamily: Typography.fontFamily.serif,
    fontSize: Typography.sizes['3xl'],
    color: Colors.surface,
    marginBottom: Spacing.xs,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontFamily: Typography.fontFamily.sans,
    fontSize: Typography.sizes.sm,
    color: Colors.surface,
    marginLeft: Spacing.xs,
  },
  compatibilityBadge: {
    backgroundColor: Colors.gold,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  compatibilityText: {
    fontFamily: Typography.fontFamily.sansBold,
    fontSize: Typography.sizes.sm,
    color: Colors.primaryDark,
  },
  content: {
    padding: Spacing.xl,
  },
  sectionTitle: {
    fontFamily: Typography.fontFamily.sansBold,
    fontSize: Typography.sizes.md,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  reasonsContainer: {
    marginBottom: Spacing.xl,
  },
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  reasonText: {
    fontFamily: Typography.fontFamily.sans,
    fontSize: Typography.sizes.md,
    color: Colors.text,
    marginLeft: Spacing.sm,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.sm,
  },
  actionBtn: {
    flex: 1,
    marginHorizontal: Spacing.xs,
  },
  viewProfileBtn: {
    marginTop: Spacing.xs,
  },
});
