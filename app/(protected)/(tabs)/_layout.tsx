import { Tabs } from "expo-router";
import { useSelector } from "react-redux";
import TabIcon from "@/components/TabIcon";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function TabLayout() {
  const userData = useSelector((state: any) => state.auth.user);
  const defaultAvatar = "https://www.gravatar.com/avatar/default?d=mp";

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarItemStyle: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingTop: 6,
            paddingBottom: 0,
            marginBottom: 0,
            height: '100%',
            minWidth: 80,
            flexBasis: '20%',
        },
        tabBarStyle: {
            backgroundColor: '#0F0D23',
            borderRadius: 50,
            marginHorizontal: 2,
            marginBottom: 30,
            height: 60,
            position: 'absolute',
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: '#0F0D23',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal:10

        },
        headerShown: false
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} title="Home">
              <MaterialIcons name="home" size={24} color={focused ? '#fff' : '#A0A0A0'} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="alerts/index"
        options={{
          title: "Alerts",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} title="Alerts">
              <MaterialIcons name="notifications" size={24} color={focused ? '#fff' : '#A0A0A0'} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="faces/index"
        options={{
          title: "Faces",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} title="Faces">
              <MaterialCommunityIcons name="face-recognition" size={24} color={focused ? '#fff' : '#A0A0A0'} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="liveLocation/index"
        options={{
          title: "Live Location",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} title="Location">
              <MaterialIcons name="location-on" size={24} color={focused ? '#fff' : '#A0A0A0'} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="profile/index"
        options={{
          title: "Profile",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} title="Profile">
              <Ionicons name="person" size={24} color={focused ? '#fff' : '#A0A0A0'} />
            </TabIcon>
          ),
        }}
      />
      <Tabs.Screen
        name="testNotification/index"
        options={{
          title: "Notification",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <TabIcon focused={focused} title="Notification">
              <MaterialIcons name="notifications" size={24} color={focused ? '#fff' : '#A0A0A0'} />
            </TabIcon>
          ),
        }}
      />
    </Tabs>
  );
}
