import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors, Typography, Spacing, BorderRadius } from '../../src/constants/theme';
import PremiumCard from '../../src/components/ui/PremiumCard';
import PremiumButton from '../../src/components/ui/PremiumButton';
import { useApp } from '../../src/context/AppContext';

// Reusing same plan data for simplicity
const PLANS = {
  'gold': {
    id: 'gold', name: 'Gold', price: 1999, durationText: '₹1,999 / 3 months'
  },
  'platinum': {
    id: 'platinum', name: 'Platinum', price: 3999, durationText: '₹3,999 / 6 months'
  },
  'assisted': {
    id: 'assisted', name: 'Assisted', price: 9999, durationText: '₹9,999 / 1 year'
  }
};

export default function PaymentScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const planId = params.planId as string;
  const { dispatch } = useApp();
  
  const selectedPlan = PLANS[planId as keyof typeof PLANS] || PLANS['gold'];
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Card' | 'Netbanking'>('UPI');
  const [upiId, setUpiId] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      dispatch({ type: 'SET_PLAN', payload: selectedPlan.name as any });
      (router as any).push({ pathname: '/payment/success', params: { planName: selectedPlan.name } });
    }, 1500);
  };

  const gst = Math.round(selectedPlan.price * 0.18);
  const total = selectedPlan.price + gst;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Ionicons name="arrow-back" size={24} color={Colors.text} onPress={() => router.back()} />
        <Text style={styles.headerTitle}>Checkout</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <PremiumCard variant="glass" style={styles.planSummaryCard}>
          <Text style={styles.planName}>{selectedPlan.name} Plan</Text>
          <Text style={styles.planDuration}>{selectedPlan.durationText}</Text>
          <Text style={styles.planPrice}>₹{selectedPlan.price.toLocaleString()}</Text>
        </PremiumCard>

        <Text style={styles.sectionTitle}>Payment Method</Text>

        {(['UPI', 'Card', 'Netbanking'] as const).map((method) => (
          <PremiumCard
            key={method}
            variant={paymentMethod === method ? 'highlight' : 'outlined'}
            style={styles.methodCard}
          >
            <View style={styles.methodRow} onTouchEnd={() => setPaymentMethod(method)}>
              <MaterialCommunityIcons
                name={method === 'UPI' ? 'contactless-payment' : method === 'Card' ? 'credit-card' : 'bank'}
                size={24}
                color={paymentMethod === method ? Colors.primary : Colors.textMuted}
              />
              <Text style={[styles.methodText, paymentMethod === method && styles.methodTextActive]}>
                {method === 'UPI' ? 'UPI (GPay, PhonePe)' : method === 'Card' ? 'Credit / Debit Card' : 'Net Banking'}
              </Text>
              <Ionicons
                name={paymentMethod === method ? "radio-button-on" : "radio-button-off"}
                size={24}
                color={paymentMethod === method ? Colors.primary : Colors.textMuted}
              />
            </View>
            
            {paymentMethod === 'UPI' && method === 'UPI' && (
              <TextInput
                style={styles.upiInput}
                placeholder="Enter UPI ID (e.g. yourname@upi)"
                value={upiId}
                onChangeText={setUpiId}
                autoCapitalize="none"
                placeholderTextColor={Colors.textMuted}
              />
            )}
          </PremiumCard>
        ))}

        <Text style={[styles.sectionTitle, { marginTop: Spacing.md }]}>Order Summary</Text>
        <PremiumCard variant="default" style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Plan Amount</Text>
            <Text style={styles.summaryValue}>₹{selectedPlan.price.toLocaleString()}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>GST (18%)</Text>
            <Text style={styles.summaryValue}>₹{gst.toLocaleString()}</Text>
          </View>
          <View style={[styles.summaryRow, styles.summaryTotalRow]}>
            <Text style={styles.summaryTotalLabel}>Total Payable</Text>
            <Text style={styles.summaryTotalValue}>₹{total.toLocaleString()}</Text>
          </View>
        </PremiumCard>

        <View style={styles.secureIndicator}>
          <Ionicons name="lock-closed" size={16} color={Colors.success} />
          <Text style={styles.secureText}>256-bit SSL Secure Payment</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PremiumButton
          title={`Pay ₹${total.toLocaleString()}`}
          onPress={handlePay}
          variant="premium"
          loading={isProcessing}
          icon="lock-closed"
          iconPosition="left"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg, paddingVertical: Spacing.md,
    backgroundColor: Colors.surface,
  },
  headerTitle: { fontFamily: Typography.fontFamily.sansBold, fontSize: Typography.sizes.lg, color: Colors.text },
  content: { padding: Spacing.lg, paddingBottom: 100 },
  planSummaryCard: {
    marginBottom: Spacing.xl,
    alignItems: 'center',
    paddingVertical: Spacing.xl,
    borderTopWidth: 4,
    borderTopColor: Colors.gold,
  },
  planName: { fontFamily: Typography.fontFamily.serif, fontSize: Typography.sizes['2xl'], color: Colors.primaryDark },
  planDuration: { fontFamily: Typography.fontFamily.sans, fontSize: Typography.sizes.md, color: Colors.textSecondary, marginTop: Spacing.xs },
  planPrice: { fontFamily: Typography.fontFamily.sansBold, fontSize: Typography.sizes['3xl'], color: Colors.primary, marginTop: Spacing.sm },
  sectionTitle: { fontFamily: Typography.fontFamily.sansBold, fontSize: Typography.sizes.md, color: Colors.text, marginBottom: Spacing.md },
  methodCard: { marginBottom: Spacing.sm, padding: Spacing.md },
  methodRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  methodText: { flex: 1, fontFamily: Typography.fontFamily.sansMedium, fontSize: Typography.sizes.base, color: Colors.textSecondary },
  methodTextActive: { color: Colors.primaryDark, fontFamily: Typography.fontFamily.sansBold },
  upiInput: {
    marginTop: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: BorderRadius.sm,
    padding: Spacing.md,
    fontFamily: Typography.fontFamily.sans,
    color: Colors.text,
  },
  summaryCard: { padding: Spacing.lg },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing.sm },
  summaryLabel: { fontFamily: Typography.fontFamily.sans, fontSize: Typography.sizes.sm, color: Colors.textSecondary },
  summaryValue: { fontFamily: Typography.fontFamily.sansMedium, fontSize: Typography.sizes.sm, color: Colors.text },
  summaryTotalRow: { borderTopWidth: 1, borderTopColor: Colors.borderLight, paddingTop: Spacing.sm, marginTop: Spacing.xs, marginBottom: 0 },
  summaryTotalLabel: { fontFamily: Typography.fontFamily.sansBold, fontSize: Typography.sizes.base, color: Colors.text },
  summaryTotalValue: { fontFamily: Typography.fontFamily.sansBold, fontSize: Typography.sizes.lg, color: Colors.primary },
  secureIndicator: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.xs, marginTop: Spacing.xl },
  secureText: { fontFamily: Typography.fontFamily.sans, fontSize: Typography.sizes.sm, color: Colors.success },
  footer: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    backgroundColor: Colors.surface,
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.borderLight,
  }
});
