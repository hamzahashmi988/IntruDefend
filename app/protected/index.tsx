import { Tabs } from "expo-router";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "react-native";
import { useSelector } from "react-redux";

export default function TabsLayout() {
    const userData = useSelector((state: any) => state.auth.user_data);
    const defaultAvatar = "https://www.gravatar.com/avatar/default?d=mp";

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: "#007BFF",
                tabBarInactiveTintColor: "#4A4A4A",
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="alerts"
                options={{
                    title: "Alerts",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="notifications" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="family"
                options={{
                    title: "Family",
                    tabBarIcon: ({ color, size }) => (
                        <MaterialCommunityIcons name="account-group" size={size} color={color} />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profile",
                    tabBarIcon: ({ color, size }) => (
                        <Image
                            source={{ uri: userData?.image_url || defaultAvatar }}
                            style={{
                                width: size,
                                height: size,
                                borderRadius: size / 2,
                            }}
                        />
                    ),
                }}
            />
        </Tabs>
    );
} 