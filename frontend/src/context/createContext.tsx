import { createContext, type ReactNode } from "react";
import type { AuthResponse } from "../Types/authResponce";

export interface UserContextProps {
    user: AuthResponse | null;
    login: (value: AuthResponse) => void;
    setUser: (value: AuthResponse | null) => void;
}

export type UserProviderProps = {
    children: ReactNode;
}

const SessionContext = createContext<UserContextProps | null>(null);

export default SessionContext;