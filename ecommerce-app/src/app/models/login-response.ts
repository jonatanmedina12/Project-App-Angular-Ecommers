export interface LoginResponse {

    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
    role: string;
    message?: string;
}
