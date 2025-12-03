import server from "../config";

interface logoutAdminOrUserProps {
    logoutURL: string,
}

const logoutAdminOrUser = async (props: logoutAdminOrUserProps) => {
    const response = await server.post(props.logoutURL, {}, { withCredentials: true });
    return response.data;
};

export default logoutAdminOrUser;