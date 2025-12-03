import fetchReplies from '../../api/services/fetchReplies';
import type { PostResponse } from '../../Types/opPostResponce';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import Replies from '../replies/replies';
import { useQuery } from '@tanstack/react-query';
import GlobalStates from '../../states/Globals';
import { useState } from 'react';

interface Props {
    opData: PostResponse,
    board_slug: string,
    setReplyBtnType: (value: ("" | "replyOP" | "replyREPLY")) => void,
    setShowInputBox: (value: boolean) => void,
    setReplyOPID: (value: string) => void
    setReplyID: (value: string) => void
    setSelectedThreadId: (value: string) => void
}

const Post: React.FC<Props> = ({
    opData,
    board_slug,
    setReplyID,
    setReplyBtnType,
    setShowInputBox }) => {

    const [showReplies, setShowReplies] = useState(false);

    //TAKING THREAD ID AND SENDING TO GLOBALCONTEXT
    const setThreadId = GlobalStates((state) => state.setSelectedThreadId);

    //TAKING THREAD ID AND SENDING TO GLOBALCONTEXT
    const setReplyOPID = GlobalStates((state) => state.setReplyOPID);

    //SETTING THE INPUT BOX VALUES GLOBALLY
    const setInputActionText = GlobalStates((state) => state.setInputActionText);
    const setInputPlaceHolderText = GlobalStates((state) => state.setInputPlaceHolderText);
    const setReplyType = GlobalStates((state) => state.setReplyType);
    const setBoardSlug = GlobalStates((state) => state.setBoardSlug);

    //HERE FETCHING ALL THE REPLIES:
    const { data } = useQuery({
        queryKey: ["fetchReplies", opData],
        queryFn: () => fetchReplies(opData)
    });

    const opBtnAction = () => {
        setReplyType("op");
        setShowInputBox(true);
        setReplyBtnType("replyOP");
        setReplyOPID(opData.post._id);
        setThreadId(opData.post.thread_id);
        setInputActionText("replying to op");
        setBoardSlug(board_slug);
        setInputPlaceHolderText("please enter your reply to the op");
    };

    return (
        <div>
            <div className="space-y-2">
                {opData ?
                    <div className="text-white flex flex-col gap-2">
                        <div className='flex flex-row justify-between'>

                            <div className='flex gap-2'>
                                <span className="font-bold text-green-400">[OP]</span>
                                <p className='text-yellow-400'>@{opData.post.username}</p>
                                <span className='text-white'>({new Date(opData.post.createdAt).toLocaleString()})</span>
                            </div>
                            <div>
                                <p className='text-green-400'>{opData.post.op_id}</p>
                            </div>

                        </div>

                        <div className='flex flex-col gap-5'>
                            <p className='text-amber-200'>{opData.post.textContent}</p>

                            <div className='flex justify-between'>
                                <div className="flex gap-3 items-center">
                                    <div className="flex gap-1 items-center">
                                        <p>{opData.post.upVote}</p>
                                        <button className='pb-3 cursor-pointer'>
                                            <ThumbsUp />
                                        </button>
                                    </div>
                                    <div className="flex gap-1 items-center">
                                        <p>{opData.post.downVote}</p>
                                        <button className='cursor-pointer'>
                                            <ThumbsDown />
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <button className='cursor-pointer text-cyan-500' onClick={opBtnAction}>
                                        [REPLY]
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* REPLIES SECTION */}
                        <button className='text-green-500 cursor-pointer border-1 border-gray-400 p-1 w-fit'
                            onClick={() => setShowReplies((prev) => !prev)}>
                            {showReplies ? "Close[X]" :
                                `Show Replies: ${data?.repliesArray.length}`}
                        </button>
                        <div className="flex gap-2">

                            <div className='flex flex-col'>
                                {showReplies && data?.repliesArray && data.repliesArray.length > 0
                                    ? data.repliesArray.map((v, i) => (

                                        <Replies
                                            replyDocId={v._id}
                                            opData={opData}
                                            key={i}
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
                                    )) : null
                                }
                            </div>
                        </div>
                    </div>
                    :
                    <p className="text-slate-400">Loading...</p>}
            </div>
        </div >
    );
};

export default Post;