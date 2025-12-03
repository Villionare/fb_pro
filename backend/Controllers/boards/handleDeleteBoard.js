import boardCategoryModel from "../../Models/content/boardCategories.js";
import boardsItemsModel from "../../Models/content/boards.js";

const handleDeleteBoard = async (req, res) => {

    try {
        const { board_id } = req.body;

        if (!board_id) {
            return res.status(400).json({ "message": "Board ID is required" });
        }

        //finding the board to be deleted
        const boardToDelete = await boardsItemsModel.findOne({ board_id });

        if (!boardToDelete) {
            return res.status(404).json({ "message": "Board not found" });
        }

        //deleting the board
        await boardsItemsModel.deleteOne({ board_id });

        //also removing the board from its category's boards array
        const boardCategoryDoc = await boardCategoryModel.findOne({ name: boardToDelete.board_category.name });
        if (boardCategoryDoc) {
            boardCategoryDoc.boards = boardCategoryDoc.boards.filter(boardId => !boardId.equals(boardToDelete._id));
            await boardCategoryDoc.save();
        }

        console.log(`board has been deleted by the admin ${req.session.user.username}: `, boardToDelete);

        res.status(200).json({ "message": "Board deleted successfully" });

    } catch (error) {
        console.error('Error deleting board:', error);
        return res.status(500).json({ "message": "Internal server error" });
    }
}

export default handleDeleteBoard;