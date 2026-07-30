import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function WelcomeScreen() {
  const router = useRouter();
  
  const dispatch = (action: any) => console.log('Dispatch:', action);

  const handleStart = () => {
    // Dispatch demo user login as requested
    dispatch({ 
      type: 'LOGIN', 
      payload: { 
        userId: 'U001', 
        name: 'Arjun Singh', 
        mobile: '+91-9876543210', 
        email: 'arjun@example.com', 
        profileId: 'P001' 
      } 
    });
    
    // Navigate to home tabs
    router.push('/(tabs)/home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        
        <View style={styles.iconContainer}>
          <Ionicons name="checkmark-circle" size={100} color="#27AE60" />
        </View>
        
        <Text style={styles.title}>Welcome to Patrika Matrimony!</Text>
        <Text style={styles.subtitle}>Your profile has been created successfully</Text>

        <View style={styles.tipsContainer}>
          <View style={styles.tipRow}>
            <Ionicons name="checkmark" size={24} color="#C0392B" style={styles.tipIcon} />
            <Text style={styles.tipText}>Complete verification to get 5x more matches</Text>
          </View>
          <View style={styles.tipRow}>
            <Ionicons name="checkmark" size={24} color="#C0392B" style={styles.tipIcon} />
            <Text style={styles.tipText}>Explore matches based on your preferences</Text>
          </View>
          <View style={styles.tipRow}>
            <Ionicons name="checkmark" size={24} color="#C0392B" style={styles.tipIcon} />
            <Text style={styles.tipText}>Link your Rajasthan Patrika newspaper ad</Text>
          </View>
        </View>

      </View>

      <View style={styles.footer}>
        <TouchableOpacity style={styles.btn} onPress={handleStart}>
          <Text style={styles.btnText}>Start Exploring Matches</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  iconContainer: { marginBottom: 24, backgroundColor: '#E8F8F5', borderRadius: 100, padding: 20 },
  title: { fontSize: 26, fontWeight: 'bold', color: '#333', textAlign: 'center', marginBottom: 12 },
  subtitle: { fontSize: 16, color: '#666', textAlign: 'center', marginBottom: 40 },
  tipsContainer: { width: '100%', backgroundColor: '#F9F9F9', padding: 20, borderRadius: 12, borderWidth: 1, borderColor: '#EEE' },
  tipRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  tipIcon: { marginRight: 12 },
  tipText: { fontSize: 15, color: '#444', flex: 1, lineHeight: 22 },
  footer: { padding: 24, paddingBottom: 40 },
  btn: { backgroundColor: '#C0392B', paddingVertical: 16, borderRadius: 8, alignItems: 'center', shadowColor: '#C0392B', shadowOpacity: 0.3, shadowRadius: 8, shadowOffset: {width: 0, height: 4}, elevation: 5 },
  btnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
