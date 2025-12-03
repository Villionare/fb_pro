import server from "../config";

const fetchData = async (setDBData) => {
    const data = await server.get('/data');
    setDBData(data);
}

export default fetchData;