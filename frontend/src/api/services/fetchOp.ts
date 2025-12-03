import type { PostResponse } from "../../Types/opPostResponce.ts";
import server from "../config.tsx";

interface Params {
  op: string;
}

const fetchOP = async ({ op }: Params) => {
  const response = await server.get<PostResponse>('/post', { params: { op } });
  return response.data;
};

export default fetchOP;