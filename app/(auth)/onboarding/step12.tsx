import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
// import * as ImagePicker from 'expo-image-picker';

export default function Step12() {
  const router = useRouter();
  const dispatch = (action: any) => console.log('Dispatch:', action);

  const handleNext = () => {
    dispatch({ type: 'UPDATE_ONBOARDING', payload: { photosAdded: true } });
    router.push('/(auth)/onboarding/step13');
  };

  const pickImage = async () => {
    // In a real app:
    // let result = await ImagePicker.launchImageLibraryAsync({
    //   mediaTypes: ImagePicker.MediaTypeOptions.Images,
    //   allowsEditing: true,
    //   aspect: [1, 1],
    //   quality: 1,
    // });
    alert('Image picker would open here!');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.progressWrapper}>
          <View style={styles.progressContainer}>
            <View style={[styles.progressBar, { width: `${(12/13)*100}%` }]} />
          </View>
          <Text style={styles.progressText}>Step 12 of 13</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Add your photos</Text>
        <Text style={styles.subtitle}>Profiles with photos get 8x more responses</Text>
        
        <View style={styles.mainPhotoContainer}>
          <TouchableOpacity style={styles.mainPhotoPlaceholder} onPress={pickImage}>
            <Ionicons name="camera" size={48} color="#CCC" />
            <Text style={styles.addPhotoText}>Add Profile Photo</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.galleryContainer}>
          {[1, 2, 3].map((item) => (
            <TouchableOpacity key={item} style={styles.smallPhotoPlaceholder} onPress={pickImage}>
              <Ionicons name="add" size={32} color="#CCC" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.selfieBtn} onPress={() => alert('Camera would open here!')}>
          <Ionicons name="camera-outline" size={24} color="#C0392B" />
          <Text style={styles.selfieBtnText}>Capture Selfie for Verification</Text>
        </TouchableOpacity>

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
  title: { fontSize: 24, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#27AE60', marginBottom: 24, fontWeight: '500' },
  mainPhotoContainer: { alignItems: 'center', marginBottom: 24 },
  mainPhotoPlaceholder: { width: 160, height: 160, borderRadius: 80, backgroundColor: '#FFF', borderWidth: 2, borderColor: '#DDD', borderStyle: 'dashed', justifyContent: 'center', alignItems: 'center' },
  addPhotoText: { color: '#888', marginTop: 8, fontSize: 14 },
  galleryContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  smallPhotoPlaceholder: { width: '30%', aspectRatio: 1, backgroundColor: '#FFF', borderWidth: 1, borderColor: '#DDD', borderStyle: 'dashed', borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  selfieBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFF0F0', padding: 16, borderRadius: 8, borderWidth: 1, borderColor: '#C0392B' },
  selfieBtnText: { color: '#C0392B', fontSize: 16, fontWeight: '600', marginLeft: 8 },
  footer: { padding: 20, backgroundColor: '#FFF', borderTopWidth: 1, borderColor: '#EEE' },
  nextBtn: { backgroundColor: '#C0392B', paddingVertical: 16, borderRadius: 8, alignItems: 'center' },
  nextBtnText: { color: '#FFF', fontSize: 18, fontWeight: 'bold' }
});
