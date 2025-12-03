export interface API_BULK_DATA {
    boardCategories: {
        name: string,
        boards: object,
        maxNumber: number
    }
}

interface THREAD {
  _id: string;
  thread_id: string;
  name: string;
  op_post: string;
  replies: string[];
  __v: number;
}

export interface THREAD_RESPONSE {
    success: boolean,
    threads: THREAD[]
}