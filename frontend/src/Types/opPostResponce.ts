export interface PostResponse {
    post: {
        _id: string;
        op_id: string;
        username: string;
        title: string;
        textContent: string;
        media: string;
        upVote: number;
        downVote: number;
        replies: string[];     // Array of reply IDs
        board: string;
        postNumber: number;
        createdAt: string;     // ISO date string
        updatedAt: string;     // ISO date string
        __v: number;
        thread_id: string;
    }
}