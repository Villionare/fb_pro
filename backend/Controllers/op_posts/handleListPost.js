import op_postModel from "../../Models/content/op_posts.js";

const handleListPost = async (req, res) => {
    try {
        const { op } = req.query;

        if (!op) {
            return res.status(400).json({
                message: "Missing required fields ⚠️"
            });
        }

        const checkPost = await op_postModel.findById(op);

        if (!checkPost) {
            return res.status(404).json({
                message: "No post exists with this op id ❌"
            });
        }

        // Later you can fetch replies like:
        // const replies = await repliesModel.find({ _id: { $in: op_replies } });

        return res.status(200).json({
            post: checkPost,
        });

    } catch (error) {
        console.error("Error fetching post:", error);
        return res.status(500).json({
            message: "Internal server error 💥",
            error: error.message
        });
    }
}

export default handleListPost;