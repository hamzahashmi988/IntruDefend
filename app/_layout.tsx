import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import React from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";

// Hide the header globally for all screens in this layout
export const options = {
  headerShown: false,
};

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle={"dark-content"} />
        <Stack screenOptions={{ headerShown: false }} />
      </PersistGate>
    </Provider>
  );
}
