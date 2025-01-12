import { Stack } from "expo-router";

// Hide the header globally for all screens in this layout
export const options = {
  headerShown: false,
};

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
