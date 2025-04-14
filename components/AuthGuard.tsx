import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useAuthGuard() {
    const router = useRouter();
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

    useEffect(() => {
        const checkAuth = async () => {
            if (!isAuthenticated) {
                await AsyncStorage.removeItem('access_token');
                router.replace('/(auth)/sign-in');
            }
        };
        
        checkAuth();
    }, [isAuthenticated]);

    return isAuthenticated;
} 