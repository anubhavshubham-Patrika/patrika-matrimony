import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step9() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    timeOfBirth: '', placeOfBirth: '', nakshatra: ''
  });
  
  const dispatch = (action: any) => console.log('Dispatch:', action);

  const handleNext = () => {
    dispatch({ type: 'UPDATE_ONBOARDING', payload: formData });
    router.push('/(auth)/onboarding/step10');
  };

  const handleSkip = () => {
    router.push('/(auth)/onboarding/step10');
  };

  const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Other'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(9/13)*100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step 9 of 13</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Horoscope Details (Optional)</Text>
        
        <View style={styles.field}>
          <Text style={styles.label}>Time of Birth (HH:MM)</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. 14:30" 
            value={formData.timeOfBirth} 
            onChangeText={(t) => setFormData({...formData, timeOfBirth: t})} 
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Place of Birth</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Jaipur" 
            value={formData.placeOfBirth} 
            onChangeText={(t) => setFormData({...formData, placeOfBirth: t})} 
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Star / Nakshatra</Text>
          <View style={styles.chipGrid}>
            {nakshatras.map(n => (
              <TouchableOpacity key={n} style={[styles.chip, formData.nakshatra === n && styles.chipSelected]}
                onPress={() => setFormData({...formData, nakshatra: n})}>
                <Text style={[styles.chipText, formData.nakshatra === n && styles.chipTextSelected]}>{n}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextBtnText}>Continue</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.skipBtn} onPress={handleSkip}>
          <Text style={styles.skipBtnText}>Skip for now</Text>
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
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', padding: 14, borderRadius: 8, fontSize: 16 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 20, marginBottom: 8, marginRight: 8 },
  chipSelected: { borderColor: '#C0392B', backgroundColor: '#FFF0F0' },
  chipText: { color: '#666', fontSize: 14 },
  chipTextSelected: { color: '#C0392B', fontWeight: 'bold' },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  nextBtn: { backgroundColor: '#C0392B', paddingVertical: 16, borderRadius: 8, alignItems: 'center', marginBottom: 12 },
  nextBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  skipBtn: { paddingVertical: 12, alignItems: 'center' },
  skipBtnText: { color: '#666', fontSize: 16, fontWeight: '500' }
});
