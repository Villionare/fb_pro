import type { THREAD_RESPONSE } from "../../Types/threads";
import server from "../config";

// export interface Post {
//     _id: string;
//     op_id: string;
//     username: string;
//     title: string;
//     textContent: string;
//     media: string;
//     upVote: number;
//     downVote: number;
//     replies: string[];          // or replace `any` with a Reply interface
//     board: string;
//     createdAt: string;        // ISO date string
//     updatedAt: string;        // ISO date string
//     __v: number;
//     thread_id: string;
// }

// export interface PostResponse {
//     post: Post;
// }

const fetchThreads = async (board_slug: string) => {

    const fetched_threads = await server.get<THREAD_RESPONSE>(`/boards/${board_slug}/threads`);
    return fetched_threads.data;
}

export default fetchThreads;