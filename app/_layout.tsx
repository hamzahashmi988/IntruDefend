import { Stack } from "expo-router";
import { StatusBar, View } from 'react-native';
import React from "react"

// Hide the header globally for all screens in this layout
export const options = {
  headerShown: false,
};

export default function RootLayout() {
  return <React.Fragment>
    <StatusBar barStyle={"dark-content"} />
    <Stack screenOptions={{ headerShown: false }} />
  </React.Fragment>;
}
