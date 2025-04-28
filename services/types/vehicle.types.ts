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

export interface UpdateVehicleStatusRequest {
    locked: boolean;
    alarm_active: boolean;
    location: Location;
    battery_level: number;
    temperature: number;
}

export interface UpdateVehicleStatusResponse {
    status: VehicleStatus;
}

export interface UpdateLocationRequest {
    location: Location;
}

export interface LocationHistoryItem {
    location: Location;
    timestamp: string;
}

export interface LocationHistory {
    history: Record<string, LocationHistoryItem>;
}

export interface UpdateLocationResponse {
    location: LocationHistoryItem;
}
