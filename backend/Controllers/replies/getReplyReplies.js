import repliesModel from "../../Models/content/replies.js";

const getreplyReplies = async (req, res) => {
    try {
        const { replies } = req.query;

        if (!replies) {
            return res.status(400).json({ message: "Missing required field: replies" });
        }

        // Convert query string to array (if needed)
        const replyIds = Array.isArray(replies) ? replies : replies.split(',');

        // Fetch all reply documents
        const replyDocs = await repliesModel.find({ _id: { $in: replyIds } });

        return res.status(200).json({
            replies: replyDocs
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}

export default getreplyReplies;
