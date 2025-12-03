import op_postModel from "../../Models/content/op_posts.js";
import repliesModel from "../../Models/content/replies.js";
import threadsModel from "../../Models/content/threads.js";
import socketMainServer from "../../sockets/index.js";

//if the reply is made to am op:
//create a REPLY DOC.
//PUSH the reply doc id to OP DOC
//PUSH reply doc id to THREADS DOC.

const handleReplyOP = async (req, res) => {

    try {

        const { username, textContent, to, media } = req.body;
        const thread_id = req.params.thread_id;

        if (!thread_id) {
            return res.status(400).json({ message: "Thread ID is required" });
        }

        const get_Thread_ObjId = await threadsModel.findById(thread_id);

        if (!get_Thread_ObjId) {
            return res.status(400).json({
                message: `thread with this thread_id: ${thread_id} not found`
            });
        }

        if (!username || !to || !textContent || !media) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        //create reply ID
        const replyNumber = await repliesModel.countDocuments();
        const reply_Id = `REP_${replyNumber + 1}`;

        //creating the reply
        const newReply = await repliesModel.create({
            reply_Id,
            username,
            textContent,
            to,
            media,
            thread_id: get_Thread_ObjId._id,
        });

        //linking the reply to the original post
        const gettingTO_op = await op_postModel.findById(to);

        if (!gettingTO_op) {
            res.status(400).json({
                message: "cannot find the op the reply is made to",
                success: false
            })
        };

        get_Thread_ObjId.replies.push(newReply._id);
        gettingTO_op.replies.push(newReply._id);

        await gettingTO_op.save();
        await get_Thread_ObjId.save();

        //SOCKET EMIT
        const io = socketMainServer();
        io.emit('[NEW]ReplytoOP'); //in the frontend i will call the query upon emit is recieved

        return res.json({
            message: "Reply made successfully to OP",
            success: true,
            newReply
        });

    } catch (error) {
        console.error("Error replying to OP post:", error);
        return res.status(500).json({
            message: "Internal server error",
            error,
            success: false
        });
    }
}

export default handleReplyOP;