import boardsItemsModel from '../../Models/content/boards.js';
import threadsModel from '../../Models/content/threads.js';
import op_postModel from '../../Models/content/op_posts.js';
import socketMainServer from '../../sockets/index.js';

const handleCreateThread = async (req, res) => {
    try {
        const { username, textContent, media, title } = req.body;

        if (!username || !textContent || !media || !title) {
            return res.status(400).json({
                "message": "queries are missing"
            });
        }

        const slug = req.params.slug;
        const getBoardWithId = await boardsItemsModel.findOne({ slug });

        if (!getBoardWithId) {
            return res.status(400).json({
                "message": `no board exists with slug ${slug}`
            });
        }

        const getAllPostsNumbers = await op_postModel.countDocuments();
        const newPostNumber = getAllPostsNumbers + 1;

        const createOP_post = await op_postModel.create({
            op_id: `OP_${newPostNumber}`,
            postNumber: newPostNumber,
            username,
            title,
            textContent,
            media,
            board: getBoardWithId._id,
        });

        const getAllThreadsNumbers = await threadsModel.countDocuments();
        const new_thread_id = `TH_${getAllThreadsNumbers + 1}`;

        const createThread = await threadsModel.create({
            thread_id: new_thread_id,
            name: title,
            op_post: createOP_post._id
        });

        await boardsItemsModel.findByIdAndUpdate(
            getBoardWithId._id,
            { $push: { threads: createThread._id } }
        );

        await op_postModel.findByIdAndUpdate(
            createOP_post._id,
            { thread_id: createThread._id }
        );

        //SOCKET EMIT
        const io = socketMainServer();
        io.emit('[NEW]Thread'); //in the frontend i will call the query upon emit is recieved

        res.status(201).json({
            "message": "OP posted successfully and thread initialized",
            "thread_id": createThread._id,
            "OP_id": createOP_post._id,
            "postNumber": newPostNumber
        });

    } catch (error) {
        console.error("Error creating thread:", error);
        res.status(500).json({
            message: "Error creating thread",
            error: error.message
        });
    }
};

export default handleCreateThread;