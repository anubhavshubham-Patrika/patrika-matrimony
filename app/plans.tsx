import React, { useState } from 'react';
import { 
  View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Alert 
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useApp, Plan } from '../src/context/AppContext';
import MintGlassBackground from '../src/components/MintGlassBackground';

export default function PlansScreen() {
  const router = useRouter();
  const { dispatch } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<'Gold' | 'Platinum' | 'Assisted'>('Platinum');

  const plans = [
    {
      id: 'Gold',
      title: 'Gold Plan',
      duration: '3 Months Access',
      price: '₹1,999',
      originalPrice: '₹2,999',
      discount: '33% OFF',
      accentColor: '#D4AF37',
      features: [
        'Unlock 50 Mobile Numbers & Emails',
        'Unlimited Express Interest to Matches',
        'Direct Chat with Accepted Members',
        'Patrika Newspaper Ad Verification Badge',
      ],
    },
    {
      id: 'Platinum',
      title: 'Platinum Plan',
      duration: '6 Months Access',
      price: '₹3,999',
      originalPrice: '₹5,999',
      discount: '35% OFF',
      isPopular: true,
      accentColor: '#7B1FA2',
      features: [
        'Unlock Unlimited Contact Numbers & Emails',
        'Top Placement in Search Results (10x Views)',
        'Unlimited Chat & Horoscope Guna Matching',
        'Dedicated Relationship Advisor Support',
        'Exclusive Invite to Patrika Matrimony Meets',
      ],
    },
    {
      id: 'Assisted',
      title: 'Personalized Assisted Plan',
      duration: '1 Year Personal Service',
      price: '₹9,999',
      originalPrice: '₹14,999',
      discount: '33% OFF',
      accentColor: '#C2185B',
      features: [
        'Dedicated Matchmaker Hand-picks Profiles',
        'Personal Matchmaker Handles Parental Calls',
        'Guaranteed Verified Meetings Every Month',
        'Priority Print Classified Ad in Rajasthan Patrika',
      ],
    },
  ];

  const handleSubscribe = (planName: string, price: string) => {
    dispatch({
      type: 'SET_PLAN',
      payload: (planName.includes('Gold') ? 'Gold' : planName.includes('Platinum') ? 'Platinum' : 'Assisted') as Plan,
    });

    Alert.alert(
      '🎉 Membership Activated!',
      `Congratulations! You are now subscribed to Patrika Matrimony ${planName} (${price}). Unlimited contact details unlocked!`,
      [{ text: 'Start Connecting', onPress: () => router.replace('/(tabs)/home') }]
    );
  };

  return (
    <MintGlassBackground>
      <SafeAreaView style={styles.safeArea}>
        {/* Top Header */}
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
            <Ionicons name="arrow-back" size={22} color="#0F2E2B" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Membership Plans</Text>
          <View style={{ width: 36 }} />
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Glass Top Offer Card */}
          <View style={styles.offerGlassCard}>
            <View style={styles.offerBadge}>
              <MaterialCommunityIcons name="tag-outline" size={14} color="#0D9488" style={{ marginRight: 4 }} />
              <Text style={styles.offerBadgeText}>Special Rajasthan Offer</Text>
            </View>
            <Text style={styles.offerTitle}>Never Miss a Genuine Match!</Text>
            <Text style={styles.offerSub}>Subscribe to Premium and get 15% extra validity on all plans.</Text>
          </View>

          {/* Plan Choice Cards List */}
          <View style={styles.plansList}>
            {plans.map((plan) => {
              const isSel = selectedPlan === plan.id;
              return (
                <TouchableOpacity
                  key={plan.id}
                  style={[
                    styles.planGlassCard,
                    isSel && styles.planGlassCardSelected,
                    plan.isPopular && styles.planGlassCardPopular,
                  ]}
                  onPress={() => setSelectedPlan(plan.id as any)}
                  activeOpacity={0.9}
                >
                  {plan.isPopular && (
                    <View style={styles.popularBadgePill}>
                      <Text style={styles.popularText}>🔥 MOST POPULAR</Text>
                    </View>
                  )}

                  <View style={styles.planHeaderRow}>
                    <View>
                      <Text style={styles.planTitleText}>{plan.title}</Text>
                      <Text style={styles.planDurationText}>{plan.duration}</Text>
                    </View>

                    <View style={styles.priceCol}>
                      <Text style={styles.priceText}>{plan.price}</Text>
                      <View style={styles.discountRow}>
                        <Text style={styles.originalPriceText}>{plan.originalPrice}</Text>
                        <Text style={styles.discountText}>{plan.discount}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.dividerLine} />

                  <View style={styles.featuresList}>
                    {plan.features.map((feat, i) => (
                      <View key={i} style={styles.featureRow}>
                        <Ionicons name="checkmark-circle" size={16} color="#0D9488" style={{ marginRight: 8 }} />
                        <Text style={styles.featureText}>{feat}</Text>
                      </View>
                    ))}
                  </View>

                  <TouchableOpacity
                    style={[styles.selectPlanCtaBtn, isSel && styles.selectPlanCtaBtnActive]}
                    onPress={() => handleSubscribe(plan.title, plan.price)}
                    activeOpacity={0.88}
                  >
                    <Text style={[styles.selectPlanCtaText, isSel && styles.selectPlanCtaTextActive]}>
                      {isSel ? `Activate ${plan.title} →` : `Select ${plan.title}`}
                    </Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
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
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },

  scrollContent: {
    paddingHorizontal: 16,
    paddingBottom: 40,
  },

  offerGlassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.82)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 24,
    padding: 18,
    marginVertical: 10,
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 3,
  },
  offerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13, 148, 136, 0.12)',
    alignSelf: 'flex-start',
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginBottom: 8,
  },
  offerBadgeText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#0D9488',
  },
  offerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  offerSub: {
    fontSize: 13,
    color: '#4A6B66',
    marginTop: 4,
  },

  plansList: {
    gap: 16,
    marginTop: 6,
  },
  planGlassCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 26,
    padding: 20,
    position: 'relative',
    shadowColor: '#0F2E2B',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 3,
  },
  planGlassCardPopular: {
    borderColor: '#0D9488',
    borderWidth: 2,
  },
  planGlassCardSelected: {
    backgroundColor: '#FFFFFF',
    borderColor: '#0F2E2B',
  },
  popularBadgePill: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: '#0D9488',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  popularText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.5,
  },

  planHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  planTitleText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0F2E2B',
    fontFamily: 'serif',
  },
  planDurationText: {
    fontSize: 12,
    color: '#4A6B66',
    marginTop: 2,
  },
  priceCol: {
    alignItems: 'flex-end',
  },
  priceText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#0F2E2B',
  },
  discountRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  originalPriceText: {
    fontSize: 12,
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  discountText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#E31E25',
  },

  dividerLine: {
    height: 1,
    backgroundColor: 'rgba(15, 46, 43, 0.08)',
    marginVertical: 12,
  },

  featuresList: {
    gap: 8,
    marginBottom: 16,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  featureText: {
    fontSize: 13,
    color: '#0F2E2B',
    fontWeight: '600',
    flex: 1,
  },

  selectPlanCtaBtn: {
    backgroundColor: 'rgba(15, 46, 43, 0.08)',
    borderRadius: 22,
    paddingVertical: 14,
    alignItems: 'center',
  },
  selectPlanCtaBtnActive: {
    backgroundColor: '#0F2E2B',
  },
  selectPlanCtaText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#0F2E2B',
  },
  selectPlanCtaTextActive: {
    color: '#FFFFFF',
  },
});
