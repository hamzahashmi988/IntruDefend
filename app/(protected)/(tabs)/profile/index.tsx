import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';
import { clearAuthData } from '../../../../store/slices/auth.slice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

function Profile() {
    const dispatch = useDispatch();
    const user = useSelector((state: any) => state.auth.user);
    const defaultAvatar = "https://www.gravatar.com/avatar/default?d=mp";

    const handleLogout = async () => {
        await AsyncStorage.removeItem('access_token');
        dispatch(clearAuthData());
        router.replace('/(auth)/sign-in');
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* Profile Header */}
                <View style={styles.header}>
                    <Image
                        source={{ uri: user?.image_url || defaultAvatar }}
                        style={styles.avatar}
                    />
                    <Text style={styles.name}>{user?.name || 'User'}</Text>
                    <Text style={styles.email}>{user?.email}</Text>
                </View>

                {/* Profile Options */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Account Settings</Text>
                    
                    <TouchableOpacity style={styles.option}>
                        <MaterialIcons name="person" size={24} color="#007AFF" />
                        <Text style={styles.optionText}>Edit Profile</Text>
                        <MaterialIcons name="chevron-right" size={24} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}>
                        <MaterialIcons name="security" size={24} color="#007AFF" />
                        <Text style={styles.optionText}>Security</Text>
                        <MaterialIcons name="chevron-right" size={24} color="#999" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.option}>
                        <MaterialIcons name="notifications" size={24} color="#007AFF" />
                        <Text style={styles.optionText}>Notifications</Text>
                        <MaterialIcons name="chevron-right" size={24} color="#999" />
                    </TouchableOpacity>
                </View>

                {/* Logout Button */}
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <MaterialIcons name="logout" size={24} color="#FF3B30" />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    scrollContent: {
        flexGrow: 1,
    },
    header: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 10,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    email: {
        fontSize: 16,
        color: '#666',
        marginTop: 5,
    },
    section: {
        backgroundColor: 'white',
        marginTop: 20,
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
        marginLeft: 5,
    },
    option: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    optionText: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        marginLeft: 15,
    },
    logoutButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 20,
        padding: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    logoutText: {
        fontSize: 16,
        color: '#FF3B30',
        marginLeft: 15,
    },
});

export default Profile;
