import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface LanguageToggleProps {
  initialLanguage?: 'hi' | 'en';
  onLanguageChange?: (lang: 'hi' | 'en') => void;
}

export default function LanguageToggle({ initialLanguage = 'en', onLanguageChange }: LanguageToggleProps) {
  const [selectedLang, setSelectedLang] = useState<'hi' | 'en'>(initialLanguage);

  const handleSelect = (lang: 'hi' | 'en') => {
    setSelectedLang(lang);
    if (onLanguageChange) {
      onLanguageChange(lang);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.segment, selectedLang === 'hi' && styles.segmentActive]}
        onPress={() => handleSelect('hi')}
        activeOpacity={0.8}
      >
        <Text style={[styles.text, selectedLang === 'hi' && styles.textActive]}>हिंदी</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.segment, selectedLang === 'en' && styles.segmentActive]}
        onPress={() => handleSelect('en')}
        activeOpacity={0.8}
      >
        <Text style={[styles.text, selectedLang === 'en' && styles.textActive]}>English</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#EEEEEE',
    borderRadius: 24,
    padding: 3,
    alignItems: 'center',
  },
  segment: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  segmentActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 3,
    elevation: 2,
  },
  text: {
    fontSize: 13,
    fontWeight: '500',
    color: '#666666',
  },
  textActive: {
    fontWeight: '700',
    color: '#111111',
  },
});
