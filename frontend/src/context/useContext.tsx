import { useContext } from "react";
import SessionContext from "./createContext.js";

const useSessionContext = () => {
    const ctx = useContext(SessionContext);
    if (!ctx) {
        throw new Error("useUserContext must be used within a UserProvider");
    }
    return ctx;
}

export default useSessionContext;