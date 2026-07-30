import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step7() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    familyStatus: '', ancestralOrigin: '', aboutMe: '', aboutFamily: ''
  });
  
  const dispatch = (action: any) => console.log('Dispatch:', action);

  const handleNext = () => {
    dispatch({ type: 'UPDATE_ONBOARDING', payload: formData });
    router.push('/(auth)/onboarding/step8');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(7/13)*100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step 7 of 13</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Family Background</Text>
        
        <View style={styles.field}>
          <Text style={styles.label}>Family Status</Text>
          <View style={styles.chipGrid}>
            {['Middle Class', 'Upper Middle Class', 'Rich/Affluent'].map(status => (
              <TouchableOpacity key={status} style={[styles.chip, formData.familyStatus === status && styles.chipSelected]}
                onPress={() => setFormData({...formData, familyStatus: status})}>
                <Text style={[styles.chipText, formData.familyStatus === status && styles.chipTextSelected]}>{status}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Ancestral Origin</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Sikar, Rajasthan" 
            value={formData.ancestralOrigin} 
            onChangeText={(t) => setFormData({...formData, ancestralOrigin: t})} 
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>About Me (Max 150 chars)</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Write something about your personality, interests, etc." 
            multiline
            numberOfLines={4}
            maxLength={150}
            value={formData.aboutMe} 
            onChangeText={(t) => setFormData({...formData, aboutMe: t})} 
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>About Family (Optional)</Text>
          <TextInput 
            style={[styles.input, styles.textArea]} 
            placeholder="Describe your family background, values, etc." 
            multiline
            numberOfLines={4}
            value={formData.aboutFamily} 
            onChangeText={(t) => setFormData({...formData, aboutFamily: t})} 
          />
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
  textArea: { height: 100, textAlignVertical: 'top' },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  nextBtn: { backgroundColor: '#C0392B', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
