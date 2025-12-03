import type { PostResponse } from "../../Types/opPostResponce";
import server from "../config"

export interface ReplyData {
    _id: string;
    reply_Id: string;
    username: string;
    textContent: string;
    upVote: number;
    downVote: number;
    thread_id: string;
    to: string;
    replies: string[];     // array of ObjectId strings
    media?: string;        // optional, can be null/missing
    createdAt: string;     // ISO date string
    updatedAt: string;     // ISO date string
    __v: number;
}

export interface RepliesData {
    repliesArray: ReplyData[]; // the actual reply to render
}

const fetchReplies = async (opData: PostResponse | null) => {

    if (!opData) return;
    const { post } = opData;
    const { _id } = post;
    const res = await server.get<RepliesData>('post/replies', { params: { _id } })
    return res.data;
}

export default fetchReplies;