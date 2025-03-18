import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { Form, FieldType, FormRefType } from "../form";

import bg from "../assets/bg-shape.png";
import Button from "@/components/Button";

type FormDataType = {
  fullName: string;
  email: string;
  phoneNumber: string;
  alternatePhone: string;
  address: string;
  password: string;
};

const validationSchema = Yup.object({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email().required("Email is required"),
  phoneNumber: Yup.string().required("Phone Number is required"),
  alternatePhone: Yup.string().required(),
  address: Yup.string().required("Address is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Register = () => {
  const router = useRouter();
  const formRef = useRef<FormRefType<FormDataType>>(null);
  const [isLoading, setIsLoading] = useState(false);

  const FormConfig: Array<FieldType> = [
    {
      name: "fullName",
      placeholder: "Full Name",
      value: "",
      icon: require("../assets/email.png"),
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
      name: "phoneNumber",
      placeholder: "Phone Number",
      value: "",
      icon: require("../assets/email.png"),
      keyboardType: "phone-pad",
      containerStyles: { marginBottom: 15 },
    },
    {
      name: "alternatePhone",
      placeholder: "Alternate Phone",
      value: "",
      icon: require("../assets/email.png"),
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
    console.log("Form Data:", data);
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

          <TouchableOpacity onPress={() => router.canGoBack()}>
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
    backgroundColor: "rgba(0,0,0,0.2)",
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
});

export default Register;
