import server from "../config";

export interface Reply {
    _id: string;
    reply_Id: string;
    username: string;
    textContent: string;
    upVote: number;
    downVote: number;
    thread_id: string;
    to: string;
    replies: string[];  // nested replies (recursive)
    media: string;     // comma-separated media, e.g. "image1, image2"
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
}

interface RepliesResponse {
    replies: Reply[];
}


interface Params {
    replies: string[];
}

const fetchArrayReplies = async ({ replies }: Params) => {
    const res = await server.get<RepliesResponse>('/post/replyReplies', {
        params: { replies }
    });

    return res.data;
};

export default fetchArrayReplies;
