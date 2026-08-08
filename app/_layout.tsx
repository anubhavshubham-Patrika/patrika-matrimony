import { useEffect } from 'react';
import { Stack, SplashScreen } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AppProvider } from '../src/context/AppContext';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts, Inter_400Regular, Inter_500Medium, Inter_600SemiBold } from '@expo-google-fonts/inter';
import { PlayfairDisplay_400Regular, PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  '"shadow*" style props are deprecated. Use "boxShadow".',
  'props.pointerEvents is deprecated. Use style.pointerEvents',
  'Animated: `useNativeDriver` is not supported because the native animated module is missing.',
]);

if (typeof console !== 'undefined') {
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const warning = args[0];
    if (typeof warning === 'string' && (
      warning.includes('"shadow*" style props are deprecated') ||
      warning.includes('props.pointerEvents is deprecated') ||
      warning.includes('Animated: `useNativeDriver` is not supported')
    )) {
      return;
    }
    originalWarn(...args);
  };
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    PlayfairDisplay_400Regular,
    PlayfairDisplay_600SemiBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <PaperProvider>
          <StatusBar style="dark" />
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              name="profile/[id]"
              options={{
                headerShown: true,
                headerTitle: '',
                headerTransparent: true,
                headerTintColor: '#fff',
              }}
            />
            <Stack.Screen
              name="chat/[id]"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="subscription/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="verification/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="newspaper-ads/index"
              options={{ headerShown: false }}
            />
          </Stack>
        </PaperProvider>
      </AppProvider>
    </GestureHandlerRootView>
  );
}
