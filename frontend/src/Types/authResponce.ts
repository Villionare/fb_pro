
export interface AuthResponse {
    message: string;
    success: boolean;
    data?: string; // your restWithoutPassword object

    session_data: {
        type: "admin" | "anonymous" | string;
        username: string;
        ip: string;
    };

    session_expiry: string; // ISO string
}