// Threads.tsx
import React, { useEffect, useRef, useState } from 'react';
import ThreadItem from './threadItem';
import fetchThreads from '../../api/services/fetchThreads';
import { Maximize, Minimize } from 'lucide-react';
import InputText from '../textInput/input';
import CreateNewThread from './createNewThread';
import type { BoardData } from '../boardCategories/boardCategories';
import { useQuery } from '@tanstack/react-query';

interface Props_threadsFun {
    selectedBoardDetails: BoardData
}

const Threads: React.FC<Props_threadsFun> = ({ selectedBoardDetails }) => {

    //fetcing the thread using the provided slug.
    const { data } = useQuery({
        queryKey: ["fetchThreads", selectedBoardDetails],
        queryFn: () => fetchThreads(selectedBoardDetails.slug)
    });

    const threadsCotainer = useRef<HTMLDivElement>(null);

    const [selectedThreadId, setSelectedThreadId] = useState<string | undefined>();
    const [ReplyID, setReplyID] = useState<string>();
    const [replyOPID, setReplyOPID] = useState<string>();
    const [fullScreen, setFullScreen] = useState<boolean>(false);
    const [showInputBox, setShowInputBox] = useState<boolean>(true); //ok
    const [replyBtnType, setReplyBtnType] = useState<keyof typeof inpVals | "">("");
    const [showNewTheadBox, setShowNewThreadBox] = useState<boolean>(false);

    //thease are the different props acc. to the reply type
    const inpVals = {
        "replyOP": {
            replyOPID,
            typeFor: "op",
            selectedThreadId,
            actionText: "replying to op",
            placeholder: "please enter your reply to the op",
            setShowInputBox
        },
        "replyREPLY": {
            ReplyID,
            typeFor: "reply",
            selectedThreadId,
            actionText: "replying to reply",
            placeholder: "please enter your reply to the reply",
            setShowInputBox
        }
    }


    //full screen handling
    useEffect(() => {
        const handleFullscreenChange = () => {
            setFullScreen(!!document.fullscreenElement);
        };

        const handleKeyDown = async (event: KeyboardEvent) => {
            if (!threadsCotainer.current) return;

            if (event.key.toLowerCase() === "f") {
                if (!document.fullscreenElement) {
                    try {
                        await threadsCotainer.current.requestFullscreen();
                    } catch (err) {
                        console.error("Error entering fullscreen:", err);
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        document.addEventListener("fullscreenchange", handleFullscreenChange);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    const false_fullscreen = "scrollbar-hide border-t-2 border-gray-900 max-h-screen overflow-y-scroll bg-black scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200";
    const true_fullscreen = "scrollbar-hide bg-black overflow-y-scroll z-10 scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-gray-200";

    return (
        <div ref={threadsCotainer} className={fullScreen ? true_fullscreen : false_fullscreen}>

            <div className='sticky p-2 top-0 left-0 right-0 bg-black text-white border-b-1 border-gray-900'>

                <div className="flex">

                    <div className='flex-1 flex items-center justify-start'>
                        <button className='bg-red-600 p-1 ml-2 cursor-pointer' onClick={() => {
                            setShowNewThreadBox(true)
                        }}>
                            Create new Thread
                        </button>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                        <h2 className=" text-red-600 text-3xl font-bold">({selectedBoardDetails.slug}):Threads</h2>
                    </div>

                    <div className='flex-1 text-white flex items-center justify-end gap-4'>
                        <span className='text-red-600 italic'>F - for fullscreen | Esc for Exit</span>
                        {fullScreen ?
                            <Minimize className="w-5 h-5 mr-2" /> :
                            <Maximize className="w-5 h-5 mr-2" />}
                    </div>

                </div>
            </div>

            {/* main content */}
            <div className="space-y-2 mx-15" >
                {
                    data?.threads && data.threads.length > 0 ? (
                        [...data.threads].reverse().map(thread => (
                            <ThreadItem
                                key={thread._id}
                                threadId={thread.thread_id}
                                threadname={thread.name}
                                op={thread.op_post}
                                setReplyBtnType={setReplyBtnType}
                                setShowInputBox={setShowInputBox}
                                setReplyOPID={setReplyOPID}
                                setReplyID={setReplyID}
                                setSelectedThreadId={setSelectedThreadId}
                                board_slug={selectedBoardDetails.slug}
                            />
                        ))
                    ) : (<div className='text-white'><p>No threads exist</p></div>)}
            </div >

            {showNewTheadBox && <CreateNewThread
                setShowNewThreadBox={setShowNewThreadBox}
                selectedBoardName={selectedBoardDetails.name}
                board_slug={selectedBoardDetails.slug} />}

            {/* input section */}
            {/* this input type will carry the onSubmit function that will be triggerd + needed texts */}
            {showInputBox && replyBtnType ? <InputText {...inpVals[replyBtnType]} /> : null}
        </div >
    );
};

export default Threads;

