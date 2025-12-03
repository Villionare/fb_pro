import { create } from "zustand";

interface Globals {
    ReplyID: string,
    replyOPID: string,
    selectedThread: string,
    actionText: string,
    placeholder: string,
    replyType: "op" | "reply";
    boardSlug: string,

    setReplyID: (id: string) => void;
    setReplyType: (type: "op" | "reply") => void;
    setBoardSlug: (id: string) => void;
    setReplyOPID: (id: string) => void;
    setInputActionText: (id: string) => void;
    setSelectedThreadId: (id: string) => void;
    setInputPlaceHolderText: (id: string) => void;
}

const GlobalStates = create<Globals>((set) => ({
    ReplyID: "",
    replyOPID: "",
    selectedThread: "",
    actionText: "",
    placeholder: "",
    replyType: "op",
    boardSlug: "",

    setBoardSlug: (type) =>
        set(() => ({ boardSlug: type })),

    setReplyType: (type) =>
        set(() => ({ replyType: type })),

    setInputActionText: (text) =>
        set(() => ({ actionText: text })),

    setInputPlaceHolderText: (text) =>
        set(() => ({ placeholder: text })),

    setReplyID: (id) =>
        set(() => ({ ReplyID: id })),

    setReplyOPID: (id) =>
        set(() => ({ replyOPID: id })),

    setSelectedThreadId: (id) =>
        set(() => ({ selectedThread: id })),
}));

export default GlobalStates;
