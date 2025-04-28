import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

interface FamilyMember {
    name: string;
    relation: string;
}

interface FamilyResponse {
    data: {
        count: number;
        family_members: FamilyMember[];
    };
    message: string;
    status: string;
}

export default function Family() {
    const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const jwt = useSelector((state: any) => state.auth.jwt);
    const router = useRouter();

    useEffect(() => {
        fetchFamilyMembers();
    }, []);

    const fetchFamilyMembers = async () => {
        try {
            const response = await fetch("https://96c8-39-51-111-109.ngrok-free.app/family-members", {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${jwt}`,
                },
            });
            const data: FamilyResponse = await response.json();

            if (data.status === "success") {
                setFamilyMembers(data.data.family_members);
            } else {
                setError("Failed to fetch family members");
            }
        } catch (err) {
            setError("An error occurred while fetching family members");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const getInitials = (name: string) => {
        return name
            .split(' ')
            .map(word => word[0])
            .join('')
            .toUpperCase();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Family Members</Text>
                    <TouchableOpacity
                        style={styles.reloadButton}
                        onPress={fetchFamilyMembers}
                    >
                        <MaterialIcons name="refresh" size={24} color="#007BFF" />
                    </TouchableOpacity>
                </View>

                {isLoading ? (
                    <ActivityIndicator size="large" color="#007BFF" style={styles.loader} />
                ) : error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : familyMembers.length === 0 ? (
                    <Text style={styles.noDataText}>No family members found</Text>
                ) : (
                    familyMembers.map((member, index) => (
                        <View key={index} style={styles.memberCard}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>
                                    {getInitials(member.name)}
                                </Text>
                            </View>
                            <View style={styles.memberInfo}>
                                <Text style={styles.memberName}>{member.name}</Text>
                                <Text style={styles.memberRole}>
                                    {member.relation.charAt(0).toUpperCase() + member.relation.slice(1)}
                                </Text>
                            </View>
                        </View>
                    ))
                )}
            </ScrollView>
            <TouchableOpacity
                style={styles.fab}
                onPress={() => router.push("/protected/add-family-member")}
            >
                <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 15,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    reloadButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    memberCard: {
        flexDirection: 'row',
        alignItems: 'center',
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
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#007BFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    memberInfo: {
        marginLeft: 15,
    },
    memberName: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    memberRole: {
        fontSize: 14,
        color: '#666',
        marginTop: 2,
    },
    loader: {
        marginTop: 20,
    },
    errorText: {
        color: '#FF4444',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    noDataText: {
        color: '#666',
        textAlign: 'center',
        marginTop: 20,
        fontSize: 16,
    },
    fab: {
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: '#007BFF',
        width: 56,
        height: 56,
        borderRadius: 28,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
}); 