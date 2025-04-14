import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { LoadingOverlay } from "@/components/LoadingOverlay";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle="light-content" />
        <Stack screenOptions={{ headerShown: false }} />
        <LoadingOverlay />
      </PersistGate>
    </Provider>
  );
}
