import server from "../config";

interface Props {
    username: string | undefined,
    textContent: string,
    media: string,
    title: string,
    board_slug: string
}

const handleCreateNewThread = async (props: Props) => {
    const responce = await server.post(`boards/${props.board_slug}/threads/create_thread`, {
        username: props.username,
        title: props.title,
        textContent: props.textContent,
        media: props.media
    });

    return responce;
}

export default handleCreateNewThread;

//slug: fetch all boards data,
//username: "context storage",
//title : to be entered,
//text content: to be entered,
//media: default.