import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step13() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    ageMin: '21', ageMax: '30', maritalStatus: [] as string[],
    motherTongue: '', religion: '', caste: '', location: '', diet: '',
    smoking: 'Doesn\'t matter', drinking: 'Doesn\'t matter', horoscope: 'Doesn\'t matter'
  });
  
  const dispatch = (action: any) => console.log('Dispatch:', action);

  const toggleMaritalStatus = (status: string) => {
    if (formData.maritalStatus.includes(status)) {
      setFormData({...formData, maritalStatus: formData.maritalStatus.filter(s => s !== status)});
    } else {
      setFormData({...formData, maritalStatus: [...formData.maritalStatus, status]});
    }
  };

  const handleNext = () => {
    dispatch({ type: 'UPDATE_ONBOARDING', payload: formData });
    router.push('/(auth)/onboarding/welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(13/13)*100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step 13 of 13</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Who are you looking for?</Text>
        
        <View style={styles.field}>
          <Text style={styles.label}>Age Range (21-50)</Text>
          <View style={styles.row}>
            <TextInput style={[styles.input, styles.halfInput]} value={formData.ageMin} onChangeText={t => setFormData({...formData, ageMin: t})} keyboardType="numeric" placeholder="Min" />
            <Text style={styles.dash}>to</Text>
            <TextInput style={[styles.input, styles.halfInput]} value={formData.ageMax} onChangeText={t => setFormData({...formData, ageMax: t})} keyboardType="numeric" placeholder="Max" />
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Marital Status</Text>
          <View style={styles.chipGrid}>
            {['Never Married', 'Divorced', 'Widowed', 'Separated'].map(status => {
              const isSelected = formData.maritalStatus.includes(status);
              return (
                <TouchableOpacity key={status} style={[styles.chip, isSelected && styles.chipSelected]}
                  onPress={() => toggleMaritalStatus(status)}>
                  <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>{status}</Text>
                </TouchableOpacity>
              )
            })}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Preferences</Text>
          <TextInput style={styles.input} placeholder="Mother Tongue" value={formData.motherTongue} onChangeText={t => setFormData({...formData, motherTongue: t})} />
          <TextInput style={[styles.input, {marginTop: 10}]} placeholder="Religion" value={formData.religion} onChangeText={t => setFormData({...formData, religion: t})} />
          <TextInput style={[styles.input, {marginTop: 10}]} placeholder="Caste (Optional)" value={formData.caste} onChangeText={t => setFormData({...formData, caste: t})} />
          <TextInput style={[styles.input, {marginTop: 10}]} placeholder="Location (City/State)" value={formData.location} onChangeText={t => setFormData({...formData, location: t})} />
          <TextInput style={[styles.input, {marginTop: 10}]} placeholder="Diet Preference" value={formData.diet} onChangeText={t => setFormData({...formData, diet: t})} />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Horoscope Required?</Text>
          <View style={styles.row}>
            {['Yes', 'No', 'Doesn\'t matter'].map(opt => (
              <TouchableOpacity key={opt} style={[styles.toggleBtn, formData.horoscope === opt && styles.toggleBtnSelected]}
                onPress={() => setFormData({...formData, horoscope: opt})}>
                <Text style={[styles.toggleText, formData.horoscope === opt && styles.toggleTextSelected]}>{opt}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextBtnText}>Save Preferences</Text>
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
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 8 },
  halfInput: { flex: 1, textAlign: 'center' },
  dash: { fontSize: 16, color: '#888', marginHorizontal: 8 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', padding: 14, borderRadius: 8, fontSize: 16 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 20, marginBottom: 8, marginRight: 8 },
  chipSelected: { borderColor: '#C0392B', backgroundColor: '#FFF0F0' },
  chipText: { color: '#666', fontSize: 14 },
  chipTextSelected: { color: '#C0392B', fontWeight: 'bold' },
  toggleBtn: { flex: 1, padding: 10, borderWidth: 1, borderColor: '#DDD', borderRadius: 8, alignItems: 'center', backgroundColor: '#FFF' },
  toggleBtnSelected: { borderColor: '#C0392B', backgroundColor: '#FFF0F0' },
  toggleText: { fontSize: 13, color: '#666' },
  toggleTextSelected: { color: '#C0392B', fontWeight: 'bold' },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  nextBtn: { backgroundColor: '#C0392B', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
