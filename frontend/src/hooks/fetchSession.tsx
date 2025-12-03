import { useEffect } from "react";
import server from "../api/config.js";
import axios from "axios";

interface SessionData {
    message: string;
    success?: boolean;
    data?: {
        name: string,
        username: string,
        age: number,
        email: string,
    },
    session_data?: {
        ip: string,
        username: string,
        type: string,
    }
}

type LoginFunction = (session: SessionData | null) => void;

const useFetchSession = (login: LoginFunction) => {

    useEffect(() => {
        if (!login) return;

        // Define the checkSession function inside the effect for cleaner dependency tracking
        const checkSession = async () => {
            try {
                const resp = await server.get<SessionData>('/me', { withCredentials: true });
                login(resp.data);

            } catch (error) {

                if (axios.isAxiosError(error) && error.response) { //this is for the http error
                    console.warn(`Server responded with status ${error.response.status}. Logging out user.`);
                    login(null);
                } else {
                    //and this is the catch block error
                    console.error('Failed to fetch session (Network/Unknown Error):', error);
                    login(null);
                }
            }
        };

        const int = setInterval(() => {
            checkSession();
        }, 1000);

        // initial check (runs once on mount)
        checkSession();

        return () => clearInterval(int);
    }, [login]);

    return null;
}

export default useFetchSession;
