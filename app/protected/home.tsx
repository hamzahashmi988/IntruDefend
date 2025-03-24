import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/auth.slice";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProtectedHome() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userData = useSelector((state: any) => state.auth.user_data);

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            dispatch(logout());

            Alert.alert(
                "Success",
                "Logged out successfully",
                [
                    {
                        text: "OK",
                        onPress: () => router.replace("/sign-in")
                    }
                ]
            );
        } catch (error) {
            console.error("Error clearing storage:", error);
            Alert.alert(
                "Error",
                "Something went wrong while logging out"
            );
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcome}>Welcome, {userData?.name}!</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    welcome: {
        fontSize: 24,
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: "#ff4444",
        padding: 10,
        borderRadius: 5,
    },
    logoutText: {
        color: "white",
        fontSize: 16,
    },
}); 