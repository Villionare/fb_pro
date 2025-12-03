import boardCategoryModel from "../../Models/content/boardCategories.js";

const handleDeleteBoardCategories = async (req, res) => {
    try {

        const { _id } = req.body;

        const deleteBoard = await boardCategoryModel.findByIdAndDelete(_id);


        if (!deleteBoard) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully", deleteBoard });

    } catch (error) {
        res.json({
            "message": "Server error! failed deleting category",
            error
        })
    }
}

export default handleDeleteBoardCategories