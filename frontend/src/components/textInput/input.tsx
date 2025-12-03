import React, { useRef, useState } from 'react';
import useSessionContext from '../../context/useContext';
import GlobalStates from '../../states/Globals';
import replyToReply from '../../api/services/replyReply';
import replyToOP from '../../api/services/replyOP';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Spinner from '../others/spinner';

interface Props {
    setShowInputBox: (value: boolean) => void,
}

const InputText: React.FC<Props> = ({ setShowInputBox }) => {

    const [replyText, setReplyText] = useState<string>("");

    const textAreaRef = useRef<HTMLTextAreaElement | null>(null);
    const { user } = useSessionContext();

    const actionText = GlobalStates((state) => state.actionText);
    const placeholder = GlobalStates((state) => state.placeholder);
    const replyType = GlobalStates((state) => state.replyType);

    const queryClient = useQueryClient();

    const replyingOP = useMutation({

        mutationKey: ["postReplytoOP"],

        mutationFn: () => replyToOP({
            username: user?.session_data?.username ?? "",
            textContent: replyText,
        }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["fetchThreads"] });
            queryClient.invalidateQueries({ queryKey: ["fetchReplies"] });
            queryClient.invalidateQueries({ queryKey: ["headerData"] });
            queryClient.invalidateQueries({ queryKey: ["fetchReplyReplies"] });
            console.log(data);
        },
        onError: (data) => console.log(data)
    });

    const replyingReply = useMutation({

        mutationKey: ["postReplytoReply"],

        mutationFn: () => replyToReply({
            username: user?.session_data?.username ?? "",
            textContent: replyText,
        }),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["fetchThreads"] });
            queryClient.invalidateQueries({ queryKey: ["fetchReplies"] });
            console.log(data);
        },
        onError: (data) => console.log(data)
    });


    const submitDataAndPOST = async () => {

        if (replyType === "reply") {

            replyingReply.mutate();

        } else if (replyType === "op") {

            replyingOP.mutate()

        } else {
            console.warn("replyType invalid:", replyType);
        }

    }

    //text area height will increase accordingly
    const handleTextAreaInput = () => {
        const element = textAreaRef.current;
        if (!element) return;

        element.style.height = "auto";
        element.style.height = element.scrollHeight + "px";
    }

    return (
        <div className="sticky px-2 py-2 bottom-0 left-0 right-0 bg-black border-t-1 border-gray-900">

            <div className='flex gap-2'>
                <div>
                    <button className='text-white bg-red-600 px-5 cursor-pointer h-full'
                        onClick={() => {
                            setShowInputBox(false);
                        }}>
                        X
                    </button>
                </div>

                <div className='w-fit p-2 ml-2 border-1 border-gray-900'>
                    <label className='text-white' htmlFor="chooseAction">Action:</label>
                    <span className='text-white'>{actionText}</span>
                </div>

                <form onSubmit={(e) => {
                    e?.preventDefault();
                    submitDataAndPOST();
                }}
                    className='w-full h-full flex gap-2 '>
                    <textarea
                        value={replyText}
                        onChange={(e) => {
                            setReplyText(e.target.value);
                            handleTextAreaInput();
                        }}
                        placeholder={placeholder}
                        ref={textAreaRef}
                        className="border-1 border-gray-900 bg-black text-white focus:outline-0 w-full p-2 resize-none overflow-hidden"
                    />


                    <button type="submit"
                        className='border border-gray-900 w-[10vw] text-red-600 bg-black text-3xl cursor-pointer hover:bg-gray-900'>
                        {replyingOP.isPending || replyingReply.isPending ? <Spinner /> : "POST!"}

                    </button>
                </form>
            </div>
        </div >
    );
};

export default InputText;