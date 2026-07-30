import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step6() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    education: '', field: '', employment: '', occupation: '', income: ''
  });
  
  const dispatch = (action: any) => console.log('Dispatch:', action);

  const handleNext = () => {
    dispatch({ type: 'UPDATE_ONBOARDING', payload: formData });
    router.push('/(auth)/onboarding/step7');
  };

  const educations = ['B.Tech/B.E.', 'MBBS', 'MBA/PGDM', 'B.Com', 'B.Sc', 'MA/MSc', 'PhD', '12th Pass', '10th Pass', 'Other'];
  const fields = ['Engineering/Tech', 'Medicine/Health', 'Management', 'Arts/Science', 'Law', 'Finance', 'Doctorate', 'Other'];
  const employments = ['Private', 'Govt/Public', 'Business/Self-employed', 'Defence', 'Civil Services', 'Not Working'];
  const incomes = ['Below 2L', '2-5L', '5-10L', '10-20L', '20-30L', '30-50L', '50L+'];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(6/13)*100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step 6 of 13</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Education & Profession</Text>
        
        <View style={styles.field}>
          <Text style={styles.label}>Highest Education</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
            {educations.map(e => (
              <TouchableOpacity key={e} style={[styles.chip, formData.education === e && styles.chipSelected]}
                onPress={() => setFormData({...formData, education: e})}>
                <Text style={[styles.chipText, formData.education === e && styles.chipTextSelected]}>{e}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Field of Study</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
            {fields.map(f => (
              <TouchableOpacity key={f} style={[styles.chip, formData.field === f && styles.chipSelected]}
                onPress={() => setFormData({...formData, field: f})}>
                <Text style={[styles.chipText, formData.field === f && styles.chipTextSelected]}>{f}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Employment Type</Text>
          <View style={styles.chipGrid}>
            {employments.map(e => (
              <TouchableOpacity key={e} style={[styles.chip, formData.employment === e && styles.chipSelected]}
                onPress={() => setFormData({...formData, employment: e})}>
                <Text style={[styles.chipText, formData.employment === e && styles.chipTextSelected]}>{e}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Occupation / Role</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Software Engineer, Doctor" 
            value={formData.occupation} 
            onChangeText={(t) => setFormData({...formData, occupation: t})} 
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Annual Income</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.hScroll}>
            {incomes.map(i => (
              <TouchableOpacity key={i} style={[styles.chip, formData.income === i && styles.chipSelected]}
                onPress={() => setFormData({...formData, income: i})}>
                <Text style={[styles.chipText, formData.income === i && styles.chipTextSelected]}>{i}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
  hScroll: { flexDirection: 'row', paddingBottom: 8 },
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 20, marginBottom: 8, marginRight: 8 },
  chipSelected: { borderColor: '#C0392B', backgroundColor: '#FFF0F0' },
  chipText: { color: '#666', fontSize: 14 },
  chipTextSelected: { color: '#C0392B', fontWeight: 'bold' },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', padding: 14, borderRadius: 8, fontSize: 16 },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  nextBtn: { backgroundColor: '#C0392B', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
