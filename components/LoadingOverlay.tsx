import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

export const LoadingOverlay = () => {
    const { isLoading, loadingText } = useSelector((state: any) => state.loading);

    if (!isLoading) return null;

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <ActivityIndicator size="large" color="#007BFF" />
                {loadingText && <Text style={styles.text}>{loadingText}</Text>}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
    content: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        marginTop: 10,
        color: '#333',
        fontSize: 16,
    },
});
