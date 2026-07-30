import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
      <Stack.Screen name="splash" />
      <Stack.Screen name="login" />
      <Stack.Screen name="otp" />
      <Stack.Screen name="onboarding/step1" />
      <Stack.Screen name="onboarding/step2" />
      <Stack.Screen name="onboarding/step3" />
      <Stack.Screen name="onboarding/step4" />
      <Stack.Screen name="onboarding/step5" />
      <Stack.Screen name="onboarding/step6" />
      <Stack.Screen name="onboarding/step7" />
      <Stack.Screen name="onboarding/step8" />
      <Stack.Screen name="onboarding/step9" />
      <Stack.Screen name="onboarding/step10" />
      <Stack.Screen name="onboarding/step11" />
      <Stack.Screen name="onboarding/step12" />
      <Stack.Screen name="onboarding/step13" />
      <Stack.Screen name="onboarding/welcome" />
    </Stack>
  );
}
