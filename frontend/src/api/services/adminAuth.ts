import type { AuthResponse } from "../../Types/authResponce";
import server from "../config";
// import logoutAdminOrUser from "./logout";

export interface SignUp {
    signUpName: string,
    signUpAge: string,
    signUpUsername: string,
    signUpEmail: string,
    signUptypePassword: string
}

export interface Login {
    loginIdentifier: string,
    loginPassword: string
}

interface AdminAuthProps {
    fetchUrl: string,
    sending_data: SignUp | Login,
}

const AdminAuth = async (props: AdminAuthProps) => {
    //this function is if the user has previosly logged in as anonymous, anonymous acc.
    //will be logged out.
    // await logoutAdminOrUser({ logoutURL: '/anonymous/anon_logout' });
    const responce = await server.post<AuthResponse>(props.fetchUrl, props.sending_data);
    return responce.data;
}

export default AdminAuth;