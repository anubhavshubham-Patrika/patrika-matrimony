import React from 'react';
import {
  View, Text, StyleSheet, ScrollView, SafeAreaView,
  StatusBar
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import subscriptionsData from '../../src/data/subscriptions.json';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';
import MintGlassBackground from '../../src/components/MintGlassBackground';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants/theme';
import PremiumCard from '../../src/components/ui/PremiumCard';
import PremiumButton from '../../src/components/ui/PremiumButton';

interface PlanDefinition {
  id: string;
  name: string;
  price: number;
  durationText: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  popularTag?: string;
  features: string[];
  limitations: string[];
}

const PLANS: PlanDefinition[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    durationText: 'Free forever',
    icon: 'account',
    features: [
      'Browse up to 20 profiles/day',
      'Send 5 interests/day',
      'View basic profile info',
      'Use basic filters',
      '1 photo visible per profile',
    ],
    limitations: [
      'No contact details',
      'No direct messaging',
      'No phone numbers',
      'Limited search filters',
    ],
  },
  {
    id: 'gold',
    name: 'Gold',
    price: 1999,
    durationText: '₹1,999 / 3 months',
    icon: 'crown',
    features: [
      'Unlimited profile views',
      'Send indefinite interests',
      'View contact details (phone/email)',
      'Direct in-app messaging',
      'All search filters unlocked',
      'Gold badge on your profile',
      'Priority listing in search',
      '5 profile boosts/month',
    ],
    limitations: [
      'No relationship manager',
      'No video calls',
    ],
  },
  {
    id: 'platinum',
    name: 'Platinum',
    price: 3999,
    durationText: '₹3,999 / 6 months',
    icon: 'diamond-stone',
    features: [
      'Everything in Gold',
      'In-app secure voice calls',
      'Advanced horoscope & star match',
      'College & organization filters',
      'Access to private photos',
      'Platinum badge on profile',
      'Featured in "Verified Profiles" section',
      '15 profile boosts/month',
      'Read receipts in chat',
      'Profile highlighted in search results',
    ],
    limitations: [
      'No dedicated relationship manager',
    ],
  },
  {
    id: 'assisted',
    name: 'Assisted',
    price: 9999,
    durationText: '₹9,999 / 1 year',
    icon: 'star-face',
    popularTag: '🔥 Most Popular',
    features: [
      'Everything in Platinum',
      'Dedicated Relationship Manager',
      'Verified offline newspaper ad link',
      'Unlimited profile boosts',
      'Personalized matchmaking calls',
      'Hand-picked profiles delivered weekly',
      'VIP Priority Support',
    ],
    limitations: [],
  },
];

export default function SubscriptionScreen() {
  const router = useRouter();
  const { state } = useApp();

  const handleUpgrade = (plan: PlanDefinition) => {
    if (plan.id === 'free') return;
    (router as any).push({ pathname: '/payment', params: { planId: plan.id } });
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" />

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          {/* Header */}
          <View style={styles.header}>
            <Ionicons name="arrow-back" size={24} color={Colors.text} onPress={() => router.back()} />
            <View style={styles.headerBrandRow}>
              <PatrikaRibbonLogo size={24} />
              <Text style={styles.headerBrandText}>PATRIKA MATRIMONY</Text>
            </View>
            <View style={{ width: 24 }} />
          </View>

          <View style={styles.titleSection}>
            <Text style={styles.bannerTitle}>Membership Plans</Text>
            <Text style={styles.bannerSubtitle}>
              Choose a plan crafted for serious families — verified profiles, real contacts and expert matchmaking.
            </Text>

            <View style={styles.currentPlanPill}>
              <MaterialCommunityIcons name="crown" size={16} color={Colors.gold} />
              <Text style={styles.currentPlanText}>
                Current Plan: <Text style={styles.currentPlanBold}>{state.currentPlan}</Text>
              </Text>
            </View>
          </View>

          <View style={styles.plansContainer}>
            {PLANS.map((plan) => {
              const isCurrent = state.currentPlan === plan.name;
              const isYearly = plan.id === 'assisted';

              return (
                <PremiumCard
                  key={plan.id}
                  variant={isYearly ? 'highlight' : 'default'}
                  style={[styles.planCard, isYearly && styles.yearlyCardHighlight]}
                >
                  <View style={styles.planCardHeader}>
                    <View style={styles.planHeaderLeft}>
                      <View style={[styles.planIconCircle, isYearly && { backgroundColor: Colors.goldLight }]}>
                        <MaterialCommunityIcons 
                          name={plan.icon} 
                          size={24} 
                          color={isYearly ? Colors.primaryDark : Colors.primary} 
                        />
                      </View>
                      <View>
                        <Text style={[styles.planHeaderName, isYearly && { color: Colors.primaryDark }]}>
                          {plan.name}
                        </Text>
                        <Text style={styles.planHeaderDuration}>
                          {plan.durationText}
                        </Text>
                      </View>
                    </View>

                    {plan.popularTag ? (
                      <View style={styles.popularBadgePill}>
                        <Text style={styles.popularBadgeText}>{plan.popularTag}</Text>
                      </View>
                    ) : isCurrent ? (
                      <View style={styles.yourPlanBadgePill}>
                        <Text style={styles.yourPlanBadgeText}>Your Plan</Text>
                      </View>
                    ) : null}
                  </View>

                  <View style={styles.planCardBody}>
                    {plan.features.map((feat, idx) => (
                      <View key={`f-${idx}`} style={styles.featureRow}>
                        <Ionicons name="checkmark-circle" size={20} color={Colors.success} style={styles.featureIcon} />
                        <Text style={styles.featureText}>{feat}</Text>
                      </View>
                    ))}

                    {plan.limitations.map((lim, idx) => (
                      <View key={`l-${idx}`} style={styles.featureRow}>
                        <Ionicons name="close-circle-outline" size={20} color={Colors.textMuted} style={styles.featureIcon} />
                        <Text style={styles.limitationText}>{lim}</Text>
                      </View>
                    ))}

                    {plan.name !== 'Free' && !isCurrent && (
                      <View style={{ marginTop: Spacing.md }}>
                        <PremiumButton
                          title={`Upgrade to ${plan.name}`}
                          onPress={() => handleUpgrade(plan)}
                          variant={isYearly ? 'premium' : 'primary'}
                        />
                      </View>
                    )}

                    {isCurrent && plan.name !== 'Free' && (
                      <View style={styles.activePlanBadge}>
                        <Ionicons name="checkmark-circle" size={18} color={Colors.success} />
                        <Text style={styles.activePlanText}>Active Plan</Text>
                      </View>
                    )}
                  </View>
                </PremiumCard>
              );
            })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </MintGlassBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: Spacing['3xl'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    marginBottom: Spacing.xl,
  },
  headerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerBrandText: {
    fontSize: Typography.sizes.sm,
    fontWeight: '800',
    color: Colors.primaryDark,
    letterSpacing: 1.5,
  },
  titleSection: {
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  bannerTitle: {
    fontFamily: Typography.fontFamily.serif,
    fontSize: Typography.sizes['3xl'],
    color: Colors.primaryDark,
    marginBottom: Spacing.sm,
  },
  bannerSubtitle: {
    fontFamily: Typography.fontFamily.sans,
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginBottom: Spacing.md,
  },
  currentPlanPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.pill,
    alignSelf: 'flex-start',
    gap: Spacing.xs,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  currentPlanText: {
    fontFamily: Typography.fontFamily.sansMedium,
    fontSize: Typography.sizes.sm,
    color: Colors.text,
  },
  currentPlanBold: {
    fontFamily: Typography.fontFamily.sansBold,
    color: Colors.gold,
  },
  plansContainer: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.lg,
  },
  planCard: {
    marginBottom: Spacing.sm,
  },
  yearlyCardHighlight: {
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  planCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  planHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
  },
  planIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.secondaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  planHeaderName: {
    fontFamily: Typography.fontFamily.serif,
    fontSize: Typography.sizes.xl,
    color: Colors.text,
  },
  planHeaderDuration: {
    fontFamily: Typography.fontFamily.sans,
    fontSize: Typography.sizes.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  popularBadgePill: {
    backgroundColor: Colors.gold,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
  },
  popularBadgeText: {
    color: Colors.primaryDark,
    fontFamily: Typography.fontFamily.sansBold,
    fontSize: Typography.sizes.xs,
  },
  yourPlanBadgePill: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    borderRadius: BorderRadius.pill,
  },
  yourPlanBadgeText: {
    color: Colors.text,
    fontFamily: Typography.fontFamily.sansBold,
    fontSize: Typography.sizes.xs,
  },
  planCardBody: {
    gap: Spacing.sm,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  featureIcon: {
    marginTop: 2,
  },
  featureText: {
    fontFamily: Typography.fontFamily.sansMedium,
    fontSize: Typography.sizes.sm,
    color: Colors.text,
    flex: 1,
  },
  limitationText: {
    fontFamily: Typography.fontFamily.sans,
    fontSize: Typography.sizes.sm,
    color: Colors.textMuted,
    flex: 1,
  },
  activePlanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    backgroundColor: Colors.successLight,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.pill,
    marginTop: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.success,
  },
  activePlanText: {
    fontFamily: Typography.fontFamily.sansBold,
    fontSize: Typography.sizes.sm,
    color: Colors.success,
  },
});
