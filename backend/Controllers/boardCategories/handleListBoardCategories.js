import boardCategoryModel from "../../Models/content/boardCategories.js"

const handleListBoardCategories = async (req, res) => {

    try {
        const boardCategories = await boardCategoryModel.find();
        res.status(200).json({
            boardCategories
        })

    } catch (e) {
        res.status(500).json({ error: 'Server error' });
    }
}

export default handleListBoardCategories