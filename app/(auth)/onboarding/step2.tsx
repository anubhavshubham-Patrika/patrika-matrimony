import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step2() {
  const router = useRouter();
  const [motherTongue, setMotherTongue] = useState('');
  
  const dispatch = (action: any) => console.log('Dispatch:', action);

  const options = [
    'Hindi (UP/UK)', 'Hindi (Delhi)', 'Hindi (Rajasthan)', 'Marwari/Rajasthani', 
    'Punjabi', 'Gujarati', 'Marathi', 'Tamil', 'Telugu', 'Kannada', 'Bengali', 'Other'
  ];

  const handleNext = () => {
    if (!motherTongue) return;
    dispatch({ type: 'UPDATE_ONBOARDING', payload: { motherTongue } });
    router.push('/(auth)/onboarding/step3');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(2/13)*100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step 2 of 13</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>What is your mother tongue?</Text>
        
        <View style={styles.list}>
          {options.map((opt) => (
            <TouchableOpacity 
              key={opt} 
              style={[styles.listItem, motherTongue === opt && styles.listItemSelected]}
              onPress={() => setMotherTongue(opt)}
            >
              <Text style={[styles.listText, motherTongue === opt && styles.listTextSelected]}>{opt}</Text>
              {motherTongue === opt && <Ionicons name="checkmark-circle" size={24} color="#C0392B" />}
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={[styles.nextBtn, !motherTongue && styles.nextBtnDisabled]} 
          onPress={handleNext}
          disabled={!motherTongue}
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
  list: { backgroundColor: '#FFF', borderRadius: 12, overflow: 'hidden', shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 5, elevation: 2 },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, borderBottomWidth: 1, borderColor: '#EEE' },
  listItemSelected: { backgroundColor: '#FFF0F0' },
  listText: { fontSize: 16, color: '#444' },
  listTextSelected: { color: '#C0392B', fontWeight: '600' },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  nextBtn: { backgroundColor: '#C0392B', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  nextBtnDisabled: { backgroundColor: '#E0A09A' },
  nextBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
