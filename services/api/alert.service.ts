import { ApiClient } from './api-client';
import {
    AlertHistoryResponse,
    PushAlertRequest,
    PushAlertResponse,
} from '../types/api.types';
import { ApiResponse } from '../types/api-response.types';

export class AlertService {
    private static instance: AlertService;
    private apiClient: ApiClient;

    private constructor() {
        this.apiClient = ApiClient.getInstance();
    }

    public static getInstance(): AlertService {
        if (!AlertService.instance) {
            AlertService.instance = new AlertService();
        }
        return AlertService.instance;
    }

    public async pushAlert(data: PushAlertRequest): Promise<ApiResponse<PushAlertResponse>> {
        return this.apiClient.post<PushAlertResponse>('/alerts/push', data);
    }

    public async getAlertHistory(): Promise<ApiResponse<AlertHistoryResponse>> {
        return this.apiClient.get<AlertHistoryResponse>('/alerts/history');
    }
}
