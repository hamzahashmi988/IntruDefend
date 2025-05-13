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
                const alertsData = response.data.alerts;
const alertsArray = Array.isArray(alertsData)
  ? alertsData
  : Object.values(alertsData || {});
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
                        <ActivityIndicator size="large" color="#007BFF" style={{ marginBottom: 16 }} />
                        <Text style={styles.emptyText}>Loading alerts...</Text>
                    </View>
                ) : alerts.length === 0 ? (
                    <View style={styles.centerContent}>
                        <MaterialIcons name="notifications-none" size={64} color="#E0E0E0" />
                        <Text style={styles.emptyText}>No alerts to display</Text>
                    </View>
                ) : alerts.map((alert, index) => {
                    // Choose color and icon based on alert type
                    let borderColor = '#007BFF';
                    let iconName: React.ComponentProps<typeof MaterialIcons>["name"] = 'notifications';
                    let iconColor = '#007BFF';
                    if (alert.type === 'unauthorized_access') {
                        borderColor = '#FF4444';
                        iconName = 'error-outline'; 
                        iconColor = '#FF4444';
                    } else if (alert.type === 'external_notification') {
                        borderColor = '#FFA500';
                        iconName = 'warning'; 
                        iconColor = '#FFA500';
                    }
                    return (
                        <View key={index} style={[styles.card, { borderLeftColor: borderColor }]}>   
                            <View style={styles.cardHeader}>
                                <MaterialIcons name={iconName} size={28} color={iconColor} style={{ marginRight: 10 }} />
                                <View style={{ flex: 1 }}>
                                    <Text style={styles.cardTitle}>{alert.title}</Text>
                                    <Text style={styles.cardMeta}>{new Date(alert.timestamp).toLocaleString()}</Text>
                                </View>
                                {alert.status && (
                                    <View style={[styles.statusBadge, { backgroundColor: alert.status === 'sent' ? '#E0F7FA' : '#FDECEA' }]}> 
                                        <Text style={[styles.statusText, { color: alert.status === 'sent' ? '#007BFF' : '#FF4444' }]}>{alert.status}</Text>
                                    </View>
                                )}
                            </View>
                            <Text style={styles.cardText}>{alert.body}</Text>
                            {alert.location && (
                                <Text style={styles.cardLocation}>Location: {alert.location}</Text>
                            )}
                        </View>
                    );
                })} 
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
        fontSize: 26,
        fontWeight: 'bold',
        marginBottom: 18,
        color: '#22223B',
        letterSpacing: 0.5,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 14,
        padding: 16,
        marginBottom: 18,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.14,
        shadowRadius: 8,
        elevation: 4,
        borderLeftWidth: 5,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    cardTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#22223B',
        marginBottom: 2,
    },
    cardMeta: {
        fontSize: 12,
        color: '#888',
        marginTop: 2,
    },
    cardText: {
        fontSize: 15,
        color: '#444',
        marginBottom: 6,
    },
    cardLocation: {
        fontSize: 13,
        color: '#007BFF',
        marginTop: 2,
        fontStyle: 'italic',
    },
    statusBadge: {
        borderRadius: 16,
        paddingHorizontal: 10,
        paddingVertical: 3,
        alignSelf: 'flex-start',
        marginLeft: 8,
    },
    statusText: {
        fontSize: 11,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 50,
    },
    emptyText: {
        fontSize: 17,
        color: '#bbb',
        marginTop: 12,
        fontWeight: '500',
    },
});

export default Alerts; 