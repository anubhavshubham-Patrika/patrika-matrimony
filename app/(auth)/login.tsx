import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen() {
  const router = useRouter();
  const [tab, setTab] = useState<'mobile' | 'email'>('mobile');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isParent, setIsParent] = useState(false);

  const handleSubmit = () => {
    router.push({
      pathname: '/(auth)/otp',
      params: { contact: tab === 'mobile' ? mobile : email },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1A1A2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Patrika Matrimony</Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity style={[styles.tab, tab === 'mobile' && styles.activeTab]} onPress={() => setTab('mobile')}>
            <Text style={[styles.tabText, tab === 'mobile' && styles.activeTabText]}>Mobile OTP</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.tab, tab === 'email' && styles.activeTab]} onPress={() => setTab('email')}>
            <Text style={[styles.tabText, tab === 'email' && styles.activeTabText]}>Email & Password</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          {tab === 'mobile' ? (
            <View style={styles.mobileForm}>
              <View style={styles.inputGroup}>
                <View style={styles.countryCode}>
                  <Text style={styles.countryCodeText}>+91</Text>
                </View>
                <TextInput
                  style={styles.mobileInput}
                  placeholder="Enter 10-digit mobile number"
                  keyboardType="phone-pad"
                  maxLength={10}
                  value={mobile}
                  onChangeText={setMobile}
                  placeholderTextColor="#666666"
                />
              </View>

              <View style={styles.parentToggleContainer}>
                <Text style={styles.parentToggleText}>I am a Parent/Relative creating profile for family</Text>
                <Switch
                  value={isParent}
                  onValueChange={setIsParent}
                  trackColor={{ false: '#D3D3D3', true: '#E67E22' }}
                  thumbColor={isParent ? '#FFFFFF' : '#FFFFFF'}
                />
              </View>

              <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
                <Text style={styles.primaryButtonText}>Get OTP</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emailForm}>
              <TextInput
                style={styles.input}
                placeholder="Email Address"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                placeholderTextColor="#666666"
              />
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Password"
                  secureTextEntry={!showPassword}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#666666"
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
                  <Ionicons name={showPassword ? "eye-off-outline" : "eye-outline"} size={24} color="#666666" />
                </TouchableOpacity>
              </View>
              <TouchableOpacity style={styles.forgotPassword}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
                <Text style={styles.primaryButtonText}>Login</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#C0392B',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 4,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#C0392B',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  mobileForm: {},
  inputGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#F9F9F9',
  },
  countryCode: {
    paddingHorizontal: 16,
    borderRightWidth: 1,
    borderRightColor: '#E0E0E0',
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  mobileInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#1A1A2E',
  },
  parentToggleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  parentToggleText: {
    flex: 1,
    fontSize: 14,
    color: '#666666',
    marginRight: 12,
  },
  primaryButton: {
    backgroundColor: '#C0392B',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emailForm: {},
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: '#1A1A2E',
    backgroundColor: '#F9F9F9',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    backgroundColor: '#F9F9F9',
    marginBottom: 12,
  },
  passwordInput: {
    flex: 1,
    padding: 16,
    fontSize: 16,
    color: '#1A1A2E',
  },
  eyeIcon: {
    padding: 16,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#C0392B',
    fontSize: 14,
    fontWeight: '600',
  },
});
