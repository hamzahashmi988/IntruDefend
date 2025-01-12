import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Signin = () => {

  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Input Fields */}

      <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" keyboardType="email-address" />
      <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry />



      <TouchableOpacity onPress={() => router.push('/register')}>
        <Text style={styles.registerText}>Register Account</Text>
      </TouchableOpacity>

      {/* Submit Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  button: {
    height: 50,
    backgroundColor: '#007BFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  registerText: {
    marginTop: 15,
    fontSize: 16,
    color: '#007BFF',
    textAlign: 'center',
  },
});

export default Signin;
