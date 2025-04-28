import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { ApiClient } from './api-client';
import { getExpoPushToken, getStoredPermissionStatus, requestNotificationPermission } from './notification-permission.utils';
import Constants from 'expo-constants';

interface DeviceInfo {
  model: string;
  os_version: string;
  app_version: string;
}

interface RegisterDeviceRequest {
  user_id: string;
  fcm_token: string;
  device_info: DeviceInfo;
  permission_status: string;
}

export class NotificationService {
  private static instance: NotificationService;
  private apiClient: ApiClient;
  private retryAttempts = 3;
  private retryDelay = 2000; // 2 seconds

  private constructor() {
    this.apiClient = ApiClient.getInstance();
  }

  public static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  private async getDeviceInfo(): Promise<DeviceInfo> {
    return {
      model: Device.modelName || 'Unknown',
      os_version: `${Platform.OS} ${Platform.Version}`,
      app_version: Constants.expoConfig?.version || '1.0.0',
    };
  }

  private async retryOperation<T>(operation: () => Promise<T>): Promise<T> {
    let lastError: Error | null = null;
    
    for (let attempt = 1; attempt <= this.retryAttempts; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (attempt < this.retryAttempts) {
          await new Promise(resolve => setTimeout(resolve, this.retryDelay * attempt));
        }
      }
    }
    
    throw lastError || new Error('Operation failed after multiple retries');
  }

  public async registerDevice(userId: string): Promise<void> {
    const permissionState = await getStoredPermissionStatus();
    if (!permissionState) {
      await requestNotificationPermission();
    }

    const token = await getExpoPushToken();
    if (!token) {
      throw new Error('Failed to get push token');
    }

    const deviceInfo = await this.getDeviceInfo();
    const request: RegisterDeviceRequest = {
      user_id: userId,
      fcm_token: token,
      device_info: deviceInfo,
      permission_status: permissionState?.status || 'unknown'
    };

    await this.retryOperation(() => 
      this.apiClient.post('/api/user-device/register', request)
    );
  }

  public async updatePermissionStatus(userId: string, permissionStatus: string): Promise<void> {
    const token = await getExpoPushToken();
    if (!token) {
      throw new Error('No push token available');
    }

    await this.retryOperation(() =>
      this.apiClient.post('/api/user-device/update-permission', {
        user_id: userId,
        fcm_token: token,
        permission_status: permissionStatus
      })
    );
  }

  public async unregisterDevice(userId: string): Promise<void> {
    const token = await getExpoPushToken();
    if (!token) {
      return; // If no token exists, nothing to unregister
    }

    await this.retryOperation(() =>
      this.apiClient.post('/api/user-device/delete', {
        user_id: userId,
        fcm_token: token
      })
    );
  }

  public async listDevices(userId: string) {
    return this.retryOperation(() =>
      this.apiClient.get(`/api/user-device/list?user_id=${encodeURIComponent(userId)}`)
    );
  }
}
