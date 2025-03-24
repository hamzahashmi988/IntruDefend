import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import React from "react";

export default function Alerts() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Alerts</Text>
                {/* Placeholder cards */}
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Emergency Alert</Text>
                    <Text style={styles.cardText}>This is a sample emergency alert card</Text>
                </View>
                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Security Notice</Text>
                    <Text style={styles.cardText}>This is a sample security notice card</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f8f9fa',
    },
    container: {
        flex: 1,
        padding: 15,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        color: '#333',
    },
    cardText: {
        fontSize: 14,
        color: '#666',
    },
}); 