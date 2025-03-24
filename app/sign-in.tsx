import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import * as Yup from "yup";

import { useRouter } from "expo-router";
import { Form, FieldType, FormRefType } from "../form";

import bg from "../assets/bg-shape.png";
import Button from "@/components/Button";
import { objectToFormData } from "@/utls/common.utils";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData, UserData } from "@/store/slices/auth.slice";

type FormDataType = {
  email: string;
  password: string;
};
export type ResponseData = {
  data: UserData;
  message: string;
  status: string
}
const validationSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

const Signin = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

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

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/protected/home");
    }
  }, [isAuthenticated]);

  const handleSubmitForm = (data: FormDataType) => {
    setIsLoading(true);

    fetch("https://96c8-39-51-111-109.ngrok-free.app/login", {
      method: "POST",
      headers: {
        'Accept': 'application/json',
      },
      body: objectToFormData({ ...data }),
    })
      .then((res) => res.json())
      .then((responseData) => {
        setIsLoading(false);
        dispatch(setAuthData(responseData.data));

        router.replace("/protected/home");
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setIsLoading(false);
        Alert.alert(
          "Error",
          err.message || "Login failed. Please try again.",
          [{ text: "OK" }]
        );
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
  container: {
    flex: 1,
    justifyContent: "center", // Center content vertically
    alignItems: "center", // Center content horizontally
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
