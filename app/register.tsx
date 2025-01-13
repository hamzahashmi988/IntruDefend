import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

import bg from "../assets/bg-shape.png"

// const bg = require("../assets/bg-shape.png")

const Signin = () => {

    const router = useRouter();

    return (
        <View style={styles.container}>
            <Image source={bg} resizeMode='stretch' style={{ position: "absolute", width: 250, height: 160 }} />
            <Text style={styles.title}>Signup</Text>

            {/* Input Fields */}
            <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#888" />
            <TextInput style={styles.input} placeholder="Email" placeholderTextColor="#888" keyboardType="email-address" />
            <TextInput style={styles.input} placeholder="Password" placeholderTextColor="#888" secureTextEntry />
            <TextInput style={styles.input} placeholder="Confirm Password" placeholderTextColor="#888" secureTextEntry />


            <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.registerText}>Login</Text>
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
        padding: 20,
        backgroundColor: '#f8f9fa',
        position: "relative"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 30,
        marginTop: 200
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
        color: "black"
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
