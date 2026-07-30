import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView,
  StatusBar, Alert, Modal, Image
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import { useApp } from '../../src/context/AppContext';

const PRIMARY = '#C0392B';
const SUCCESS = '#27AE60';

interface VerificationItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  iconColor: string;
  verified: boolean;
  actionLabel: string;
  note: string;
}

export default function VerificationScreen() {
  const router = useRouter();
  const { state } = useApp();
  const [verifiedItems, setVerifiedItems] = useState<Record<string, boolean>>({
    mobile: true,
    selfie: false,
    govtId: false,
    education: false,
    income: false,
    location: false,
    social: false,
  });
  const [selectedBadge, setSelectedBadge] = useState<VerificationItem | null>(null);
  const [loading, setLoading] = useState<string | null>(null);

  const verificationItems: VerificationItem[] = [
    {
      id: 'mobile',
      title: 'Mobile Verified',
      description: 'Your mobile number has been verified via OTP.',
      icon: 'cellphone-check',
      iconColor: SUCCESS,
      verified: true,
      actionLabel: 'Verified',
      note: 'Verified via OTP during registration.',
    },
    {
      id: 'selfie',
      title: 'Selfie Verification',
      description: 'Verify your identity by taking a live selfie.',
      icon: 'face-recognition',
      iconColor: '#3498DB',
      verified: verifiedItems.selfie,
      actionLabel: 'Verify via Selfie',
      note: 'Our AI matches your selfie with your profile photo.',
    },
    {
      id: 'govtId',
      title: 'Govt ID Verified',
      description: 'Upload Aadhaar / PAN Card / Passport for identity verification.',
      icon: 'card-account-details',
      iconColor: '#9B59B6',
      verified: verifiedItems.govtId,
      actionLabel: 'Upload ID',
      note: 'Verified by our team within 1-2 working days.',
    },
    {
      id: 'education',
      title: 'Education Verified',
      description: 'Upload your degree or marksheet to verify your education.',
      icon: 'school',
      iconColor: '#E67E22',
      verified: verifiedItems.education,
      actionLabel: 'Upload Certificate',
      note: 'Verified by our team. Adds Education Verified badge.',
    },
    {
      id: 'income',
      title: 'Income Verified',
      description: 'Upload salary slip or ITR to verify your income range.',
      icon: 'currency-inr',
      iconColor: '#27AE60',
      verified: verifiedItems.income,
      actionLabel: 'Upload Proof',
      note: 'Your exact income is never shown — only verified range.',
    },
    {
      id: 'location',
      title: 'Location Verified',
      description: 'Enable location access to verify your city/country.',
      icon: 'map-marker-check',
      iconColor: '#E74C3C',
      verified: verifiedItems.location,
      actionLabel: 'Verify Location',
      note: 'Especially useful for NRI profiles.',
    },
    {
      id: 'social',
      title: 'Social Profile Linked',
      description: 'Link your LinkedIn or Facebook to verify your identity.',
      icon: 'linkedin',
      iconColor: '#0077B5',
      verified: verifiedItems.social,
      actionLabel: 'Link Profile',
      note: 'Shows "Social Verified" badge on your profile.',
    },
  ];

  const handleVerify = (item: VerificationItem) => {
    if (item.verified) {
      setSelectedBadge(item);
      return;
    }
    setLoading(item.id);
    setTimeout(() => {
      setVerifiedItems((prev) => ({ ...prev, [item.id]: true }));
      setLoading(null);
      Alert.alert('✅ Verified!', `${item.title} completed successfully.`);
    }, 2000);
  };

  const verifiedCount = Object.values(verifiedItems).filter(Boolean).length;
  const totalCount = verificationItems.length;
  const completionPct = Math.round((verifiedCount / totalCount) * 100);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={PRIMARY} />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Trust & Verification</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Trust score card */}
        <View style={styles.trustCard}>
          <View style={styles.trustScoreRow}>
            <View>
              <Text style={styles.trustTitle}>Trust Score</Text>
              <Text style={styles.trustSubtitle}>Verified profiles get 5× more responses</Text>
            </View>
            <View style={styles.trustScoreCircle}>
              <Text style={styles.trustScoreNumber}>{completionPct}%</Text>
            </View>
          </View>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${completionPct}%` }]} />
          </View>
          <Text style={styles.progressLabel}>{verifiedCount} of {totalCount} verifications complete</Text>
        </View>

        {/* Verification items */}
        <View style={styles.itemsContainer}>
          {verificationItems.map((item) => {
            const isVerified = item.id === 'mobile' ? true : verifiedItems[item.id];
            const isLoading = loading === item.id;
            return (
              <View key={item.id} style={[styles.verifyCard, isVerified && styles.verifyCardDone]}>
                <View style={[styles.verifyIcon, { backgroundColor: isVerified ? '#E8F5E9' : '#F5F5F5' }]}>
                  <MaterialCommunityIcons
                    name={item.icon as any}
                    size={28}
                    color={isVerified ? SUCCESS : item.iconColor}
                  />
                </View>
                <View style={styles.verifyInfo}>
                  <View style={styles.verifyTitleRow}>
                    <Text style={styles.verifyTitle}>{item.title}</Text>
                    {isVerified && (
                      <View style={styles.verifiedBadge}>
                        <MaterialCommunityIcons name="check-circle" size={14} color={SUCCESS} />
                        <Text style={styles.verifiedBadgeText}>Verified</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.verifyDesc}>{item.description}</Text>
                  <TouchableOpacity
                    style={[styles.verifyBtn, isVerified && styles.verifyBtnDone]}
                    onPress={() => handleVerify(item)}
                    disabled={isLoading}
                  >
                    <Text style={[styles.verifyBtnText, isVerified && styles.verifyBtnTextDone]}>
                      {isLoading ? 'Verifying...' : isVerified ? '✓ ' + item.actionLabel : item.actionLabel}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>

        {/* Safety tips */}
        <View style={styles.safetyCard}>
          <MaterialCommunityIcons name="shield-check" size={24} color={PRIMARY} />
          <View style={{ flex: 1 }}>
            <Text style={styles.safetyTitle}>Safety Tips</Text>
            {[
              'Never share OTP, password or banking details.',
              'Meet in public places for the first time.',
              'Report suspicious or fake profiles immediately.',
              'Verify the person before sharing personal info.',
            ].map((tip) => (
              <Text key={tip} style={styles.safetyTip}>• {tip}</Text>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Badge info modal */}
      <Modal
        visible={!!selectedBadge}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedBadge(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.badgeSheet}>
            <View style={styles.sheetHandle} />
            {selectedBadge && (
              <>
                <View style={[styles.sheetIcon, { backgroundColor: '#E8F5E9' }]}>
                  <MaterialCommunityIcons name={selectedBadge.icon as any} size={40} color={SUCCESS} />
                </View>
                <Text style={styles.sheetTitle}>{selectedBadge.title}</Text>
                <Text style={styles.sheetNote}>{selectedBadge.note}</Text>
                <TouchableOpacity style={styles.sheetCloseBtn} onPress={() => setSelectedBadge(null)}>
                  <Text style={styles.sheetCloseBtnText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
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
  trustCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  trustScoreRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  trustTitle: { fontSize: 20, fontWeight: '900', color: '#1A1A2E' },
  trustSubtitle: { fontSize: 13, color: '#666', marginTop: 4 },
  trustScoreCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: PRIMARY,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trustScoreNumber: { color: '#fff', fontSize: 18, fontWeight: '900' },
  progressBar: {
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: SUCCESS,
    borderRadius: 4,
  },
  progressLabel: { fontSize: 12, color: '#999', marginTop: 8 },
  itemsContainer: { paddingHorizontal: 16, gap: 10 },
  verifyCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    gap: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  verifyCardDone: { borderColor: '#C8E6C9' },
  verifyIcon: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyInfo: { flex: 1 },
  verifyTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  verifyTitle: { fontSize: 15, fontWeight: '700', color: '#1A1A2E' },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderRadius: 10,
  },
  verifiedBadgeText: { fontSize: 10, color: SUCCESS, fontWeight: '700' },
  verifyDesc: { fontSize: 12, color: '#666', lineHeight: 16 },
  verifyBtn: {
    marginTop: 10,
    backgroundColor: PRIMARY,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  verifyBtnDone: { backgroundColor: '#E8F5E9' },
  verifyBtnText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  verifyBtnTextDone: { color: SUCCESS },
  safetyCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF5F5',
    margin: 16,
    borderRadius: 14,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#FFD9D9',
  },
  safetyTitle: { fontSize: 14, fontWeight: '700', color: PRIMARY, marginBottom: 8 },
  safetyTip: { fontSize: 12, color: '#666', marginTop: 4, lineHeight: 18 },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  badgeSheet: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    alignItems: 'center',
  },
  sheetHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ddd',
    borderRadius: 2,
    marginBottom: 24,
  },
  sheetIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  sheetTitle: { fontSize: 20, fontWeight: '800', color: '#1A1A2E', marginBottom: 10 },
  sheetNote: { fontSize: 14, color: '#666', textAlign: 'center', lineHeight: 20 },
  sheetCloseBtn: {
    marginTop: 20,
    backgroundColor: PRIMARY,
    paddingHorizontal: 32,
    paddingVertical: 12,
    borderRadius: 24,
  },
  sheetCloseBtnText: { color: '#fff', fontWeight: '700', fontSize: 15 },
});
