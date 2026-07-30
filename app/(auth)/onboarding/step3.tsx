import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step3() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    gender: '', dob: '', height: '', physicalStatus: 'Normal', maritalStatus: ''
  });
  
  const dispatch = (action: any) => console.log('Dispatch:', action);

  const handleNext = () => {
    dispatch({ type: 'UPDATE_ONBOARDING', payload: formData });
    router.push('/(auth)/onboarding/step4');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(3/13)*100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step 3 of 13</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Basic Details</Text>
        
        <View style={styles.field}>
          <Text style={styles.label}>Gender</Text>
          <View style={styles.row}>
            {['Male', 'Female'].map(g => (
              <TouchableOpacity key={g} style={[styles.toggleBtn, formData.gender === g && styles.toggleBtnSelected]}
                onPress={() => setFormData({...formData, gender: g})}>
                <Text style={[styles.toggleText, formData.gender === g && styles.toggleTextSelected]}>{g}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Date of Birth (DD/MM/YYYY)</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. 15/08/1995" 
            value={formData.dob} 
            onChangeText={(t) => setFormData({...formData, dob: t})} 
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Height</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. 5'8&quot;" 
            value={formData.height} 
            onChangeText={(t) => setFormData({...formData, height: t})} 
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Physical Status</Text>
          <View style={styles.row}>
            {['Normal', 'Differently Abled'].map(s => (
              <TouchableOpacity key={s} style={[styles.toggleBtn, formData.physicalStatus === s && styles.toggleBtnSelected]}
                onPress={() => setFormData({...formData, physicalStatus: s})}>
                <Text style={[styles.toggleText, formData.physicalStatus === s && styles.toggleTextSelected]}>{s}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Marital Status</Text>
          {['Never Married', 'Divorced', 'Widowed', 'Separated'].map(m => (
            <TouchableOpacity key={m} style={[styles.radioItem, formData.maritalStatus === m && styles.radioItemSelected]}
              onPress={() => setFormData({...formData, maritalStatus: m})}>
              <Text style={styles.radioText}>{m}</Text>
              {formData.maritalStatus === m && <Ionicons name="radio-button-on" size={24} color="#C0392B" />}
              {formData.maritalStatus !== m && <Ionicons name="radio-button-off" size={24} color="#CCC" />}
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
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  toggleBtn: { flex: 1, padding: 12, borderWidth: 1, borderColor: '#DDD', borderRadius: 8, alignItems: 'center', marginHorizontal: 4, backgroundColor: '#FFF' },
  toggleBtnSelected: { borderColor: '#C0392B', backgroundColor: '#FFF0F0' },
  toggleText: { fontSize: 14, color: '#666' },
  toggleTextSelected: { color: '#C0392B', fontWeight: 'bold' },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', padding: 14, borderRadius: 8, fontSize: 16 },
  radioItem: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8, marginBottom: 8 },
  radioItemSelected: { borderColor: '#C0392B' },
  radioText: { fontSize: 16, color: '#444' },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  nextBtn: { backgroundColor: '#C0392B', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
