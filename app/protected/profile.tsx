import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/store/slices/auth.slice";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Alert } from "react-native";

export default function Profile() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userData = useSelector((state: any) => state.auth.user_data);
    const defaultAvatar = "https://www.gravatar.com/avatar/default?d=mp";

    const handleLogout = async () => {
        try {
            await AsyncStorage.clear();
            dispatch(logout());
            Alert.alert("Success", "Logged out successfully", [
                { text: "OK", onPress: () => router.replace("/sign-in") },
            ]);
        } catch (error) {
            Alert.alert("Error", "Something went wrong while logging out");
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={{ uri: userData?.image_url || defaultAvatar }}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>{userData?.name}</Text>
                </View>

                <View style={styles.infoSection}>
                    <InfoItem icon="email-outline" label="Email" value={userData?.email} />
                    <InfoItem icon="phone-outline" label="Phone" value={userData?.phone_no} />
                    <InfoItem icon="phone-plus-outline" label="Alt. Phone" value={userData?.alternate_phone_no} />
                    <InfoItem icon="map-marker-outline" label="Address" value={userData?.address} />
                </View>

                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <MaterialCommunityIcons name="logout" size={24} color="#FF4444" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const InfoItem = ({ icon, label, value }: { icon: any, label: string, value?: string }) => (
    <View style={styles.infoItem}>
        <MaterialCommunityIcons
            name={icon as keyof typeof MaterialCommunityIcons.glyphMap}
            size={24}
            color="#007BFF"
        />
        <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>{label}</Text>
            <Text style={styles.infoValue}>{value || 'Not provided'}</Text>
        </View>
    </View>
);

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 15,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    infoSection: {
        backgroundColor: 'white',
        marginTop: 20,
        padding: 15,
    },
    infoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    infoContent: {
        marginLeft: 15,
        flex: 1,
    },
    infoLabel: {
        fontSize: 14,
        color: '#666',
    },
    infoValue: {
        fontSize: 16,
        color: '#333',
        marginTop: 2,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15,
        marginTop: 20,
        marginBottom: 30,
    },
    logoutText: {
        color: '#FF4444',
        fontSize: 16,
        fontWeight: '500',
        marginLeft: 8,
    },
}); 