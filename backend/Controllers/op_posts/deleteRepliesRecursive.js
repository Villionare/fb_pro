import repliesModel from "../models/replies.js";

const deleteRepliesRecursive = async (replyIds) => {
    if (!replyIds || replyIds.length === 0) return;

    // Fetch all replies in this level
    const replies = await repliesModel.find({ _id: { $in: replyIds } });

    for (const reply of replies) {
        // If this reply has nested replies, delete them first
        if (reply.replies && reply.replies.length > 0) {
            await deleteRepliesRecursive(reply.replies);
        }

        // Delete this reply itself
        await repliesModel.deleteOne({ _id: reply._id });
    }
};

export default deleteRepliesRecursive;