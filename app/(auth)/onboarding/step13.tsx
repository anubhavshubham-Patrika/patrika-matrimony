import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useApp } from '../../../src/context/AppContext';
import { Translations } from '../../../src/constants/translations';
import PatrikaRibbonLogo from '../../../src/components/PatrikaRibbonLogo';

export default function Step13() {
  const router = useRouter();
  const { state, dispatch } = useApp();
  const lang = state.language || 'en';
  const t = Translations[lang];

  const [ageMin, setAgeMin] = useState('21');
  const [ageMax, setAgeMax] = useState('32');
  const [maritalStatus, setMaritalStatus] = useState<string[]>(['Never Married']);
  const [motherTongue, setMotherTongue] = useState('Hindi');
  const [religion, setReligion] = useState('Hindu');
  const [caste, setCaste] = useState('Rajput');
  const [location, setLocation] = useState('Rajasthan');
  const [diet, setDiet] = useState('Vegetarian');
  const [horoscope, setHoroscope] = useState('Doesn\'t matter');

  const toggleMaritalStatus = (status: string) => {
    if (maritalStatus.includes(status)) {
      setMaritalStatus(maritalStatus.filter((s) => s !== status));
    } else {
      setMaritalStatus([...maritalStatus, status]);
    }
  };

  const handleNext = () => {
    dispatch({
      type: 'UPDATE_ONBOARDING',
      payload: {
        partnerPreferences: {
          ageMin: parseInt(ageMin) || 21,
          ageMax: parseInt(ageMax) || 32,
          maritalStatus,
          motherTongue,
          religion,
          caste,
          location,
          diet,
          horoscope,
        },
      } as any,
    });
    router.push('/(auth)/onboarding/welcome');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#111111" />
        </TouchableOpacity>
        <View style={styles.headerTitleRow}>
          <PatrikaRibbonLogo size={26} />
          <Text style={styles.headerBrand}>Patrika Matrimony</Text>
        </View>
        <Text style={styles.stepIndicator}>13/13</Text>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressTrack}>
        <View style={[styles.progressBar, { width: '100%' }]} />
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{t.step13Title}</Text>

        {/* Age Range */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.preferredAge}</Text>
          <View style={styles.row}>
            <TextInput
              style={[styles.input, styles.halfInput]}
              value={ageMin}
              onChangeText={setAgeMin}
              keyboardType="numeric"
              placeholder="Min"
              placeholderTextColor="#999999"
            />
            <Text style={styles.dash}>to</Text>
            <TextInput
              style={[styles.input, styles.halfInput]}
              value={ageMax}
              onChangeText={setAgeMax}
              keyboardType="numeric"
              placeholder="Max"
              placeholderTextColor="#999999"
            />
          </View>
        </View>

        {/* Marital Status */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>{t.maritalStatus}</Text>
          <View style={styles.chipGrid}>
            {['Never Married', 'Divorced', 'Widowed', 'Separated'].map((status) => {
              const isSel = maritalStatus.includes(status);
              return (
                <TouchableOpacity
                  key={status}
                  style={[styles.chip, isSel && styles.chipSelected]}
                  onPress={() => toggleMaritalStatus(status)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.chipText, isSel && styles.chipTextSelected]}>{status}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Community & Location Preferences */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Cultural Preferences</Text>
          <TextInput style={styles.input} placeholder="Mother Tongue (e.g. Hindi, Marwari)" value={motherTongue} onChangeText={setMotherTongue} placeholderTextColor="#999999" />
          <TextInput style={[styles.input, { marginTop: 10 }]} placeholder="Religion (e.g. Hindu)" value={religion} onChangeText={setReligion} placeholderTextColor="#999999" />
          <TextInput style={[styles.input, { marginTop: 10 }]} placeholder="Caste (e.g. Rajput, Agarwal)" value={caste} onChangeText={setCaste} placeholderTextColor="#999999" />
          <TextInput style={[styles.input, { marginTop: 10 }]} placeholder="Location (State/City)" value={location} onChangeText={setLocation} placeholderTextColor="#999999" />
          <TextInput style={[styles.input, { marginTop: 10 }]} placeholder="Diet Preference (e.g. Vegetarian)" value={diet} onChangeText={setDiet} placeholderTextColor="#999999" />
        </View>

        {/* Horoscope Required */}
        <View style={styles.fieldGroup}>
          <Text style={styles.fieldLabel}>Horoscope Required?</Text>
          <View style={styles.row}>
            {['Yes', 'No', 'Doesn\'t matter'].map((opt) => {
              const isSel = horoscope === opt;
              return (
                <TouchableOpacity
                  key={opt}
                  style={[styles.toggleBtn, isSel && styles.toggleBtnSelected]}
                  onPress={() => setHoroscope(opt)}
                  activeOpacity={0.8}
                >
                  <Text style={[styles.toggleText, isSel && styles.toggleTextSelected]}>{opt}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.nextBtn} onPress={handleNext} activeOpacity={0.88}>
          <Text style={styles.nextBtnText}>{t.saveAndContinue}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  backBtn: {
    padding: 4,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  headerBrand: {
    fontSize: 18,
    fontWeight: '800',
    color: '#E31837',
  },
  stepIndicator: {
    fontSize: 14,
    fontWeight: '700',
    color: '#666666',
  },
  progressTrack: {
    height: 4,
    backgroundColor: '#F2F2F7',
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#E31837',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 26,
    fontWeight: '800',
    color: '#111111',
    letterSpacing: -0.5,
    marginBottom: 24,
  },
  fieldGroup: {
    marginBottom: 22,
  },
  fieldLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111111',
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  halfInput: {
    flex: 1,
    textAlign: 'center',
  },
  dash: {
    fontSize: 15,
    color: '#666666',
  },
  input: {
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#111111',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  chipSelected: {
    backgroundColor: '#FFF5F6',
    borderColor: '#E31837',
  },
  chipText: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '500',
  },
  chipTextSelected: {
    color: '#E31837',
    fontWeight: '700',
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  toggleBtnSelected: {
    borderColor: '#E31837',
    backgroundColor: '#FFF5F6',
  },
  toggleText: {
    fontSize: 13,
    color: '#666666',
    fontWeight: '500',
  },
  toggleTextSelected: {
    color: '#E31837',
    fontWeight: '700',
  },
  footer: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderColor: '#F2F2F7',
  },
  nextBtn: {
    backgroundColor: '#E31837',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    shadowColor: '#E31837',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  nextBtnText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
