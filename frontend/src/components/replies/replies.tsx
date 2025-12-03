import { ThumbsDown, ThumbsUp } from "lucide-react";
import type { PostResponse } from "../../Types/opPostResponce";
import GlobalStates from "../../states/Globals";
import { useQuery } from "@tanstack/react-query";
import fetchArrayReplies from "../../api/services/fetchReplyReplies";
import Spinner from "../others/spinner";

export interface RepliesProps {
    // to: string,
    media?: string,
    upVote: number,
    reply_Id: string,
    username: string,
    downVote: number,
    replies: string[],
    createdAt: string,
    replyDocId: string,
    board_slug: string,
    textContent: string,
    opData: PostResponse,
    setReplyID: (value: string) => void
    setShowInputBox: (value: boolean) => void
    setReplyBtnType: (value: ("" | "replyOP" | "replyREPLY")) => void,

}

const Replies: React.FC<RepliesProps> = ({
    media,
    opData,
    upVote,
    replies,
    username,
    downVote,
    reply_Id,
    createdAt,
    replyDocId,
    textContent,
    board_slug,
    setReplyBtnType,
    setShowInputBox }) => {

    const { data, refetch, isFetching } = useQuery({
        queryKey: ["fetchReplyReplies", replies],
        queryFn: () => fetchArrayReplies({ replies }),
        enabled: false,
    });

    const fetchReplyReplies = () => {
        refetch();
    }

    //TAKING THREAD ID AND SENDING TO GLOBALCONTEXT
    const setThreadId = GlobalStates((state) => state.setSelectedThreadId);

    //SETTING GLOBAL REPLY TO REPLY ID
    const setReplyID = GlobalStates((state) => state.setReplyID);

    //SETTING THE INPUT BOX VALUES GLOBALLY
    const setInputActionText = GlobalStates((state) => state.setInputActionText);
    const setInputPlaceHolderText = GlobalStates((state) => state.setInputPlaceHolderText);
    const setReplyType = GlobalStates((state) => state.setReplyType);
    const setBoardSlug = GlobalStates((state) => state.setBoardSlug);

    const replyBtnAction = () => {
        setReplyType("reply");
        setShowInputBox(true);
        setReplyID(replyDocId)
        setBoardSlug(board_slug);
        setThreadId(opData.post.thread_id)
        setReplyBtnType("replyREPLY");
        setInputActionText("replying to reply");
        setInputPlaceHolderText("please enter your reply to the reply");
    };

    return (
        <div className="ml-5">
            <div className="text-white p-3 border border-gray-600 rounded-lg mb-3 w-full">

                <div className="flex flex-1 justify-between">

                    <div className="flex gap-2 items-center">
                        <div className="text-yellow-500 mb-1">
                            @{username}
                        </div>
                        <div className="text-xs text-gray-500">
                            Posted on: {new Date(createdAt).toLocaleString()}
                        </div>
                    </div>
                    <div className="text-indigo-700">
                        {reply_Id}
                    </div>
                </div>

                <div className="mb-2">
                    {textContent}
                </div>

                {media && (
                    <div className="text-sm text-gray-400 mb-2">
                        Media: {media}
                    </div>
                )}

                <div className="flex justify-between items-center">
                    <div className="flex gap-4 text-sm mb-2">
                        <div className="flex gap-1 items-center">
                            <p>{upVote}</p>
                            <button className='pb-3 cursor-pointer'>
                                <ThumbsUp />
                            </button>
                        </div>
                        <div className="flex gap-1 items-center">
                            <p>{downVote}</p>
                            <button className='cursor-pointer'>
                                <ThumbsDown />
                            </button>
                        </div>
                    </div>
                    <button className="text-red-500 cursor-pointer" onClick={replyBtnAction}>
                        [Reply]
                    </button>
                </div>
                {replies?.length > 0 && (
                    <div className="flex w-full justify-end">
                        <button
                            className="text-green-500 cursor-pointer"
                            onClick={fetchReplyReplies}>
                            {
                                isFetching ?
                                    <Spinner /> :
                                    `Show ${replies.length} replies`
                            }
                        </button>
                    </div>
                )}
            </div>
            <div className="flex flex-col w-full pl-10">

                {
                    data?.replies.map((v, i) => {
                        return (
                            <Replies
                                key={i}
                                replyDocId={v._id}
                                opData={opData}
                                username={v.username}
                                textContent={v.textContent}
                                media={v.media}
                                upVote={v.upVote}
                                downVote={v.downVote}
                                createdAt={v.createdAt}
                                reply_Id={v.reply_Id}
                                setReplyBtnType={setReplyBtnType}
                                setShowInputBox={setShowInputBox}
                                setReplyID={setReplyID}
                                board_slug={board_slug}
                                replies={v.replies}
                            />
                        );
                    })
                }
            </div>
        </div>
    );
};

export default Replies;
