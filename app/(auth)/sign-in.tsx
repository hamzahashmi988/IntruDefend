import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useRef, useState, useEffect } from "react";
import * as Yup from "yup";
import { useRouter } from "expo-router";
import { Form, FieldType, FormRefType } from "@/form";
import Button from "@/components/Button";
import { useDispatch, useSelector } from "react-redux";
import { setAuthData } from "@/store/slices/auth.slice";
import { AuthService } from "@/services/api/auth.service";
import { ApiResponse } from "@/services/types/api-response.types";
import type { RootState } from "@/store";

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
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const formRef = useRef<FormRefType<FormDataType>>(null);
  const [isLoading, setIsLoading] = useState(false);

  const FormConfig: Array<FieldType> = [
    {
      name: "email",
      placeholder: "Email",
      value: "",
      icon: require("../../assets/email.png"),
      containerStyles: { marginBottom: 20 },
      keyboardType: "email-address",
    },
    {
      name: "password",
      placeholder: "Password",
      value: "",
      icon: require("../../assets/lock.png"),
      secureText: true,
    },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/(protected)/(tabs)/home");
    }
  }, [isAuthenticated]);

  const handleSubmitForm = async (data: FormDataType) => {
    setIsLoading(true);

    try {
      const authService = AuthService.getInstance();
      const response = await authService.login(data);
      
      if (response.status === 'success') {
        dispatch(setAuthData({
          user: response.data.user,
          access_token: response.data.access_token
        }));
        router.replace("/(protected)/(tabs)/home");
      } else {
        Alert.alert("Error", response.message);
      }
    } catch (error: unknown) {
      console.error("Login error:", error);
      Alert.alert("Error", error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = () => formRef?.current?.handleSubmit(handleSubmitForm)();

  return (
    <React.Fragment>
      <View style={styles.container}>
        {/* Login Form */}
        <View style={styles.form}>
          <Text style={styles.title}>Login</Text>

          <Form<FormDataType>
            config={FormConfig}
            formRef={formRef}
            validationSchema={validationSchema}
          />

          <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
            <Text style={styles.registerText}>Register Account</Text>
          </TouchableOpacity>

          <Button
            label="Login"
            onPress={onSubmit}
            loading={isLoading}
            style={{ marginTop: 20 }}
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
    padding: 20,
    backgroundColor: "#fff",
  },
  form: {
    width: "100%",
    maxWidth: 400,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  registerText: {
    color: "#007AFF",
    textAlign: "center",
    marginTop: 15,
  },
});

export default Signin;
