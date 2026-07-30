import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step4() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    religion: '', caste: '', subCaste: '', gotra: '', manglik: ''
  });
  
  const dispatch = (action: any) => console.log('Dispatch:', action);

  const handleNext = () => {
    dispatch({ type: 'UPDATE_ONBOARDING', payload: formData });
    router.push('/(auth)/onboarding/step5');
  };

  const isHinduJain = ['Hindu', 'Jain'].includes(formData.religion);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(4/13)*100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step 4 of 13</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Religion & Community</Text>
        
        <View style={styles.field}>
          <Text style={styles.label}>Religion</Text>
          <View style={styles.chipGrid}>
            {['Hindu', 'Muslim', 'Sikh', 'Jain', 'Christian', 'Other'].map(r => (
              <TouchableOpacity key={r} style={[styles.chip, formData.religion === r && styles.chipSelected]}
                onPress={() => setFormData({...formData, religion: r})}>
                <Text style={[styles.chipText, formData.religion === r && styles.chipTextSelected]}>{r}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Caste</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your caste" 
            value={formData.caste} 
            onChangeText={(t) => setFormData({...formData, caste: t})} 
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Sub-caste (Optional)</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your sub-caste" 
            value={formData.subCaste} 
            onChangeText={(t) => setFormData({...formData, subCaste: t})} 
          />
        </View>

        {isHinduJain && (
          <View style={styles.field}>
            <Text style={styles.label}>Gotra (Optional)</Text>
            <TextInput 
              style={styles.input} 
              placeholder="Enter your gotra" 
              value={formData.gotra} 
              onChangeText={(t) => setFormData({...formData, gotra: t})} 
            />
          </View>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>Manglik Status</Text>
          {['Non-Manglik', 'Manglik', 'Partial Manglik', 'Don\'t Know'].map(m => (
            <TouchableOpacity key={m} style={[styles.radioItem, formData.manglik === m && styles.radioItemSelected]}
              onPress={() => setFormData({...formData, manglik: m})}>
              <Text style={styles.radioText}>{m}</Text>
              {formData.manglik === m ? 
                <Ionicons name="radio-button-on" size={24} color="#C0392B" /> : 
                <Ionicons name="radio-button-off" size={24} color="#CCC" />}
            </TouchableOpacity>
          ))}
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
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 20, marginBottom: 8, marginRight: 8 },
  chipSelected: { borderColor: '#C0392B', backgroundColor: '#FFF0F0' },
  chipText: { color: '#666', fontSize: 14 },
  chipTextSelected: { color: '#C0392B', fontWeight: 'bold' },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', padding: 14, borderRadius: 8, fontSize: 16 },
  radioItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, marginBottom: 8 },
  radioItemSelected: { borderColor: '#C0392B' },
  radioText: { fontSize: 16, color: '#444' },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  nextBtn: { backgroundColor: '#C0392B', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
