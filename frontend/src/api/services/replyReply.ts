import GlobalStates from "../../states/Globals";
import server from "../config";

interface Props {
    username: string,
    textContent: string,
}

// const replyId = GlobalStates((state) => state.ReplyID);
// const thread = GlobalStates((state) => state.selectedThread);

const replyToReply = async (props: Props) => {

    const { ReplyID, selectedThread, boardSlug } = GlobalStates.getState();

    const responce = await server.post(`boards/${boardSlug}/threads/${selectedThread}/replytoreply`, {
        username: props.username,
        textContent: props.textContent,
        media: "image1, image2",
        to: ReplyID
    });

    return responce;
};

export default replyToReply;