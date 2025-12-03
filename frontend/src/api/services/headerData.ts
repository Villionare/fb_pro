import type { Homedata } from "../../Types/Homedata";
import server from "../config";

const fetchHeaderData = async () => {
    const ip = await server.get<Homedata>('/home_data');
    return ip.data;
}

export default fetchHeaderData;