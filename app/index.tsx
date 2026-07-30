import { Redirect } from 'expo-router';
import { useApp } from '../src/context/AppContext';

export default function Index() {
  const { state } = useApp();
  if (state.isLoggedIn) {
    return <Redirect href="/(tabs)/home" />;
  }
  return <Redirect href="/(auth)/splash" />;
}
