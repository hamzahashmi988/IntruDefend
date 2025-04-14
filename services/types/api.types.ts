import { Alert, Face, Location, LocationHistory, User, VehicleStatus } from './domain.types';

// Auth Types
export interface RegisterRequest {
    name: string;
    email: string;
    password: string;
}

export interface RegisterResponse {
    user: User;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    user: User;
}

export interface GetMeResponse {
    user: User;
}

// Face Recognition Types
export interface RegisterFaceRequest {
    name: string;
    image: string;
    relationship: string;
}

export interface RegisterFaceResponse {
    face: Face;
}

export interface VerifyFaceRequest {
    image: string;
}

export interface VerifyFaceResponse {
    match: boolean;
    face?: Face;
}

// Alert Types
export interface PushAlertRequest {
    title: string;
    body: string;
    token: string;
    type: string;
    timestamp: string;
    location: string;
    face_details?: Face;
}

export interface PushAlertResponse {
    alert_id: string;
    alert: Alert;
}

export interface AlertHistoryResponse {
    alerts: Record<string, Alert>;
}

// Vehicle Types
export interface VehicleStatusResponse {
    status: VehicleStatus;
}

export interface UpdateVehicleStatusRequest {
    locked: boolean;
    alarm_active: boolean;
    location: Location;
    battery_level: number;
    temperature: number;
}

export interface LocationHistoryResponse {
    history: Record<string, LocationHistory>;
}

export interface UpdateLocationRequest {
    location: Location;
}

export interface UpdateLocationResponse {
    location: LocationHistory;
}
