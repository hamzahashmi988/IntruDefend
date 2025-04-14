import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Alert, RefreshControl } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { Face, Relationship } from "../../../../services/types/domain.types";
import { FaceService } from "../../../../services/api/face.service";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useForm, Controller } from "react-hook-form";
import { Input } from "../../../../components/Input";
import Button from "../../../../components/Button";
import { Picker } from '@react-native-picker/picker';

type RegisterFaceForm = {
    name: string;
    relationship: Relationship;
};

type RegisteredFace = {
    id: string;
    name: string;
    relationship: Relationship;
    is_authorized: boolean;
    created_at: string;
};

export default function Faces() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [registeredFaces, setRegisteredFaces] = useState<RegisteredFace[]>([]);
    const [loadingFaces, setLoadingFaces] = useState(true);

    const { control, handleSubmit, formState: { errors } } = useForm<RegisterFaceForm>({
        defaultValues: {
            name: '',
            relationship: 'family'
        }
    });

    const pickImage = async () => {
        const result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true,
        });

        if (!result.canceled && result.assets[0].base64) {
            setSelectedImage('data:image/jpeg;base64,' + result.assets[0].base64);
        }
    };



    const fetchRegisteredFaces = async () => {
        try {
            const faceService = FaceService.getInstance();
            const response = await faceService.listFaces();
            
            if (response.status === 'error') {
                Alert.alert('Error', response.message || 'Failed to fetch registered faces');
                return;
            }
            
            setRegisteredFaces(response.data.faces);
        } catch (error: any) {
            console.error('Error fetching faces:', error);
            Alert.alert('Error', error?.message || 'Failed to fetch registered faces');
        } finally {
            setLoadingFaces(false);
        }
    };

    const onRefresh = useCallback(async () => {
        setRefreshing(true);
        await fetchRegisteredFaces();
        setRefreshing(false);
    }, []);

    // Fetch faces when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            fetchRegisteredFaces();
        }, [])
    );

    const registerFace = async (data: RegisterFaceForm) => {
        if (!selectedImage) {
            Alert.alert('Error', 'Please select an image first');
            return;
        }
        
        setIsLoading(true);
        try {
            const faceService = FaceService.getInstance();
            const response = await faceService.registerFace({
                name: data.name,
                relationship: data.relationship,
                image: selectedImage
            });
            
            if (response.status === 'error') {
                Alert.alert('Error', response.message || 'Failed to register face');
                return;
            }
            
            setSelectedImage(null);
            control._reset();
            Alert.alert('Success', 'Face registered successfully');
            fetchRegisteredFaces(); // Refresh the list
        } catch (error: any) {
            console.error('Error registering face:', error);
            Alert.alert('Error', error?.message || 'Failed to register face');
        } finally {
            setIsLoading(false);
        }
    };
    console.log(registeredFaces);
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
                <View style={styles.headerContainer}>
                    <Text style={styles.header}>Face Recognition</Text>
                    <TouchableOpacity 
                        onPress={fetchRegisteredFaces}
                        style={styles.refreshButton}
                    >
                        <MaterialCommunityIcons name="refresh" size={24} color="#333" />
                    </TouchableOpacity>
                </View>

                {/* Registered Faces List */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Registered Faces</Text>
                    {loadingFaces ? (
                        <View style={styles.centerContent}>
                            <Text>Loading faces...</Text>
                        </View>
                    ) : registeredFaces.length === 0 ? (
                        <View style={styles.centerContent}>
                            <MaterialCommunityIcons name="account-question" size={48} color="#999" />
                            <Text style={styles.emptyText}>No faces registered yet</Text>
                        </View>
                    ) : (
                        registeredFaces.map(face => (
                            <View key={face.id} style={styles.faceCard}>
                                <View style={styles.faceInfo}>
                                    <Text style={styles.faceName}>{face.name}</Text>
                                    <Text style={styles.faceRelationship}>{face.relationship}</Text>
                                    <Text style={styles.faceDate}>
                                        Added: {new Date(face.created_at).toLocaleDateString()}
                                    </Text>
                                </View>
                                <View style={[styles.authStatus, face.is_authorized && styles.authorized]}>
                                    <MaterialCommunityIcons 
                                        name={face.is_authorized ? "check-circle" : "alert-circle"} 
                                        size={24} 
                                        color={face.is_authorized ? "#4CAF50" : "#FF9800"} 
                                    />
                                    <Text style={styles.authText}>
                                        {face.is_authorized ? "Authorized" : "Pending"}
                                    </Text>
                                </View>
                            </View>
                        ))
                    )}
                </View>

                {/* Registration Form */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Register New Face</Text>
                    <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                        {selectedImage ? (
                            <Image source={{ uri: selectedImage }} style={styles.selectedImage} />
                        ) : (
                            <View style={styles.imagePlaceholder}>
                                <MaterialCommunityIcons name="camera" size={40} color="#666" />
                                <Text style={styles.imagePlaceholderText}>Take Photo</Text>
                            </View>
                        )}
                    </TouchableOpacity>

                    <Controller
                        control={control}
                        name="name"
                        rules={{ required: 'Name is required' }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Name"
                                value={value}
                                onChange={onChange}
                                error={errors.name?.message}
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="relationship"
                        rules={{ required: 'Relationship is required' }}
                        render={({ field: { onChange, value } }) => (
                            <View style={styles.pickerContainer}>
                                <Picker
                                    selectedValue={value}
                                    onValueChange={onChange}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="Family" value="family" />
                                    <Picker.Item label="Friend" value="friend" />
                                    <Picker.Item label="Employee" value="employee" />
                                    <Picker.Item label="Neighbor" value="neighbor" />
                                    <Picker.Item label="Other" value="other" />
                                </Picker>
                            </View>
                        )}
                    />

                    <Button
                        title="Register Face"
                        onPress={handleSubmit(registerFace)}
                        loading={isLoading}
                        disabled={!selectedImage || isLoading}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    refreshButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    centerContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#999',
        marginTop: 10,
    },
    section: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 15,
        color: '#333',
    },
    faceCard: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    faceInfo: {
        flex: 1,
    },
    faceName: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
    },
    faceRelationship: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    faceDate: {
        fontSize: 12,
        color: '#999',
        marginTop: 4,
    },
    authStatus: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#FFF9C4',
        padding: 8,
        borderRadius: 6,
    },
    authorized: {
        backgroundColor: '#E8F5E9',
    },
    authText: {
        marginLeft: 6,
        fontSize: 14,
        color: '#333',
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

    imagePickerButton: {
        width: '100%',
        height: 200,
        marginBottom: 20,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
    },
    selectedImage: {
        width: '100%',
        height: '100%',
    },
    imagePlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imagePlaceholderText: {
        marginTop: 8,
        color: '#666',
    },
    pickerContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        marginBottom: 15,
    },
    picker: {
        height: 50,
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 15,
        marginTop: 15,
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
        marginBottom: 4,
    },
});
