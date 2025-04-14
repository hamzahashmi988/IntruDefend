import { Stack } from "expo-router";
import { useAuthGuard } from "@/components/AuthGuard";

export default function ProtectedLayout() {
  // This will automatically redirect to sign-in if not authenticated
  const isAuthenticated = useAuthGuard();

  if (!isAuthenticated) {
    return null;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
