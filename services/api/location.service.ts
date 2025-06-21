import { ApiClient } from './api-client';
import { ApiResponse } from '../types/api-response.types';
import { LocationHistory } from '../types/domain.types';

export interface GetLocationResponse {
  location: LocationHistory;
}

export class LocationService {
  private static instance: LocationService;
  private apiClient: ApiClient;

  private constructor() {
    this.apiClient = ApiClient.getInstance();
  }

  public static getInstance(): LocationService {
    if (!LocationService.instance) {
      LocationService.instance = new LocationService();
    }
    return LocationService.instance;
  }

  public async getLocation(): Promise<ApiResponse<GetLocationResponse>> {
    return this.apiClient.get<GetLocationResponse>('/vehicle/location');
  }
}
