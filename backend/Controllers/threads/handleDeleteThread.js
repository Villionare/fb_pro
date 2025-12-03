import op_postModel from "../../Models/content/op_posts.js";
import repliesModel from "../../Models/content/replies.js";
import threadsModel from "../../Models/content/threads.js";

const handleDeleteThread = async (req, res) => {
    //1 - remove all the related replies.
    //2 - remove the op doc.
    //3 - remove the thread doc.
    //4 - remove the thread id from boards

    try {
        const { _id } = req.body;

        const thread = await threadsModel.findById(_id);

        if (!thread) {
            return res.json({
                "message": "thread does not found"
            });
        }

        //now there will be a recursive delete for all the replies.
        const getOP = await op_postModel.findbyId(thread.op_post);
        let next_reply = getOP.replies;

        //there is a deleteRepliesRecursive method for that.
        // while (next_reply) {
        //     const deleteReplies = await repliesModel.findByIdAndDelete()
        // }

        // const deleteOP = await op_postModel.findByIdAndDelete(thread.op_post);
    } catch (error) {
        return res.status(400).json({
            "message": "Internal Server Error!",
            error
        })
    }

}

export default handleDeleteThread