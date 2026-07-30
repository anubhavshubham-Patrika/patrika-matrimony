import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
  StatusBar, Modal, FlatList, Alert, TextInput
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';
import plansData from '../../src/data/plans.json';
import subscriptionsData from '../../src/data/subscriptions.json';

const PRIMARY = '#C0392B';
const GOLD = '#F39C12';
const PURPLE = '#8E44AD';

const PLAN_COLORS: Record<string, string> = {
  Free: '#666666',
  Gold: GOLD,
  Platinum: PURPLE,
  Assisted: PRIMARY,
};

export default function SubscriptionScreen() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Netbanking'>('UPI');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [upiId, setUpiId] = useState('');

  const handleUpgrade = (plan: any) => {
    if (plan.name === 'Free') return;
    setSelectedPlan(plan);
    setShowPaymentModal(true);
    setPaymentSuccess(false);
  };

  const handlePay = () => {
    setTimeout(() => {
      setPaymentSuccess(true);
      dispatch({ type: 'SET_PLAN', payload: selectedPlan.name });
    }, 1500);
  };

  const renderFeature = (feature: string, positive = true) => (
    <View key={feature} style={styles.featureRow}>
      <MaterialCommunityIcons
        name={positive ? 'check-circle' : 'close-circle'}
        size={16}
        color={positive ? '#27AE60' : '#ccc'}
      />
      <Text style={styles.featureText}>{feature}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription Plans</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Current plan banner */}
        <View style={styles.currentPlanBanner}>
          <MaterialCommunityIcons name="crown" size={20} color={GOLD} />
          <Text style={styles.currentPlanText}>
            Current Plan: <Text style={{ fontWeight: '800', color: GOLD }}>{state.currentPlan}</Text>
          </Text>
        </View>

        {/* Plan cards */}
        {(plansData as any[]).map((plan) => {
          const planColor = PLAN_COLORS[plan.name] || PRIMARY;
          const isCurrent = state.currentPlan === plan.name;
          return (
            <View key={plan.planId} style={[styles.planCard, isCurrent && styles.currentPlanCard]}>
              {plan.popular && (
                <View style={styles.popularRibbon}>
                  <Text style={styles.popularRibbonText}>⭐ Most Popular</Text>
                </View>
              )}
              {isCurrent && (
                <View style={[styles.currentBadge, { backgroundColor: planColor }]}>
                  <Text style={styles.currentBadgeText}>Your Plan</Text>
                </View>
              )}

              {/* Plan Header */}
              <View style={[styles.planHeader, { backgroundColor: planColor }]}>
                <MaterialCommunityIcons name={plan.icon as any} size={32} color="#fff" />
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <Text style={styles.planName}>{plan.name}</Text>
                  {plan.price > 0 ? (
                    <Text style={styles.planPrice}>₹{plan.price.toLocaleString()}/{plan.durationDays === 90 ? '3 months' : plan.durationDays === 180 ? '6 months' : plan.durationDays === 365 ? '1 year' : 'Forever'}</Text>
                  ) : (
                    <Text style={styles.planPrice}>Free forever</Text>
                  )}
                </View>
              </View>

              {/* Features */}
              <View style={styles.planFeatures}>
                {plan.features.map((f: string) => renderFeature(f, true))}
                {plan.limitations && plan.limitations.map((f: string) => renderFeature(f, false))}
              </View>

              {/* CTA */}
              {plan.name !== 'Free' && !isCurrent && (
                <TouchableOpacity
                  style={[styles.upgradePlanBtn, { backgroundColor: planColor }]}
                  onPress={() => handleUpgrade(plan)}
                >
                  <Text style={styles.upgradePlanBtnText}>Upgrade to {plan.name}</Text>
                </TouchableOpacity>
              )}
              {isCurrent && plan.name !== 'Free' && (
                <View style={[styles.activeBtn]}>
                  <MaterialCommunityIcons name="check-circle" size={16} color="#27AE60" />
                  <Text style={styles.activeBtnText}>Active Plan</Text>
                </View>
              )}
            </View>
          );
        })}

        {/* Recent transactions */}
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          {(subscriptionsData as any[]).slice(0, 5).map((tx: any) => (
            <View key={tx.paymentId} style={styles.txRow}>
              <View style={styles.txIcon}>
                <MaterialCommunityIcons
                  name={tx.status === 'Success' ? 'check-circle' : 'close-circle'}
                  size={20}
                  color={tx.status === 'Success' ? '#27AE60' : '#E74C3C'}
                />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.txPlan}>{tx.planName} Plan</Text>
                <Text style={styles.txMeta}>{tx.mode} • {new Date(tx.timestamp).toLocaleDateString('en-IN')}</Text>
              </View>
              <Text style={[styles.txAmount, { color: tx.status === 'Success' ? '#27AE60' : '#E74C3C' }]}>
                ₹{tx.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Payment Modal */}
      <Modal visible={showPaymentModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView style={styles.modalContainer}>
          {!paymentSuccess ? (
            <>
              <View style={styles.modalHeader}>
                <TouchableOpacity onPress={() => setShowPaymentModal(false)}>
                  <Ionicons name="close" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.modalTitle}>Complete Payment</Text>
                <View style={{ width: 24 }} />
              </View>

              <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 16 }}>
                {/* Plan summary */}
                <View style={[styles.planSummary, { borderLeftColor: PLAN_COLORS[selectedPlan?.name] || PRIMARY }]}>
                  <Text style={styles.planSummaryName}>{selectedPlan?.name} Plan</Text>
                  <Text style={styles.planSummaryDuration}>{selectedPlan?.durationDays === 365 ? '1 Year' : selectedPlan?.durationDays === 180 ? '6 Months' : '3 Months'} access</Text>
                  <Text style={styles.planSummaryPrice}>₹{selectedPlan?.price?.toLocaleString()}</Text>
                </View>

                {/* Payment method */}
                <Text style={styles.paymentMethodTitle}>Choose Payment Method</Text>
                {(['UPI', 'Card', 'Netbanking'] as const).map((method) => (
                  <TouchableOpacity
                    key={method}
                    style={[styles.methodBtn, paymentMethod === method && styles.methodBtnActive]}
                    onPress={() => setPaymentMethod(method)}
                  >
                    <MaterialCommunityIcons
                      name={method === 'UPI' ? 'contactless-payment' : method === 'Card' ? 'credit-card' : 'bank'}
                      size={24}
                      color={paymentMethod === method ? PRIMARY : '#666'}
                    />
                    <Text style={[styles.methodBtnText, paymentMethod === method && { color: PRIMARY }]}>
                      {method === 'UPI' ? 'UPI (GPay, PhonePe, BHIM)' : method === 'Card' ? 'Credit / Debit Card' : 'Net Banking'}
                    </Text>
                    <View style={[styles.radioOuter, paymentMethod === method && styles.radioActive]}>
                      {paymentMethod === method && <View style={styles.radioInner} />}
                    </View>
                  </TouchableOpacity>
                ))}

                {paymentMethod === 'UPI' && (
                  <TextInput
                    style={styles.upiInput}
                    placeholder="Enter UPI ID (e.g. name@upi)"
                    value={upiId}
                    onChangeText={setUpiId}
                    autoCapitalize="none"
                  />
                )}

                {/* Order Summary */}
                <View style={styles.orderSummary}>
                  <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>Plan Amount</Text>
                    <Text style={styles.orderValue}>₹{selectedPlan?.price?.toLocaleString()}</Text>
                  </View>
                  <View style={styles.orderRow}>
                    <Text style={styles.orderLabel}>GST (18%)</Text>
                    <Text style={styles.orderValue}>₹{Math.round((selectedPlan?.price || 0) * 0.18).toLocaleString()}</Text>
                  </View>
                  <View style={[styles.orderRow, styles.orderTotal]}>
                    <Text style={styles.orderTotalLabel}>Total</Text>
                    <Text style={styles.orderTotalValue}>₹{Math.round((selectedPlan?.price || 0) * 1.18).toLocaleString()}</Text>
                  </View>
                </View>
              </ScrollView>

              <View style={styles.payBtnContainer}>
                <TouchableOpacity style={styles.payBtn} onPress={handlePay}>
                  <MaterialCommunityIcons name="lock" size={18} color="#fff" />
                  <Text style={styles.payBtnText}>
                    Pay ₹{Math.round((selectedPlan?.price || 0) * 1.18).toLocaleString()} Securely
                  </Text>
                </TouchableOpacity>
                <Text style={styles.payBtnNote}>🔒 256-bit SSL encrypted payment</Text>
              </View>
            </>
          ) : (
            <View style={styles.successScreen}>
              <View style={styles.successCircle}>
                <MaterialCommunityIcons name="check-circle" size={80} color="#27AE60" />
              </View>
              <Text style={styles.successTitle}>Payment Successful! 🎉</Text>
              <Text style={styles.successSubtitle}>{selectedPlan?.name} Plan Activated</Text>
              <Text style={styles.successTxId}>Txn ID: TXN{Date.now().toString().slice(-10)}</Text>
              <View style={styles.successFeatures}>
                {selectedPlan?.features?.slice(0, 3).map((f: string) => (
                  <View key={f} style={styles.successFeatureRow}>
                    <MaterialCommunityIcons name="check-circle" size={16} color="#27AE60" />
                    <Text style={styles.successFeatureText}>{f}</Text>
                  </View>
                ))}
              </View>
              <TouchableOpacity
                style={styles.exploreBtn}
                onPress={() => { setShowPaymentModal(false); router.push('/(tabs)/home'); }}
              >
                <Text style={styles.exploreBtnText}>Explore Premium Matches →</Text>
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: {
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backBtn: { padding: 4 },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#fff' },
  currentPlanBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF9E6',
    padding: 14,
    gap: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE082',
  },
  currentPlanText: { fontSize: 14, color: '#333' },
  planCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  currentPlanCard: { borderColor: GOLD },
  popularRibbon: {
    backgroundColor: '#FF6B6B',
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 4,
    margin: 8,
    borderRadius: 12,
  },
  popularRibbonText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  currentBadge: {
    position: 'absolute',
    top: 0,
    right: 0,
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderBottomLeftRadius: 12,
    zIndex: 2,
  },
  currentBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700' },
  planHeader: { padding: 16, flexDirection: 'row', alignItems: 'center' },
  planName: { color: '#fff', fontSize: 20, fontWeight: '900' },
  planPrice: { color: 'rgba(255,255,255,0.85)', fontSize: 14, marginTop: 2 },
  planFeatures: { padding: 16, gap: 8 },
  featureRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  featureText: { fontSize: 13, color: '#333', flex: 1 },
  upgradePlanBtn: {
    margin: 16,
    marginTop: 4,
    padding: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  upgradePlanBtnText: { color: '#fff', fontWeight: '800', fontSize: 15 },
  activeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    margin: 16,
    marginTop: 4,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#E8F5E9',
  },
  activeBtnText: { color: '#27AE60', fontWeight: '700', fontSize: 15 },
  transactionsSection: { margin: 16, backgroundColor: '#fff', borderRadius: 12, padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '800', color: '#1A1A2E', marginBottom: 12 },
  txRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: '#f5f5f5', gap: 10 },
  txIcon: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#F5F5F5', alignItems: 'center', justifyContent: 'center' },
  txPlan: { fontSize: 14, fontWeight: '600', color: '#1A1A2E' },
  txMeta: { fontSize: 12, color: '#999', marginTop: 2 },
  txAmount: { fontSize: 15, fontWeight: '800' },
  modalContainer: { flex: 1, backgroundColor: '#fff' },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: { fontSize: 18, fontWeight: '800', color: '#1A1A2E' },
  planSummary: {
    backgroundColor: '#FFF5F5',
    borderLeftWidth: 4,
    borderRadius: 8,
    padding: 16,
    marginBottom: 20,
  },
  planSummaryName: { fontSize: 20, fontWeight: '900', color: '#1A1A2E' },
  planSummaryDuration: { fontSize: 14, color: '#666', marginTop: 4 },
  planSummaryPrice: { fontSize: 28, fontWeight: '900', color: PRIMARY, marginTop: 8 },
  paymentMethodTitle: { fontSize: 16, fontWeight: '700', color: '#1A1A2E', marginBottom: 12 },
  methodBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    gap: 12,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  methodBtnActive: { borderColor: PRIMARY, backgroundColor: '#FFF5F5' },
  methodBtnText: { flex: 1, fontSize: 14, color: '#666', fontWeight: '600' },
  radioOuter: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioActive: { borderColor: PRIMARY },
  radioInner: { width: 10, height: 10, borderRadius: 5, backgroundColor: PRIMARY },
  upiInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    marginTop: 4,
    marginBottom: 12,
  },
  orderSummary: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    gap: 8,
  },
  orderRow: { flexDirection: 'row', justifyContent: 'space-between' },
  orderLabel: { color: '#666', fontSize: 14 },
  orderValue: { color: '#333', fontSize: 14, fontWeight: '600' },
  orderTotal: { borderTopWidth: 1, borderTopColor: '#ddd', paddingTop: 8, marginTop: 4 },
  orderTotalLabel: { fontSize: 16, fontWeight: '800', color: '#1A1A2E' },
  orderTotalValue: { fontSize: 18, fontWeight: '900', color: PRIMARY },
  payBtnContainer: { padding: 16, borderTopWidth: 1, borderTopColor: '#eee' },
  payBtn: {
    backgroundColor: PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 14,
    gap: 8,
  },
  payBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
  payBtnNote: { textAlign: 'center', fontSize: 12, color: '#999', marginTop: 8 },
  successScreen: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 32 },
  successCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  successTitle: { fontSize: 26, fontWeight: '900', color: '#1A1A2E', textAlign: 'center' },
  successSubtitle: { fontSize: 16, color: '#27AE60', fontWeight: '700', marginTop: 8 },
  successTxId: { fontSize: 12, color: '#999', marginTop: 12 },
  successFeatures: { marginTop: 24, gap: 10, alignSelf: 'stretch' },
  successFeatureRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  successFeatureText: { fontSize: 14, color: '#333' },
  exploreBtn: {
    marginTop: 32,
    backgroundColor: PRIMARY,
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 24,
  },
  exploreBtnText: { color: '#fff', fontSize: 16, fontWeight: '800' },
});
