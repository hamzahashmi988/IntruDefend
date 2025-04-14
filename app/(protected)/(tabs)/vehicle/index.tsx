import { View, Text, StyleSheet, ScrollView, RefreshControl, Switch, Platform } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from "react";
import { VehicleStatus } from "../../../../services/types/domain.types";
import { VehicleService } from "../../../../services/api/vehicle.service";
import { MaterialCommunityIcons, Ionicons } from "@expo/vector-icons";


function Vehicle() {
    const [vehicleStatus, setVehicleStatus] = useState<VehicleStatus | null>(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchVehicleStatus = async () => {
        try {
            const vehicleService = VehicleService.getInstance();
            const response = await vehicleService.getVehicleStatus();
            if (response.status === 'success') {
                setVehicleStatus(response.data.status);
            }
        } catch (error) {
            console.error('Error fetching vehicle status:', error);
        }
    };

    const toggleLock = async () => {
        if (!vehicleStatus) return;
        
        try {
            const vehicleService = VehicleService.getInstance();
            const response = await vehicleService.updateVehicleStatus({
                ...vehicleStatus,
                locked: !vehicleStatus.locked,
            });
            
            if (response.status === 'success') {
                setVehicleStatus(response.data.status);
            }
        } catch (error) {
            console.error('Error toggling lock:', error);
        }
    };

    const toggleAlarm = async () => {
        if (!vehicleStatus) return;
        
        try {
            const vehicleService = VehicleService.getInstance();
            const response = await vehicleService.updateVehicleStatus({
                ...vehicleStatus,
                alarm_active: !vehicleStatus.alarm_active,
            });
            
            if (response.status === 'success') {
                setVehicleStatus(response.data.status);
            }
        } catch (error) {
            console.error('Error toggling alarm:', error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchVehicleStatus();
        setRefreshing(false);
    };

    useEffect(() => {
        fetchVehicleStatus();
    }, []);

    if (!vehicleStatus) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <Text>Loading vehicle status...</Text>
                </View>
            </SafeAreaView>
        );
    }

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
                <Text style={styles.header}>Vehicle Status</Text>
                
                {/* Location Card */}
                <View style={styles.locationCard}>
                    <Text style={styles.cardTitle}>Vehicle Location</Text>
                    <Text style={styles.cardText}>
                        Latitude: {vehicleStatus.location.latitude}
                    </Text>
                    <Text style={styles.cardText}>
                        Longitude: {vehicleStatus.location.longitude}
                    </Text>
                    <Text style={styles.cardText}>
                        Last Updated: {new Date(vehicleStatus.last_updated).toLocaleString()}
                    </Text>
                </View>

                {/* Status Cards */}
                <View style={styles.card}>
                    <View style={styles.statusRow}>
                        <View style={styles.statusItem}>
                            <MaterialCommunityIcons 
                                name={vehicleStatus.locked ? "lock" : "lock-open"} 
                                size={24} 
                                color={vehicleStatus.locked ? "#4CAF50" : "#FF5722"}
                            />
                            <Text style={styles.statusLabel}>Locked</Text>
                            <Switch
                                value={vehicleStatus.locked}
                                onValueChange={toggleLock}
                            />
                        </View>
                        <View style={styles.statusItem}>
                            <MaterialCommunityIcons 
                                name={vehicleStatus.alarm_active ? "bell-ring" : "bell-off"} 
                                size={24} 
                                color={vehicleStatus.alarm_active ? "#F44336" : "#9E9E9E"}
                            />
                            <Text style={styles.statusLabel}>Alarm</Text>
                            <Switch
                                value={vehicleStatus.alarm_active}
                                onValueChange={toggleAlarm}
                            />
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.statusRow}>
                        <View style={styles.statusItem}>
                            <MaterialCommunityIcons 
                                name="battery" 
                                size={24} 
                                color="#2196F3"
                            />
                            <Text style={styles.statusLabel}>Battery</Text>
                            <Text style={styles.statusValue}>{vehicleStatus.battery_level}%</Text>
                        </View>
                        <View style={styles.statusItem}>
                            <MaterialCommunityIcons 
                                name="thermometer" 
                                size={24} 
                                color="#FF9800"
                            />
                            <Text style={styles.statusLabel}>Temperature</Text>
                            <Text style={styles.statusValue}>{vehicleStatus.temperature}°F</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.cardTitle}>Last Updated</Text>
                    <Text style={styles.cardText}>
                        {new Date(vehicleStatus.last_updated).toLocaleString()}
                    </Text>
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
    statusRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    statusItem: {
        alignItems: 'center',
    },
    statusLabel: {
        fontSize: 14,
        color: '#666',
        marginVertical: 8,
    },
    statusValue: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
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
    locationCard: {
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
});

export default Vehicle;
