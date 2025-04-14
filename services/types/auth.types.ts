export interface User {
    name: string;
    email: string;
}

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
