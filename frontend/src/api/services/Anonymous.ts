import type { AuthResponse } from "../../Types/authResponce";
import server from "../config";
// import logoutAdminOrUser from "./logout";

const createAnonymousUser = async (username: string) => {
    //this function is if the user has previosly logged in as anonymous, anonymous acc.
    //will be logged out.
    // await logoutAdminOrUser({ logoutURL: '/admin/admin_logout' });
    const responce = await server.post<AuthResponse>('/anonymous/create', { username: username });
    return responce.data;
}

export default createAnonymousUser;
