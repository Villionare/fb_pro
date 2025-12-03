import { useEffect, useState } from "react";
import SessionContext, { type UserProviderProps } from "./createContext.js";
import type { AuthResponse } from "../Types/authResponce.js";

export const SessionProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [user, setUser] = useState<AuthResponse | null>(null);

    const login = (userReceived: AuthResponse) => {
        setUser(userReceived);
        localStorage.setItem("user", JSON.stringify(userReceived));
    };

    //retrive from local storage
    useEffect(() => {
        const userString = localStorage.getItem("user");
        // console.log('retrieved from the local storage: ' + JSON.parse(userString));

        if (userString) {
            try {
                const parsedUser = JSON.parse(userString);
                setUser(parsedUser);
            } catch (error) {
                console.error("Error parsing user data from localStorage:", error);
            }
        }
    }, [])

    return (
        <SessionContext.Provider value={{ user, login, setUser }}>
            {children}
        </SessionContext.Provider>
    );
};

// //THIS METHOD IS EFFECTIVE OF SENDING THE COOKIES ON EVERY REQUEST AND MIDDLEWARES WILL VERIFY THAT REQUEST EVERYTIME THEN ONLY WILL
// // SEND SOME RESPONCE AND IF THE SESSION IS DEAD IT WILL THROW AND ERROR, THIS WAY THERE IS NO NEED TO MAKE AUTO CALLS.

// // app starts

// //when the user signin or signup - save into context - set the local storage - start the auto calls

// //when there is a reload - retrive from the local storage - set into context - start the auto calls

// //a one type of logged in user tries to enter through different user type
// // - clear local storage
// // - clear old session on server
// // - create the new user user and session
// // - start the noraml user process again

// // if the user have logged out - set context to null - clear the local storage - stop the auto calls
export default SessionProvider;