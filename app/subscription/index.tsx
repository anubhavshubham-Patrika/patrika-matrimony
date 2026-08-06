import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
  StatusBar, Modal, Alert, TextInput, Platform
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import subscriptionsData from '../../src/data/subscriptions.json';
import PatrikaRibbonLogo from '../../src/components/PatrikaRibbonLogo';

const MAGENTA = '#C2185B';
const GOLD = '#D4AF37';
const PURPLE = '#8E24AA';
const ROSE = '#D81B60';

interface PlanDefinition {
  id: string;
  name: string;
  price: number;
  durationText: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  color: string;
  headerBg: string;
  btnBg: string;
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
    color: '#6A565C',
    headerBg: '#FFEBEF',
    btnBg: '#6A565C',
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
    color: GOLD,
    headerBg: '#C59B27',
    btnBg: '#D4AF37',
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
    color: PURPLE,
    headerBg: '#7B1FA2',
    btnBg: '#8E24AA',
    popularTag: '🔥 Most Popular',
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
    color: ROSE,
    headerBg: '#C2185B',
    btnBg: '#D81B60',
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
  const { state, dispatch } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<PlanDefinition | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Netbanking'>('UPI');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [upiId, setUpiId] = useState('');

  const handleUpgrade = (plan: PlanDefinition) => {
    if (plan.name === 'Free') return;
    setSelectedPlan(plan);
    setShowPaymentModal(true);
    setPaymentSuccess(false);
  };

  const handlePay = () => {
    setTimeout(() => {
      setPaymentSuccess(true);
      if (selectedPlan) {
        dispatch({ type: 'SET_PLAN', payload: selectedPlan.name as any });
      }
    }, 1500);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={MAGENTA} />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Top Header Banner */}
        <View style={styles.topHeaderBanner}>
          <View style={styles.headerTopBar}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={22} color="#C2185B" />
            </TouchableOpacity>

            <View style={styles.headerBrandRow}>
              <PatrikaRibbonLogo size={24} />
              <Text style={styles.headerBrandText}>PATRIKA MATRIMONY</Text>
            </View>

            <View style={{ width: 36 }} />
          </View>

          <Text style={styles.bannerTitle}>Membership{'\n'}Plans</Text>
          <Text style={styles.bannerSubtitle}>
            Choose a plan crafted for serious families — verified profiles, real contacts and expert matchmaking.
          </Text>

          <View style={styles.currentPlanGlassPill}>
            <MaterialCommunityIcons name="crown" size={16} color="#FFD700" />
            <Text style={styles.currentPlanGlassText}>
              Current Plan: <Text style={styles.currentPlanBold}>{state.currentPlan}</Text>
            </Text>
          </View>
        </View>

        {/* Plan Cards List */}
        <View style={styles.plansContainer}>
          {PLANS.map((plan) => {
            const isCurrent = state.currentPlan === plan.name;

            return (
              <View key={plan.id} style={styles.planCard}>
                {/* Plan Card Header Bar */}
                <View style={[styles.planCardHeader, { backgroundColor: plan.headerBg }]}>
                  <View style={styles.planHeaderLeft}>
                    <View style={styles.planIconCircle}>
                      <MaterialCommunityIcons 
                        name={plan.icon} 
                        size={22} 
                        color={plan.id === 'free' ? MAGENTA : '#FFFFFF'} 
                      />
                    </View>
                    <View>
                      <Text style={[styles.planHeaderName, plan.id === 'free' && { color: '#2C1A1D' }]}>
                        {plan.name}
                      </Text>
                      <Text style={[styles.planHeaderDuration, plan.id === 'free' && { color: '#5A4A4D' }]}>
                        {plan.durationText}
                      </Text>
                    </View>
                  </View>

                  {/* Header Badge */}
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

                {/* Plan Card Body Features List */}
                <View style={styles.planCardBody}>
                  {plan.features.map((feat, idx) => (
                    <View key={`f-${idx}`} style={styles.featureRow}>
                      <Ionicons name="checkmark-circle" size={18} color="#C2185B" style={styles.featureIcon} />
                      <Text style={styles.featureText}>{feat}</Text>
                    </View>
                  ))}

                  {plan.limitations.map((lim, idx) => (
                    <View key={`l-${idx}`} style={styles.featureRow}>
                      <Ionicons name="close-circle-outline" size={18} color="#A39396" style={styles.featureIcon} />
                      <Text style={styles.limitationText}>{lim}</Text>
                    </View>
                  ))}

                  {/* CTA Button */}
                  {plan.name !== 'Free' && !isCurrent && (
                    <TouchableOpacity
                      style={[styles.upgradeBtn, { backgroundColor: plan.btnBg }]}
                      onPress={() => handleUpgrade(plan)}
                      activeOpacity={0.88}
                    >
                      <Text style={styles.upgradeBtnText}>Upgrade to {plan.name}</Text>
                    </TouchableOpacity>
                  )}

                  {isCurrent && plan.name !== 'Free' && (
                    <View style={styles.activePlanBadge}>
                      <Ionicons name="checkmark-circle" size={18} color="#27AE60" />
                      <Text style={styles.activePlanText}>Active Plan</Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </View>

        {/* Recent Transactions Section */}
        <View style={styles.transactionsCard}>
          <Text style={styles.txSectionTitle}>Recent Transactions</Text>
          {(subscriptionsData as any[]).slice(0, 4).map((tx: any) => (
            <View key={tx.paymentId} style={styles.txRow}>
              <View style={[styles.txIconCircle, { backgroundColor: tx.status === 'Success' ? '#E8F8F5' : '#FDEDEC' }]}>
                <Ionicons
                  name={tx.status === 'Success' ? 'checkmark-circle' : 'close-circle'}
                  size={18}
                  color={tx.status === 'Success' ? '#1E8449' : '#E74C3C'}
                />
              </View>

              <View style={{ flex: 1 }}>
                <Text style={styles.txPlanName}>{tx.planName} Plan</Text>
                <Text style={styles.txMetaText}>{tx.mode} • {new Date(tx.timestamp).toLocaleDateString('en-IN')}</Text>
              </View>

              <Text style={[styles.txAmountText, { color: tx.status === 'Success' ? '#1E8449' : '#E74C3C' }]}>
                ₹{tx.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Payment Modal */}
      <Modal visible={showPaymentModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalSafeArea}>
          {!paymentSuccess ? (
            <>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowPaymentModal(false)} style={styles.modalCloseBtn}>
                  <Ionicons name="close" size={24} color="#2C1A1D" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Complete Payment</Text>
                <View style={{ width: 24 }} />
              </View>

              <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
                {/* Selected Plan Summary */}
                <View style={[styles.modalPlanSummary, { borderLeftColor: selectedPlan?.btnBg || MAGENTA }]}>
                  <Text style={styles.modalPlanName}>{selectedPlan?.name} Plan</Text>
                  <Text style={styles.modalPlanDuration}>{selectedPlan?.durationText}</Text>
                  <Text style={styles.modalPlanPrice}>₹{selectedPlan?.price?.toLocaleString()}</Text>
                </View>

                {/* Payment Method Selector */}
                <Text style={styles.paymentSectionTitle}>Select Payment Method</Text>
                {(['UPI', 'Card', 'Netbanking'] as const).map((method) => (
                  <TouchableOpacity
                    key={method}
                    style={[styles.methodCard, paymentMethod === method && styles.methodCardActive]}
                    onPress={() => setPaymentMethod(method)}
                    activeOpacity={0.88}
                  >
                    <MaterialCommunityIcons
                      name={method === 'UPI' ? 'contactless-payment' : method === 'Card' ? 'credit-card' : 'bank'}
                      size={24}
                      color={paymentMethod === method ? MAGENTA : '#5A4A4D'}
                    />
                    <Text style={[styles.methodText, paymentMethod === method && { color: MAGENTA, fontWeight: '800' }]}>
                      {method === 'UPI' ? 'UPI (GPay, PhonePe, Paytm, BHIM)' : method === 'Card' ? 'Credit / Debit Card' : 'Net Banking'}
                    </Text>
                    <View style={[styles.radioCircle, paymentMethod === method && styles.radioCircleActive]}>
                      {paymentMethod === method && <View style={styles.radioDot} />}
                    </View>
                  </TouchableOpacity>
                ))}

                {paymentMethod === 'UPI' && (
                  <TextInput
                    style={styles.upiInputField}
                    placeholder="Enter UPI ID (e.g. yourname@upi)"
                    value={upiId}
                    onChangeText={setUpiId}
                    autoCapitalize="none"
                    placeholderTextColor="#8C7A7C"
                  />
                )}

                {/* Order Total Breakdown */}
                <View style={styles.orderBreakdownCard}>
                  <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>Plan Amount</Text>
                    <Text style={styles.orderValue}>₹{selectedPlan?.price?.toLocaleString()}</Text>
                  </View>
                  <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>GST (18%)</Text>
                    <Text style={styles.orderValue}>₹{Math.round((selectedPlan?.price || 0) * 0.18).toLocaleString()}</Text>
                  </View>
                  <View style={[styles.orderRow, styles.orderTotalRow]}>
                    <Text style={styles.orderTotalLabel}>Total Payable</Text>
                    <Text style={styles.orderTotalValue}>₹{Math.round((selectedPlan?.price || 0) * 1.18).toLocaleString()}</Text>
                  </View>
                </View>
              </ScrollView>

              <View style={styles.payFooter}>
                <TouchableOpacity style={styles.payBtn} onPress={handlePay} activeOpacity={0.88}>
                  <Ionicons name="lock-closed" size={18} color="#FFFFFF" />
                  <Text style={styles.payBtnText}>
                    Pay ₹{Math.round((selectedPlan?.price || 0) * 1.18).toLocaleString()} Securely
                  </Text>
                </TouchableOpacity>
                <Text style={styles.payEncryptedNote}>🔒 256-bit SSL Bank Encrypted</Text>
              </View>
            </>
          ) : (
            /* Success Activation Screen */
            <View style={styles.successContainer}>
              <View style={styles.successCircle}>
                <Ionicons name="checkmark-circle" size={80} color="#27AE60" />
              </View>
              <Text style={styles.successTitle}>Payment Successful! 🎉</Text>
              <Text style={styles.successSubtitle}>{selectedPlan?.name} Plan Activated</Text>
              <Text style={styles.successTxRef}>Transaction Ref: TXN{Date.now().toString().slice(-10)}</Text>
              
              <TouchableOpacity
                style={styles.exploreMatchesBtn}
                onPress={() => { setShowPaymentModal(false); router.push('/(tabs)/home'); }}
                activeOpacity={0.88}
              >
                <Text style={styles.exploreMatchesBtnText}>Explore Premium Matches →</Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF9F6',
  },
  scrollContent: {
    paddingBottom: 20,
  },

  /* Top Banner */
  topHeaderBanner: {
    backgroundColor: MAGENTA,
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'android' ? 36 : 10,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTopBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBrandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerBrandText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1.5,
  },
  bannerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
    lineHeight: 38,
    marginBottom: 8,
  },
  bannerSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 19,
    marginBottom: 16,
  },
  currentPlanGlassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  currentPlanGlassText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
  },
  currentPlanBold: {
    fontWeight: '800',
    color: '#FFD700',
  },

  /* Plans Container */
  plansContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
    gap: 18,
  },
  planCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#EFE6DD',
    shadowColor: '#2C1A1D',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  planCardHeader: {
    paddingHorizontal: 18,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  planHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  planIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  planHeaderName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
    fontFamily: 'serif',
  },
  planHeaderDuration: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.9)',
    fontWeight: '600',
    marginTop: 1,
  },
  popularBadgePill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  popularBadgeText: {
    color: MAGENTA,
    fontSize: 11,
    fontWeight: '800',
  },
  yourPlanBadgePill: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 14,
  },
  yourPlanBadgeText: {
    color: '#2C1A1D',
    fontSize: 11,
    fontWeight: '800',
  },
  planCardBody: {
    padding: 18,
    gap: 10,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  featureIcon: {
    marginTop: 1,
  },
  featureText: {
    fontSize: 13,
    color: '#2C1A1D',
    fontWeight: '600',
    flex: 1,
  },
  limitationText: {
    fontSize: 13,
    color: '#A39396',
    fontWeight: '500',
    flex: 1,
  },
  upgradeBtn: {
    marginTop: 12,
    paddingVertical: 15,
    borderRadius: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  upgradeBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  activePlanBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#E8F8F5',
    paddingVertical: 12,
    borderRadius: 20,
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#A3E4D7',
  },
  activePlanText: {
    color: '#1E8449',
    fontSize: 14,
    fontWeight: '800',
  },

  /* Transactions Card */
  transactionsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: 24,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  txSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
    marginBottom: 12,
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
    gap: 12,
  },
  txIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txPlanName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2C1A1D',
  },
  txMetaText: {
    fontSize: 12,
    color: '#8C7A7C',
    marginTop: 2,
  },
  txAmountText: {
    fontSize: 14,
    fontWeight: '800',
  },

  /* Payment Modal Styles */
  modalSafeArea: {
    flex: 1,
    backgroundColor: '#FFF9F6',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EFE6DD',
  },
  modalCloseBtn: {
    padding: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
  },
  modalPlanSummary: {
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 5,
    borderRadius: 16,
    padding: 18,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  modalPlanName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
  },
  modalPlanDuration: {
    fontSize: 13,
    color: '#5A4A4D',
    marginTop: 2,
  },
  modalPlanPrice: {
    fontSize: 28,
    fontWeight: '800',
    color: MAGENTA,
    marginTop: 8,
  },
  paymentSectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#2C1A1D',
    marginBottom: 12,
  },
  methodCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    gap: 12,
    borderWidth: 1,
    borderColor: '#EFE6DD',
  },
  methodCardActive: {
    borderColor: MAGENTA,
    backgroundColor: '#FFF0F3',
  },
  methodText: {
    flex: 1,
    fontSize: 14,
    color: '#5A4A4D',
    fontWeight: '600',
  },
  radioCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A39396',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioCircleActive: {
    borderColor: MAGENTA,
  },
  radioDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: MAGENTA,
  },
  upiInputField: {
    borderWidth: 1,
    borderColor: '#EFE6DD',
    borderRadius: 14,
    padding: 14,
    fontSize: 14,
    color: '#2C1A1D',
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  orderBreakdownCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#EFE6DD',
    gap: 8,
    marginTop: 10,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  orderLabel: {
    color: '#5A4A4D',
    fontSize: 13,
  },
  orderValue: {
    color: '#2C1A1D',
    fontSize: 13,
    fontWeight: '700',
  },
  orderTotalRow: {
    borderTopWidth: 1,
    borderTopColor: '#EFE6DD',
    paddingTop: 10,
    marginTop: 4,
  },
  orderTotalLabel: {
    fontSize: 15,
    fontWeight: '800',
    color: '#2C1A1D',
  },
  orderTotalValue: {
    fontSize: 18,
    fontWeight: '800',
    color: MAGENTA,
  },
  payFooter: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#EFE6DD',
  },
  payBtn: {
    backgroundColor: MAGENTA,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 24,
    gap: 8,
    shadowColor: MAGENTA,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  payBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  payEncryptedNote: {
    textAlign: 'center',
    fontSize: 12,
    color: '#8C7A7C',
    marginTop: 8,
  },
  successContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  successCircle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: '#E8F8F5',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2C1A1D',
    fontFamily: 'serif',
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 16,
    color: '#1E8449',
    fontWeight: '700',
    marginTop: 6,
  },
  successTxRef: {
    fontSize: 12,
    color: '#8C7A7C',
    marginTop: 10,
    marginBottom: 24,
  },
  exploreMatchesBtn: {
    backgroundColor: MAGENTA,
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 24,
  },
  exploreMatchesBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
