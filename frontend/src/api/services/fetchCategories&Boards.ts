import type { HomeDataMain } from "../../Types/apiBoardCategories";
import server from "../config";

const fetchBoardsAndCategories = async () => {
    const response = await server.get<HomeDataMain>('/data');
    return response.data;
}

export default fetchBoardsAndCategories;