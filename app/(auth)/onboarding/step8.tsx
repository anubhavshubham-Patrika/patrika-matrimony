import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step8() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    hobbies: [] as string[], diet: '', smoking: '', drinking: ''
  });
  
  const dispatch = (action: any) => console.log('Dispatch:', action);

  const hobbiesList = ['Running', 'Reading', 'Music', 'Movies', 'Travel', 'Cooking', 'Photography', 'Cricket', 'Yoga', 'Dancing', 'Painting', 'Gaming'];

  const toggleHobby = (hobby: string) => {
    if (formData.hobbies.includes(hobby)) {
      setFormData({...formData, hobbies: formData.hobbies.filter(h => h !== hobby)});
    } else {
      setFormData({...formData, hobbies: [...formData.hobbies, hobby]});
    }
  };

  const handleNext = () => {
    dispatch({ type: 'UPDATE_ONBOARDING', payload: formData });
    router.push('/(auth)/onboarding/step9');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(8/13)*100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step 8 of 13</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Lifestyle</Text>
        
        <View style={styles.field}>
          <Text style={styles.label}>Hobbies & Interests</Text>
          <View style={styles.chipGrid}>
            {hobbiesList.map(h => {
              const isSelected = formData.hobbies.includes(h);
              return (
                <TouchableOpacity key={h} style={[styles.chip, isSelected && styles.chipSelected]}
                  onPress={() => toggleHobby(h)}>
                  <Text style={[styles.chipText, isSelected && styles.chipTextSelected]}>{h}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Diet</Text>
          <View style={styles.chipGrid}>
            {['Vegetarian', 'Non-Vegetarian', 'Eggetarian', 'Jain'].map(d => (
              <TouchableOpacity key={d} style={[styles.chip, formData.diet === d && styles.chipSelected]}
                onPress={() => setFormData({...formData, diet: d})}>
                <Text style={[styles.chipText, formData.diet === d && styles.chipTextSelected]}>{d}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Smoking</Text>
          <View style={styles.row}>
            {['No', 'Yes'].map(s => (
              <TouchableOpacity key={s} style={[styles.toggleBtn, formData.smoking === s && styles.toggleBtnSelected]}
                onPress={() => setFormData({...formData, smoking: s})}>
                <Text style={[styles.toggleText, formData.smoking === s && styles.toggleTextSelected]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Drinking</Text>
          <View style={styles.row}>
            {['No', 'Yes'].map(d => (
              <TouchableOpacity key={d} style={[styles.toggleBtn, formData.drinking === d && styles.toggleBtnSelected]}
                onPress={() => setFormData({...formData, drinking: d})}>
                <Text style={[styles.toggleText, formData.drinking === d && styles.toggleTextSelected]}>{d}</Text>
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
  chipGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: { paddingVertical: 10, paddingHorizontal: 16, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 20, marginBottom: 8, marginRight: 8 },
  chipSelected: { borderColor: '#C0392B', backgroundColor: '#FFF0F0' },
  chipText: { color: '#666', fontSize: 14 },
  chipTextSelected: { color: '#C0392B', fontWeight: 'bold' },
  row: { flexDirection: 'row', justifyContent: 'flex-start', gap: 12 },
  toggleBtn: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#DDD', borderRadius: 8, alignItems: 'center', backgroundColor: '#FFF', maxWidth: '48%' },
  toggleBtnSelected: { borderColor: '#C0392B', backgroundColor: '#FFF0F0' },
  toggleText: { fontSize: 16, color: '#666' },
  toggleTextSelected: { color: '#C0392B', fontWeight: 'bold' },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  nextBtn: { backgroundColor: '#C0392B', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
