import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Alert,
    ScrollView,
} from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Yup from "yup";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { Form, FieldType, FormRefType } from "../../form";
import Button from "@/components/Button";

type FormDataType = {
    name: string;
    relation: string;
};

const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    relation: Yup.string().required("Relation is required"),
});

export default function AddFamilyMember() {
    const router = useRouter();
    const jwt = useSelector((state: any) => state.auth.jwt);
    const formRef = useRef<FormRefType<FormDataType>>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<any>(null);
    const [imageUri, setImageUri] = useState<string | null>(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 4],
            quality: 1,
        });

        if (!result.canceled) {
            setSelectedImage(result.assets[0]);
            setImageUri(result.assets[0].uri);
        }
    };

    const FormConfig: Array<FieldType> = [
        {
            name: "name",
            placeholder: "Family Member Name",
            value: "",
            icon: require("../../assets/person.png"),
            containerStyles: { marginBottom: 15 },
        },
        {
            name: "relation",
            placeholder: "Relation (e.g., spouse, child)",
            value: "",
            icon: require("../../assets/person.png"),
            containerStyles: { marginBottom: 15 },
        },
    ];

    const handleSubmit = async (data: FormDataType) => {
        if (!selectedImage) {
            Alert.alert("Error", "Please select an image");
            return;
        }

        setIsLoading(true);
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("relation", data.relation);

        formData.append("image", {
            uri: selectedImage.uri,
            type: 'image/jpeg',
            name: 'photo.jpg',
        } as any);

        try {
            const response = await fetch("https://96c8-39-51-111-109.ngrok-free.app/register-face", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${jwt}`,
                    'Content-Type': 'multipart/form-data',
                },
                body: formData,
            });

            const responseData = await response.json();

            if (responseData.status === "success") {
                Alert.alert(
                    "Success",
                    responseData.message,
                    [
                        {
                            text: "OK",
                            onPress: () => router.back()
                        }
                    ]
                );
            } else {
                Alert.alert("Error", responseData.message);
            }
        } catch (error) {
            Alert.alert("Error", "Failed to add family member. Please try again.");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => router.back()}
                    >
                        <MaterialIcons name="arrow-back" size={24} color="#007BFF" />
                    </TouchableOpacity>
                    <Text style={styles.title}>Add Family Member</Text>
                </View>

                <View style={styles.imageSection}>
                    <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                        {imageUri ? (
                            <Image
                                source={{ uri: imageUri }}
                                style={styles.selectedImage}
                            />
                        ) : (
                            <View style={styles.placeholderContainer}>
                                <MaterialIcons name="add-a-photo" size={40} color="#007BFF" />
                                <Text style={styles.placeholderText}>Add Photo</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.formContainer}>
                    <Form<FormDataType>
                        config={FormConfig}
                        formRef={formRef}
                        validationSchema={validationSchema}
                    />

                    <Button
                        title="Add Member"
                        disabled={isLoading}
                        onPress={() => formRef?.current?.handleSubmit(handleSubmit)()}
                        isLoading={isLoading}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        marginRight: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
    },
    imageSection: {
        alignItems: 'center',
        padding: 20,
    },
    imagePickerButton: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        borderWidth: 2,
        borderColor: '#007BFF',
        borderStyle: 'dashed',
    },
    selectedImage: {
        width: '100%',
        height: '100%',
    },
    placeholderContainer: {
        alignItems: 'center',
    },
    placeholderText: {
        marginTop: 8,
        color: '#007BFF',
        fontSize: 16,
    },
    formContainer: {
        padding: 20,
    },
}); 