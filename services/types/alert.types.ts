import { FaceDetails } from './face.types';

export interface Alert {
    title: string;
    body: string;
    type: string;
    timestamp: string;
    location: string;
    face_details?: FaceDetails;
    status: 'sent';
}

export interface PushAlertRequest {
    title: string;
    body: string;
    token: string;
    type: string;
    timestamp: string;
    location: string;
    face_details?: FaceDetails;
}

export interface PushAlertResponse {
    alert_id: string;
    alert: Alert;
}

export interface AlertHistory {
    alerts: Record<string, Alert>;
}
