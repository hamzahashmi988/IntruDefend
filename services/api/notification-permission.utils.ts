import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { PermissionStatus } from 'expo-modules-core';

const PERMISSION_STATUS_KEY = '@notification_permission_status';
const EXPO_PUSH_TOKEN_KEY = '@expo_push_token';

export interface NotificationPermissionState {
  status: PermissionStatus;
  expoPushToken?: string;
  timestamp: number;
}

export const checkNotificationPermission = async (): Promise<NotificationPermissionState> => {
  try {
    const status = await Notifications.getPermissionsAsync();
    return {
      status: status.status,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('Error checking notification permission:', error);
    throw error;
  }
};

export const requestNotificationPermission = async (): Promise<NotificationPermissionState> => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    const permissionState = {
      status,
      timestamp: Date.now(),
    };
    await AsyncStorage.setItem(PERMISSION_STATUS_KEY, JSON.stringify(permissionState));
    return permissionState;
  } catch (error) {
    console.error('Error requesting notification permission:', error);
    throw error;
  }
};

export const getStoredPermissionStatus = async (): Promise<NotificationPermissionState | null> => {
  try {
    const storedStatus = await AsyncStorage.getItem(PERMISSION_STATUS_KEY);
    return storedStatus ? JSON.parse(storedStatus) : null;
  } catch (error) {
    console.error('Error getting stored permission status:', error);
    return null;
  }
};

export const getExpoPushToken = async (): Promise<string | null> => {
  try {
    // First check if we have a stored token
    const storedToken = await AsyncStorage.getItem(EXPO_PUSH_TOKEN_KEY);
    if (storedToken) {
      return storedToken;
    }

    // Check if physical device
    if (!Device.isDevice) {
      throw new Error('Must use physical device for Push Notifications');
    }

    // Get the token
    const { data: token } = await Notifications.getExpoPushTokenAsync({
      projectId: process.env.EXPO_PROJECT_ID // Make sure to set this in your app config
    });

    // Store the token
    await AsyncStorage.setItem(EXPO_PUSH_TOKEN_KEY, token);
    return token;
  } catch (error) {
    console.error('Error getting Expo push token:', error);
    return null;
  }
};

export const clearNotificationData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([PERMISSION_STATUS_KEY, EXPO_PUSH_TOKEN_KEY]);
  } catch (error) {
    console.error('Error clearing notification data:', error);
    throw error;
  }
};
