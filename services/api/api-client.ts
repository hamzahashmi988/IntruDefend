import axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { router } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { ApiError, ApiResponse, ErrorResponse } from '../types/api-response.types';
import { store } from '../../store';
import { clearAuthData } from '../../store/slices/auth.slice';

const API_URL = process.env.API_URL || 'https://a022-39-51-124-71.ngrok-free.app/';
const API_TIMEOUT = Number(process.env.API_TIMEOUT) || 300000;

export class ApiClient {
    private static instance: ApiClient;
    private api: AxiosInstance;

    private constructor() {
        this.api = axios.create({
            baseURL: API_URL,
            timeout: API_TIMEOUT,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        this.setupInterceptors();
    }

    public static getInstance(): ApiClient {
        if (!ApiClient.instance) {
            ApiClient.instance = new ApiClient();
        }
        return ApiClient.instance;
    }

    private setupInterceptors(): void {
        // Request interceptor
        this.api.interceptors.request.use(
            async (config) => {
                const token = await AsyncStorage.getItem('access_token');
                if (token && config.headers) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        // Response interceptor
        this.api.interceptors.response.use(
            (response) => response,
            async (error: AxiosError<ErrorResponse>) => {
                if (error.response?.status === 401) {
                    // Clear token from storage
                    await AsyncStorage.removeItem('access_token');
                    
                    // Clear auth state from Redux
                    store.dispatch(clearAuthData());
                    
                    // Force navigation to sign-in
                    router.replace('/(auth)/sign-in');
                    return Promise.reject(error);
                }

                const errorMessage = error.response?.data?.message || error.message;
                Alert.alert('Error', errorMessage);

                return Promise.reject({
                    message: errorMessage,
                    status: error.response?.status,
                    data: error.response?.data
                } as ApiError);
            }
        );
    }

    public async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.api.get<ApiResponse<T>>(url, config);
        return response.data;
    }

    public async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.api.post<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    public async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.api.put<ApiResponse<T>>(url, data, config);
        return response.data;
    }

    public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
        const response = await this.api.delete<ApiResponse<T>>(url, config);
        return response.data;
    }
}
