import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step5() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    country: 'India', state: '', city: ''
  });
  
  const dispatch = (action: any) => console.log('Dispatch:', action);

  const rajasthanCities = ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Ajmer', 'Bikaner', 'Sikar', 'Bharatpur'];

  const handleNext = () => {
    dispatch({ type: 'UPDATE_ONBOARDING', payload: formData });
    router.push('/(auth)/onboarding/step6');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(5/13)*100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step 5 of 13</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Location</Text>
        
        <View style={styles.field}>
          <Text style={styles.label}>Country</Text>
          <View style={styles.chipGrid}>
            {['India', 'USA', 'UK', 'Canada', 'UAE', 'Australia', 'Other'].map(c => (
              <TouchableOpacity key={c} style={[styles.chip, formData.country === c && styles.chipSelected]}
                onPress={() => setFormData({...formData, country: c})}>
                <Text style={[styles.chipText, formData.country === c && styles.chipTextSelected]}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Resident State</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Rajasthan" 
            value={formData.state} 
            onChangeText={(t) => setFormData({...formData, state: t})} 
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Resident City</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Jaipur" 
            value={formData.city} 
            onChangeText={(t) => setFormData({...formData, city: t})} 
          />
          
          <Text style={styles.subLabel}>Popular in Rajasthan:</Text>
          <View style={styles.chipGrid}>
            {rajasthanCities.map(c => (
              <TouchableOpacity key={c} style={styles.smallChip} onPress={() => setFormData({...formData, city: c})}>
                <Text style={styles.smallChipText}>{c}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
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
  field: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#444', marginBottom: 8 },
  subLabel: { fontSize: 14, color: '#888', marginTop: 12, marginBottom: 8 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 20, marginBottom: 8, marginRight: 8 },
  chipSelected: { borderColor: '#C0392B', backgroundColor: '#FFF0F0' },
  chipText: { color: '#666', fontSize: 14 },
  chipTextSelected: { color: '#C0392B', fontWeight: 'bold' },
  smallChip: { paddingVertical: 6, paddingHorizontal: 12, backgroundColor: '#EFEFEF', borderRadius: 16, marginBottom: 8, marginRight: 8 },
  smallChipText: { color: '#555', fontSize: 13 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', padding: 14, borderRadius: 8, fontSize: 16 },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  nextBtn: { backgroundColor: '#C0392B', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
