import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { AppProvider } from '../src/context/AppContext';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider>
        <PaperProvider>
          <StatusBar style="light" />
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
