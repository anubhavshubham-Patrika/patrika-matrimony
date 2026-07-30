import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step10() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    college: '', company: '', role: ''
  });
  
  const dispatch = (action: any) => console.log('Dispatch:', action);

  const handleNext = () => {
    dispatch({ type: 'UPDATE_ONBOARDING', payload: formData });
    router.push('/(auth)/onboarding/step11');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(10/13)*100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step 10 of 13</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Education & Work Details</Text>
        
        <View style={styles.field}>
          <Text style={styles.label}>College / University Name</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. IIT Delhi" 
            value={formData.college} 
            onChangeText={(t) => setFormData({...formData, college: t})} 
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Organization / Company Name</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Google, Infosys" 
            value={formData.company} 
            onChangeText={(t) => setFormData({...formData, company: t})} 
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Current Role / Title</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Senior Software Engineer" 
            value={formData.role} 
            onChangeText={(t) => setFormData({...formData, role: t})} 
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
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', padding: 14, borderRadius: 8, fontSize: 16 },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  nextBtn: { backgroundColor: '#C0392B', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
