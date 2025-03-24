import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";

import { Form, FieldType, FormRefType } from "../form";

import bg from "../assets/bg-shape.png";
import Button from "@/components/Button";
import { objectToFormData } from "@/utls/common.utils";

type FormDataType = {
  name: string;
  email: string;
  phone_no: string;
  alternate_phone_no: string;
  address: string;
  password: string;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Full Name is required"),
  email: Yup.string().email().required("Email is required"),
  phone_no: Yup.string().required("Phone Number is required"),
  alternate_phone_no: Yup.string().required(),
  address: Yup.string().required("Address is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const router = useRouter();
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
      // Store the image info directly
      setSelectedImage(result.assets[0]);
      setImageUri(result.assets[0].uri);
    }
  };

  const FormConfig: Array<FieldType> = [
    {
      name: "name",
      placeholder: "Full Name",
      value: "",
      icon: require("../assets/person.png"),
      containerStyles: { marginBottom: 15 },
    },
    {
      name: "email",
      placeholder: "Email",
      value: "",
      icon: require("../assets/email.png"),
      keyboardType: "email-address",
      containerStyles: { marginBottom: 15 },
    },
    {
      name: "phone_no",
      placeholder: "Phone Number",
      value: "",
      icon: require("../assets/phone.png"),
      keyboardType: "phone-pad",
      containerStyles: { marginBottom: 15 },
    },
    {
      name: "alternate_phone_no",
      placeholder: "Alternate Phone",
      value: "",
      icon: require("../assets/phone.png"),
      keyboardType: "phone-pad",
      containerStyles: { marginBottom: 15 },
    },
    {
      name: "address",
      placeholder: "Address",
      value: "",
      icon: require("../assets/email.png"),
      containerStyles: { marginBottom: 15 },
    },
    {
      name: "password",
      placeholder: "Password",
      value: "",
      icon: require("../assets/lock.png"),
      secureText: true,
    },
  ];

  const handleSubmitForm = (data: FormDataType) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("phone_no", data.phone_no);
    formData.append("alternate_phone_no", data.alternate_phone_no);
    formData.append("address", data.address);
    formData.append("password", data.password);

    if (selectedImage) {
      formData.append("image", {
        uri: selectedImage.uri,
        type: 'image/jpeg',
        name: 'photo.jpg',
      } as any);
    }

    fetch("https://96c8-39-51-111-109.ngrok-free.app/sign-up", {
      method: "POST",
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(async (res) => {
        setIsLoading(false);
        if (res.status === 200) {
          Alert.alert(
            "Success",
            "Signup completed successfully",
            [{ text: "OK", onPress: () => router.push("/sign-in") }]
          );
        } else {
          Alert.alert(
            "Error",
            "Signup failed. Please try again.",
            [{ text: "OK" }]
          );
        }
      })
      .catch((err) => {
        setIsLoading(false);
        Alert.alert(
          "Error",
          "Signup failed. Please check your connection.",
          [{ text: "OK" }]
        );
        console.log("signup failed:", err);
      });
  };

  const onSubmit = () => formRef?.current?.handleSubmit(handleSubmitForm)();

  return (
    <React.Fragment>
      <Image
        source={bg}
        resizeMode="stretch"
        style={{ position: "absolute", width: 250, height: 160 }}
      />

      <View style={styles.container}>
        <View style={styles.form}>
          <Text style={styles.title}>Register</Text>

          <Form<FormDataType>
            config={FormConfig}
            formRef={formRef}
            validationSchema={validationSchema}
          />

          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {imageUri ? (
              <Image
                source={{ uri: imageUri }}
                style={{ width: 100, height: 100, borderRadius: 50 }}
              />
            ) : (
              <Text style={styles.imagePickerText}>Select Profile Image</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push("/sign-in")}>
            <Text style={styles.signinText}>
              Already have an account? Sign In
            </Text>
          </TouchableOpacity>

          <Button
            title="Register"
            disabled={isLoading}
            onPress={onSubmit}
            isLoading={isLoading}
          />
        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  form: {
    width: "90%",
    maxWidth: 400,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  signinText: {
    marginTop: 15,
    fontSize: 16,
    color: "#007BFF",
    textAlign: "center",
    marginBottom: 10,
  },

  imagePicker: {
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 15,
  },
  imagePickerText: {
    color: "#000",
    fontSize: 16,
    marginTop: 10,
  },
  imageName: {
    textAlign: "center",
    fontSize: 14,
    color: "#333",
    marginBottom: 15,
  },
});

export default Register;
