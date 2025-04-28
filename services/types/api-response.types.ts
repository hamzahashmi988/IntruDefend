export interface ApiResponse<T = any> {
    status: 'success' | 'error';
    message: string;
    data: T;
}

export interface ApiError {
    message: string;
    status?: number;
    data?: any;
}

export interface ErrorResponse {
    status: 'error';
    message: string;
    data: Record<string, any>;
}
