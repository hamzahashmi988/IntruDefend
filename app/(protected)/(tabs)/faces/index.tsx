import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useState } from "react";
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

export default function Faces() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [verificationResult, setVerificationResult] = useState<Face | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [mode, setMode] = useState<'verify' | 'register'>('verify');

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
            setVerificationResult(null);
        }
    };

    const verifyFace = async () => {
        if (!selectedImage) return;
        
        setIsLoading(true);
        try {
            const faceService = FaceService.getInstance();
            const response = await faceService.verifyFace({
                image: selectedImage
            });
            
            if (response.status === 'success') {
                if (response.data.match && response.data.face) {
                    setVerificationResult(response.data.face);
                } else {
                    setVerificationResult(null);
                }
            }
        } catch (error) {
            console.error('Error verifying face:', error);
        }
        setIsLoading(false);
    };

    const registerFace = async (data: RegisterFaceForm) => {
        if (!selectedImage) return;
        
        setIsLoading(true);
        try {
            const faceService = FaceService.getInstance();
            const response = await faceService.registerFace({
                name: data.name,
                relationship: data.relationship,
                image: selectedImage
            });
            
            if (response.status === 'success') {
                setVerificationResult(response.data.face);
                setMode('verify');
            }
        } catch (error) {
            console.error('Error registering face:', error);
        }
        setIsLoading(false);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Face Recognition</Text>

                {/* Mode Toggle */}
                <View style={styles.modeToggle}>
                    <TouchableOpacity 
                        style={[styles.modeButton, mode === 'verify' && styles.modeButtonActive]}
                        onPress={() => setMode('verify')}
                    >
                        <Text style={[styles.modeButtonText, mode === 'verify' && styles.modeButtonTextActive]}>
                            Verify
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={[styles.modeButton, mode === 'register' && styles.modeButtonActive]}
                        onPress={() => setMode('register')}
                    >
                        <Text style={[styles.modeButtonText, mode === 'register' && styles.modeButtonTextActive]}>
                            Register
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Image Picker */}
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

                {mode === 'verify' ? (
                    /* Verify Mode */
                    <View>
                        <Button
                            title="Verify Face"
                            onPress={verifyFace}
                            loading={isLoading}
                            disabled={!selectedImage || isLoading}
                        />

                        {verificationResult && (
                            <View style={styles.card}>
                                <Text style={styles.cardTitle}>Match Found!</Text>
                                <Text style={styles.cardText}>Name: {verificationResult.name}</Text>
                                <Text style={styles.cardText}>
                                    Relationship: {verificationResult.relationship}
                                </Text>
                                <Text style={styles.cardText}>
                                    Status: {verificationResult.is_authorized ? 'Authorized' : 'Unauthorized'}
                                </Text>
                            </View>
                        )}
                    </View>
                ) : (
                    /* Register Mode */
                    <View>
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
                )}
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
    modeToggle: {
        flexDirection: 'row',
        marginBottom: 20,
        backgroundColor: '#eee',
        borderRadius: 8,
        padding: 4,
    },
    modeButton: {
        flex: 1,
        paddingVertical: 8,
        alignItems: 'center',
        borderRadius: 6,
    },
    modeButtonActive: {
        backgroundColor: 'white',
    },
    modeButtonText: {
        color: '#666',
        fontWeight: '500',
    },
    modeButtonTextActive: {
        color: '#007BFF',
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
