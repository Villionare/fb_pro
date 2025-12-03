// ThreadItem.tsx
import Post from '../posts/posts';
import fetchOP from '../../api/services/fetchOp';
import { useQuery } from '@tanstack/react-query';

interface ThreadItemProps {
    op: string,
    threadId: string,
    threadname: string,
    board_slug: string,
    setReplyBtnType: (value: ("" | "replyOP" | "replyREPLY")) => void,
    setShowInputBox: (value: boolean) => void,
    setReplyOPID: (value: string) => void,
    setReplyID: (value: string) => void,
    setSelectedThreadId: (value: string) => void,
}

const ThreadItem: React.FC<ThreadItemProps> = ({ threadId,
    threadname,
    op,
    setReplyBtnType,
    setShowInputBox,
    setReplyOPID,
    setReplyID,
    setSelectedThreadId,
    board_slug
}) => {

    //FOR EVERY POST THREAD ITEM IN THE BOARD, THE RESPECTIVE OP POST WILL BE FETCHED FROM THE SERVER.
    const { data, isSuccess } = useQuery({
        queryKey: ["fetchOP", op],
        queryFn: () => fetchOP({ op })
    });

    return (
        <div className="mb-5 p-3 gap-2 border-b-1 border-b-gray-400 text-white flex flex-col justify-between">
            <div className='flex justify-between'>
                <p className='text-blue-400'>&gt;&gt; {threadname}</p>
                <p className='text-blue-400'>{threadId}</p>
            </div>
            {isSuccess && <Post
                opData={data}
                setReplyBtnType={setReplyBtnType}
                setShowInputBox={setShowInputBox}
                setReplyOPID={setReplyOPID}
                setReplyID={setReplyID}
                setSelectedThreadId={setSelectedThreadId}
                board_slug={board_slug}
            />}
        </div>
    );
};

export default ThreadItem;