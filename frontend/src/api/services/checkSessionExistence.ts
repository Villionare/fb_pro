import server from "../config";

interface ResponseType {
    success: boolean;
    message: string;
    session_data?: {
        type: string;
        username: string;
        ip: string;
    };
}

const checkSessionExistence = async (): Promise<boolean> => {
    try {
        const response = await server.get<ResponseType>("/me");

        if (response.data.success) {
            console.log("session exists on server");

            return true;
        } else {
            // localStorage.removeItem('user'); // Only remove user data, not entire localStorage
            return false;
        }
    } catch (error) {
        console.error("Error while checking session:", error);
        // localStorage.removeItem('user'); // Only remove user data on errors too
        return false;
    }
};

export default checkSessionExistence;
