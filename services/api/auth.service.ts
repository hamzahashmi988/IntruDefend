import AsyncStorage from '@react-native-async-storage/async-storage';
import { ApiClient } from './api-client';
import {
    GetMeResponse,
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
} from '../types/api.types';
import { ApiResponse } from '../types/api-response.types';

export class AuthService {
    private static instance: AuthService;
    private apiClient: ApiClient;

    private constructor() {
        this.apiClient = ApiClient.getInstance();
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }
        return AuthService.instance;
    }

    public async register(data: RegisterRequest): Promise<ApiResponse<RegisterResponse>> {
        return this.apiClient.post<RegisterResponse>('/auth/register', data);
    }

    public async login(data: LoginRequest): Promise<ApiResponse<LoginResponse>> {
        const response = await this.apiClient.post<LoginResponse>('/auth/login', data);
        
        if (response.status === 'success') {
            await AsyncStorage.setItem('access_token', response.data.access_token);
        }
        return response;
    }

    public async getCurrentUser(): Promise<ApiResponse<GetMeResponse>> {
        return this.apiClient.get<GetMeResponse>('/auth/me');
    }

    public async logout(): Promise<void> {
        await AsyncStorage.removeItem('access_token');
    }
}
