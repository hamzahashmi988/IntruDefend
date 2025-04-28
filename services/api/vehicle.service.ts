import { ApiClient } from './api-client';
import {
    VehicleStatusResponse,
    UpdateVehicleStatusRequest,
    UpdateLocationRequest,
    LocationHistoryResponse,
    UpdateLocationResponse,
} from '../types/api.types';
import { ApiResponse } from '../types/api-response.types';

export class VehicleService {
    private static instance: VehicleService;
    private apiClient: ApiClient;

    private constructor() {
        this.apiClient = ApiClient.getInstance();
    }

    public static getInstance(): VehicleService {
        if (!VehicleService.instance) {
            VehicleService.instance = new VehicleService();
        }
        return VehicleService.instance;
    }

    public async getVehicleStatus(): Promise<ApiResponse<VehicleStatusResponse>> {
        return this.apiClient.get<VehicleStatusResponse>('/vehicle/status');
    }

    public async updateVehicleStatus(data: UpdateVehicleStatusRequest): Promise<ApiResponse<VehicleStatusResponse>> {
        return this.apiClient.post<VehicleStatusResponse>('/vehicle/status', data);
    }

    public async getLocationHistory(): Promise<ApiResponse<LocationHistoryResponse>> {
        return this.apiClient.get<LocationHistoryResponse>('/vehicle/location/history');
    }

    public async updateLocation(data: UpdateLocationRequest): Promise<ApiResponse<UpdateLocationResponse>> {
        return this.apiClient.post<UpdateLocationResponse>('/vehicle/location', data);
    }
}
