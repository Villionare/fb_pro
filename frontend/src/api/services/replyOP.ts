import GlobalStates from "../../states/Globals";
import server from "../config";

interface Props {
    username: string,
    textContent: string,
}

// const opid = GlobalStates((state) => state.replyOPID);
// const thread = GlobalStates((state) => state.selectedThread);


const replyToOP = async (props: Props) => {

    const { replyOPID, selectedThread, boardSlug } = GlobalStates.getState();

    const responce = await server.post(`boards/${boardSlug}/threads/${selectedThread}/replytoop`, {
        username: props.username,
        textContent: props.textContent,
        media: "image1, image2",
        to: replyOPID
    });

    return responce;
};

export default replyToOP;