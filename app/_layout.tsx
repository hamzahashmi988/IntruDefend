import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";
import React, { useEffect } from "react";
import { Provider } from "react-redux";
import { persistor, store } from "@/store";
import { PersistGate } from "redux-persist/integration/react";
import { Slot, useSegments, useRouter } from "expo-router";
import { useSelector } from "react-redux";

// Hide the header globally for all screens in this layout
export const options = {
  headerShown: false,
};

function RootLayoutNav() {
  const segments = useSegments();
  const router = useRouter();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

  useEffect(() => {
    // Check if we're in auth routes (sign-in or register)
    const isAuthRoute = segments[0] === "sign-in" || segments[0] === "register";

    if (isAuthenticated && isAuthRoute) {
      // Redirect authenticated users away from auth routes
      router.replace("/protected/home");
    } else if (!isAuthenticated && segments[0] === "protected") {
      // Redirect unauthenticated users to sign-in
      router.replace("/sign-in");
    }
  }, [isAuthenticated, segments]);

  return <Slot />;
}

export default function RootLayout() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle={"light-content"} />
        <RootLayoutNav />
      </PersistGate>
    </Provider>
  );
}
