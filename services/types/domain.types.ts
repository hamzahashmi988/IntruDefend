// User Types
export interface User {
    name: string;
    email: string;
}

// Face Recognition Types
export type Relationship = 'family' | 'friend' | 'employee' | 'neighbor' | 'other';

export interface Face {
    name: string;
    relationship: Relationship;
    is_authorized: boolean;
}

// Alert Types
export interface Alert {
    title: string;
    body: string;
    type: string;
    timestamp: string;
    location: string;
    face_details?: Face;
    status: 'sent' | 'delivered' | 'read';
}

// Vehicle Types
export interface Location {
    latitude: number;
    longitude: number;
}

export interface VehicleStatus {
    locked: boolean;
    alarm_active: boolean;
    location: Location;
    last_updated: string;
    battery_level: number;
    temperature: number;
}

export interface LocationHistory {
    location: Location;
    timestamp: string;
}
