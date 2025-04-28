import { View, Text, StyleSheet, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from "react";
import { Alert } from "../../../../services/types/domain.types";
import { AlertService } from "../../../../services/api/alert.service";

function Alerts() {
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [refreshing, setRefreshing] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchAlerts = async () => {
        try {
            const alertService = AlertService.getInstance();
            const response = await alertService.getAlertHistory();
            if (response.status === 'success') {
                const alertsArray = Object.values(response.data.alerts);
                setAlerts(alertsArray);
            }
        } catch (error) {
            console.error('Error fetching alerts:', error);
        } finally {
            setLoading(false);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchAlerts();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchAlerts();
    }, []);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView 
                style={styles.container}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            >
                <Text style={styles.header}>Alerts</Text>
                
                {loading ? (
                    <View style={styles.centerContent}>
                        <Text>Loading alerts...</Text>
                    </View>
                ) : alerts.length === 0 ? (
                    <View style={styles.centerContent}>
                        <MaterialIcons name="notifications-none" size={48} color="#999" />
                        <Text style={styles.emptyText}>No alerts to display</Text>
                    </View>
                ) : alerts.map((alert, index) => (
                    <View key={index} style={styles.card}>
                        <Text style={styles.cardTitle}>{alert.title}</Text>
                        <Text style={styles.cardText}>{alert.body}</Text>
                        <Text style={styles.cardMeta}>
                            {new Date(alert.timestamp).toLocaleString()}
                        </Text>
                        {alert.face_details && (
                            <View style={styles.faceDetails}>
                                <Text style={styles.cardMeta}>
                                    Person: {alert.face_details.name}
                                </Text>
                                <Text style={styles.cardMeta}>
                                    Relationship: {alert.face_details.relationship}
                                </Text>
                            </View>
                        )}
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    faceDetails: {
        marginTop: 8,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    cardMeta: {
        fontSize: 12,
        color: '#888',
        marginTop: 4,
    },
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
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 40,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginTop: 10,
    },
});

export default Alerts; 