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
import React, { useState } from "react";
import { useRouter } from "expo-router";
import bg from "../assets/bg-shape.png";

const Signup = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [phone_no, setPhone_no] = useState("");
  const [alternate_phone_no, setalternate_Phone_no] = useState("");
  const [address, setaddress] = useState("");
  const [name, setname] = useState("");

  const handleSubmit = () => {
    const formdata = new FormData();
    formdata.append("email", email);
    formdata.append("password", Password);
    formdata.append("phone_no", phone_no);
    formdata.append("alternate_phone_no", alternate_phone_no);
    formdata.append("address", address);
    formdata.append("name", name);

    setIsLoading(true);

    fetch("https://4631-111-88-81-41.ngrok-free.app/sign-up", {
      method: "POST",
      body: formdata,
    })
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        Alert.alert(res?.message || res?.error);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("----->", err);
      });
  };

  return (
    <React.Fragment>
      <Image
        source={bg}
        resizeMode="stretch"
        style={{ position: "absolute", width: 250, height: 160 }}
      />
      <View style={styles.container}>
        {/* Signup Form */}
        <View style={styles.form}>
          <Text style={styles.title}>Signup</Text>

          {/* Input Fields */}
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={(val) => setname(val)}
            placeholder="Full Name"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={(val) => setEmail(val)}
            placeholder="Email"
            placeholderTextColor="#888"
            keyboardType="email-address"
          />
          <TextInput
            style={styles.input}
            value={phone_no}
            onChangeText={(val) => setPhone_no(val)}
            placeholder="Phone_no"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            value={alternate_phone_no}
            onChangeText={(val) => setalternate_Phone_no(val)}
            placeholder="alternate_phone_no"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={(val) => setaddress(val)}
            placeholder="address"
            placeholderTextColor="#888"
          />
          <TextInput
            style={styles.input}
            value={Password}
            onChangeText={(val) => setPassword(val)}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry
          />

          {isLoading && <ActivityIndicator />}
          {/* Login Link */}
          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.registerText}>Login</Text>
          </TouchableOpacity>

          {/* Submit Button */}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
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
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  button: {
    height: 50,
    backgroundColor: "#007BFF",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
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
  },
});

export default Signup;
