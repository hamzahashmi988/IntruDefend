import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";

export function useAuthGuard() {
    const router = useRouter();
    const isAuthenticated = useSelector((state: any) => state.auth.isAuthenticated);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/sign-in");
        }
    }, [isAuthenticated]);

    return isAuthenticated;
} 