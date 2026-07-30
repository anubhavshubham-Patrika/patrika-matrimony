import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step1() {
  const router = useRouter();
  const [profileFor, setProfileFor] = useState('');
  
  // Mock dispatch
  const dispatch = (action: any) => console.log('Dispatch:', action);

  const options = ['Self', 'Son', 'Daughter', 'Brother', 'Sister', 'Friend', 'Relative'];

  const handleNext = () => {
    if (!profileFor) return;
    dispatch({ type: 'UPDATE_ONBOARDING', payload: { profileFor } });
    router.push('/(auth)/onboarding/step2');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(1/13)*100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step 1 of 13</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Who are you creating this profile for?</Text>
        <View style={styles.grid}>
          {options.map((opt) => (
            <TouchableOpacity 
              key={opt} 
              style={[styles.card, profileFor === opt && styles.cardSelected]}
              onPress={() => setProfileFor(opt)}
            >
              <Ionicons 
                name={opt === 'Self' ? 'person' : opt === 'Friend' ? 'people' : 'home'} 
                size={32} 
                color={profileFor === opt ? '#C0392B' : '#666'} 
              />
              <Text style={[styles.cardLabel, profileFor === opt && styles.cardLabelSelected]}>{opt}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.nextBtn, !profileFor && styles.nextBtnDisabled]} 
          onPress={handleNext}
          disabled={!profileFor}
        >
          <Text style={styles.nextBtnText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16, backgroundColor: '#FFF', borderBottomWidth: 1, borderColor: '#EEE' },
  backBtn: { padding: 8, marginRight: 16 },
  progressWrapper: { flex: 1 },
  progressContainer: { height: 6, backgroundColor: '#EEE', borderRadius: 3, overflow: 'hidden', marginBottom: 4 },
  progressBar: { height: '100%', backgroundColor: '#C0392B' },
  progressText: { fontSize: 12, color: '#666', textAlign: 'right' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 24 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  card: { width: '48%', backgroundColor: '#FFF', padding: 20, borderRadius: 12, alignItems: 'center', marginBottom: 16, borderWidth: 2, borderColor: 'transparent', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  cardSelected: { borderColor: '#C0392B', backgroundColor: '#FFF0F0' },
  cardLabel: { marginTop: 12, fontSize: 16, color: '#444', fontWeight: '500' },
  cardLabelSelected: { color: '#C0392B' },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  nextBtn: { backgroundColor: '#C0392B', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  nextBtnDisabled: { backgroundColor: '#E0A09A' },
  nextBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
