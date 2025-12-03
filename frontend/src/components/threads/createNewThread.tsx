import React, { useState } from "react";
import handleCreateNewThread from "../../api/services/ createThread(OP)";
import useSessionContext from "../../context/useContext";
import { toast, ToastContainer } from "react-toastify";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Spinner from "../others/spinner";

interface CreateThreadDialogProps {
    setShowNewThreadBox: (value: boolean) => void;
    selectedBoardName: string | null
    board_slug: string
}

const CreateNewThread: React.FC<CreateThreadDialogProps> = ({ setShowNewThreadBox, selectedBoardName, board_slug }) => {

    const { user } = useSessionContext();
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const queryClient = useQueryClient();

    const NewThreadMutation = useMutation({
        mutationKey: ["NewThreadCreation"],
        mutationFn: () => handleCreateNewThread({
            title,
            board_slug,
            textContent: content,
            media: "tempImage, tempImage2",
            username: user?.session_data.username
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["fetchThreads"] });
            queryClient.invalidateQueries({ queryKey: ["headerData"] });
            toast("Thead has been created");
            setShowNewThreadBox(false);
            setTitle("");
            setContent("");
        },
        onError: (data) => console.log(data)
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">

            <div className="bg-black border-1 border-red-600 text-white p-6">
                {/* header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl">Create New Thread</h2>
                    <button
                        onClick={() => setShowNewThreadBox(false)}
                        className="text-white text-xl px-2 bg-red-600 cursor-pointer">X</button>
                </div>

                <p>
                    Board: {selectedBoardName}
                </p>

                {/* Input */}
                <input
                    type="text"
                    placeholder="Enter thread title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full border border-gray-300  px-3 py-2 mb-3 focus:outline-none focus:ring-2 focus:ring-black"
                />

                {/* Content Input */}
                <textarea
                    placeholder="Enter text content..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={5}
                    className="w-full border border-gray-300  px-3 py-2 mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-black"
                ></textarea>

                {/* Create Button */}
                <button
                    onClick={() => NewThreadMutation.mutate()}
                    className="w-full bg-gray-800 text-white py-2 cursor-pointer">
                    {NewThreadMutation.isPending ? <Spinner /> : "Create"}
                </button>
            </div>

            <ToastContainer position="bottom-right"
                autoClose={5000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light" />
        </div>
    );
};

export default CreateNewThread;
