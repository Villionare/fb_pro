import op_postModel from "../../../Models/content/op_posts.js";

const handleCreateOP = async (username, textContent, media, title, getBoardWithId) => {
    try {
        //getting the number of posts to generate a new post ID
        const getAllPostsNumbers = await op_postModel.countDocuments();
        const new_OP_post_id = `OP_${getAllPostsNumbers + 1}`;

        const createOP_post = await op_postModel.create({
            op_id: new_OP_post_id,
            username,
            title,
            textContent,
            media,
            board: getBoardWithId._id, //the board to which the post belongs to.
        });

        createOP_post.save();
        return createOP_post;
    } catch (error) {
        return { message: "Error creating post", error: error.message };
    }
}

export default handleCreateOP;

//co/thread/150978801