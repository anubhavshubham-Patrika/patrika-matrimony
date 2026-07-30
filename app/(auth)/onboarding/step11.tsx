import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Step11() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: '', email: '', password: '', confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  
  const dispatch = (action: any) => console.log('Dispatch:', action);

  const handleNext = () => {
    dispatch({ type: 'UPDATE_ONBOARDING', payload: formData });
    router.push('/(auth)/onboarding/step12');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(11/13)*100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step 11 of 13</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Account Setup</Text>
        
        <View style={styles.noticeBox}>
          <Ionicons name="checkmark-circle" size={20} color="#27AE60" />
          <Text style={styles.noticeText}>Mobile number OTP already verified</Text>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Your Full Name</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. Arjun Singh" 
            value={formData.fullName} 
            onChangeText={(t) => setFormData({...formData, fullName: t})} 
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Email Address</Text>
          <TextInput 
            style={styles.input} 
            placeholder="e.g. arjun@example.com" 
            keyboardType="email-address"
            autoCapitalize="none"
            value={formData.email} 
            onChangeText={(t) => setFormData({...formData, email: t})} 
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <TextInput 
              style={styles.passwordInput} 
              placeholder="Create a password" 
              secureTextEntry={!showPassword}
              value={formData.password} 
              onChangeText={(t) => setFormData({...formData, password: t})} 
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#666" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Confirm Password</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Re-enter your password" 
            secureTextEntry={!showPassword}
            value={formData.confirmPassword} 
            onChangeText={(t) => setFormData({...formData, confirmPassword: t})} 
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
  noticeBox: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#E8F8F5', padding: 12, borderRadius: 8, marginBottom: 24 },
  noticeText: { marginLeft: 8, color: '#27AE60', fontWeight: '500' },
  field: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: '600', color: '#444', marginBottom: 8 },
  input: { backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', padding: 14, borderRadius: 8, fontSize: 16 },
  passwordContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderRadius: 8 },
  passwordInput: { flex: 1, padding: 14, fontSize: 16 },
  eyeBtn: { padding: 14 },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  nextBtn: { backgroundColor: '#C0392B', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
