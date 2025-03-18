import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import * as Yup from "yup";

import { useRouter } from "expo-router";
import { Form, FieldType, FormRefType } from "../form";

import bg from "../assets/bg-shape.png";
import Button from "@/components/Button";

type FormDataType = {
  email: string;
  password: string;
};

const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Signin = () => {
  const router = useRouter();

  const formRef = useRef<FormRefType<FormDataType>>(null);

  const [isLoading, setIsLoading] = useState(false);

  const FormConfig: Array<FieldType> = [
    {
      name: "email",
      placeholder: "Email",
      value: "",
      icon: require("../assets/email.png"),
      containerStyles: { marginBottom: 20 },
      keyboardType: "email-address",
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
    const { email, password } = data;
    const payload = {
      email,
      password,
    };
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
        {/* Login Form */}
        <View style={styles.form}>
          <Text style={styles.title}>Login</Text>

          <Form<FormDataType>
            config={FormConfig}
            formRef={formRef}
            validationSchema={validationSchema}
          />

          <TouchableOpacity onPress={() => router.push("/register")}>
            <Text style={styles.registerText}>Register Account</Text>
          </TouchableOpacity>

          <Button
            title="Log In"
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
  backgroundImage: {
    flex: 1, // Ensures the background image covers the entire screen
  },
  container: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
    backgroundColor: "rgba(0,0,0,0.2)", // Add a semi-transparent overlay if needed
  },
  form: {
    width: "90%", // Adjust width as needed
    maxWidth: 400, // Optional: Set a maximum width for larger screens
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
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

  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  registerText: {
    marginTop: 15,
    fontSize: 16,
    color: "#007BFF",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default Signin;
