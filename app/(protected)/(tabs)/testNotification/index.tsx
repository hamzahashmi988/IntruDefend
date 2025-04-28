import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { NotificationService } from '../../../../services/api/notification.service';
import { checkNotificationPermission, getExpoPushToken } from '../../../../services/api/notification-permission.utils';
import { RootState } from '../../../../store';
import { PermissionStatus } from 'expo-modules-core';

export default function TestNotificationScreen() {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(PermissionStatus.UNDETERMINED);
  const [pushToken, setPushToken] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.auth.user);
  const notificationService = NotificationService.getInstance();

  useEffect(() => {
    checkCurrentStatus();
  }, []);

  const checkCurrentStatus = async () => {
    try {
      const permission = await checkNotificationPermission();
      setPermissionStatus(permission.status);
      
      const token = await getExpoPushToken();
      setPushToken(token);
    } catch (error) {
      Alert.alert('Error', 'Failed to check notification status');
    }
  };

  const handleRegisterDevice = async () => {
    try {
      if (!user?.email) {
        Alert.alert('Error', 'User not logged in');
        return;
      }

      await notificationService.registerDevice(user.email);
      Alert.alert('Success', 'Device registered successfully');
      await checkCurrentStatus();
    } catch (error) {
      Alert.alert('Error', 'Failed to register device');
      console.log('error: ',error)
    }
  };

  const handleUnregisterDevice = async () => {
    try {
      if (!user?.email) {
        Alert.alert('Error', 'User not logged in');
        return;
      }

      await notificationService.unregisterDevice(user.email);
      Alert.alert('Success', 'Device unregistered successfully');
      await checkCurrentStatus();
    } catch (error) {
      Alert.alert('Error', 'Failed to unregister device');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notification Settings</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Permission Status:</Text>
        <Text style={styles.value}>{permissionStatus}</Text>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.label}>Push Token:</Text>
        <Text style={styles.value} numberOfLines={2}>{pushToken || 'Not available'}</Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Register Device"
          onPress={handleRegisterDevice}
          disabled={!user?.email}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Unregister Device"
          onPress={handleUnregisterDevice}
          disabled={!user?.email}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Refresh Status"
          onPress={checkCurrentStatus}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  value: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    marginVertical: 8,
  },
});
