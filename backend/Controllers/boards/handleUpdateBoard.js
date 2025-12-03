import boardCategoryModel from "../../Models/content/boardCategories.js";
import boardsItemsModel from "../../Models/content/boards.js";

//what can be updated in a board: name/slug/description/boardCategory/

//frontend will have the interface to edit the board which will open a new dialog box to edit form the available options.
const handleUpdateBoard = async (req, res) => {

    //so we are gonna overwrite the existing values with the new values provided in the request body.
    try {
        const { board_id, name, slug, description, boardCategory } = req.body;

        //boardCategory will have the board name + board category id 

        if (!board_id || !name || !slug || !description || !boardCategory) {
            res.json({
                "message": "All fields are required to update the board"
            })
        }

        const findBoardById = await boardsItemsModel.findOne({ board_id });

        //getting the board category defined in req.body and updating the board fields.
        const requestedBoardCategory = await boardCategoryModel.findOne({
            name: boardCategory.name,
            id: boardCategory.id
        });

        if (requestedBoardCategory === null) {
            return res.json({
                "message": "The requested board category does not exist"
            })
        }

        findBoardById.name = name;
        findBoardById.slug = slug;
        findBoardById.description = description;
        findBoardById.board_category = await requestedBoardCategory._id;

        //and then save the updated board.
        await findBoardById.save();

        console.log(`board has been updated by the admin ${req.session.user.username}: `, findBoardById);

        res.status(200).json({
            "message": "Board has been updated",
            "board": findBoardById
        });

    } catch (err) {
        console.log(err);
        res.json({
            "message": "Error while updating the board"
        })
    }
}

export default handleUpdateBoard;