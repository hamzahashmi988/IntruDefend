export type RelationshipType = 'family' | 'friend' | 'employee' | 'neighbor' | 'other';

export interface FaceDetails {
    name: string;
    relationship: RelationshipType;
    is_authorized: boolean;
}

export interface RegisterFaceRequest {
    name: string;
    image: string; // base64 image string
    relationship: RelationshipType;
}

export interface RegisterFaceResponse {
    face: FaceDetails;
}

export interface VerifyFaceRequest {
    image: string; // base64 image string
}

export interface VerifyFaceResponse {
    match: boolean;
    face?: FaceDetails;
}
