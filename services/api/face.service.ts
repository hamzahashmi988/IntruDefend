import { ApiClient } from './api-client';
import {
    RegisterFaceRequest,
    RegisterFaceResponse,
    VerifyFaceRequest,
    VerifyFaceResponse,
    ListFacesResponse
} from '../types/api.types';
import { ApiResponse } from '../types/api-response.types';

export class FaceService {
    private static instance: FaceService;
    private apiClient: ApiClient;

    private constructor() {
        this.apiClient = ApiClient.getInstance();
    }

    public static getInstance(): FaceService {
        if (!FaceService.instance) {
            FaceService.instance = new FaceService();
        }
        return FaceService.instance;
    }

    public async registerFace(data: RegisterFaceRequest): Promise<ApiResponse<RegisterFaceResponse>> {
        return this.apiClient.post<RegisterFaceResponse>('/faces/register', data);
    }

    public async verifyFace(data: VerifyFaceRequest): Promise<ApiResponse<VerifyFaceResponse>> {
        return this.apiClient.post<VerifyFaceResponse>('/faces/verify', data);
    }

    public async listFaces(): Promise<ApiResponse<ListFacesResponse>> {
        return this.apiClient.get<ListFacesResponse>('/faces/list');
    }
}
