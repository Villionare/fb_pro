import boardsItemsModel from "../../Models/content/boards.js";

const handleGetAllThreads = async (req, res) => {

    const slug = await req.params.slug;

    const fetchBoard = await boardsItemsModel.find({ slug: slug }).populate('threads');
    const threads = fetchBoard[0].threads;

    if (!fetchBoard) {
        return res.status(404).json({
            message: "No threads found for this board."
        });
    }

    return res.status(200).json({
        "success": true,
        threads
    });
}

export default handleGetAllThreads;