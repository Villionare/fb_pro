import repliesModel from "../../Models/content/replies.js";
import threadsModel from "../../Models/content/threads.js";
import socketMainServer from "../../sockets/index.js";

//if the reply is made to am reply:
//create a REPLY DOC.
//PUSH the new reply doc id to TARGET REPLY DOC.

const handleReplyToReply = async (req, res) => {

    try {

        //we are using the thread_id e.g. TH_4
        const { username, textContent, to, media } = req.body;
        const thread_id = req.params.thread_id;

        if (!thread_id) {
            return res.status(400).json({
                success: false,
                message: "Thread ID is required"
            });
        }

        const get_Thread_ObjId = await threadsModel.findById(thread_id);

        if (!get_Thread_ObjId) {
            return res.status(400).json({
                message: `thread with this thread_id: ${thread_id} not found`
            });
        }

        if (!username || !to || !textContent || !media) {
            return res.status(400).json({
                success: false,
                message: "Missing required fields"
            });
        }

        //create reply number
        const replyNumber = await repliesModel.countDocuments();
        const reply_Id = `REP_${replyNumber + 1}`;

        // creating the reply
        const newReply = await repliesModel.create({
            reply_Id,
            username,
            textContent,
            to,
            media,
            thread_id: get_Thread_ObjId._id,
        });

        const gettingTO_reply = await repliesModel.findById(to);

        if (!gettingTO_reply) {
            return res.status(400).json({
                success: false,
                message: "The Reply you are replying to, does not exist!"
            });
        }

        gettingTO_reply.replies.push(newReply._id);
        await gettingTO_reply.save();

        //SOCKET EMIT
        const io = socketMainServer();
        io.emit('[NEW]ReplytoREPLY'); //in the frontend i will call the query upon emit is recieved

        return res.status(200).json({
            success: true,
            message: "Reply made successfully to Reply",
            newReply
        });

    } catch (error) {
        console.error("Error replying to OP post:", error);
        return res.status(500).json({
            success: false,
            error,
            message: "Internal server error"
        });
    }
}

export default handleReplyToReply;