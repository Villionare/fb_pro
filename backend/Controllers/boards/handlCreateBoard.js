import boardCategoryModel from '../../Models/content/boardCategories.js';
import boardsItemsModel from '../../Models/content/boards.js';

//firstly we check the feads in req.body
//then we create a new board in the database - wrting the category it bolongs (frontend - dropdown category list) 
//whenever a new board is created, there is obviliously no threads in it, so threads array will be empty initially

const handlCreateBoard = async (req, res) => {

    try {
        const { name, slug, description, board_category_id } = req.body;

        if (!name || !slug || !board_category_id) {
            return res.status(400).json({ "message": "Missing required fields" });
        }

        //checking if the name already exists
        const existingBoardName = await boardsItemsModel.findOne({ name });
        if (existingBoardName) {
            return res.status(400).json({ "message": "Board with this name already exists" });
        }

        //checking if the sulg already exists
        const existingBoard = await boardsItemsModel.findOne({ slug });
        if (existingBoard) {
            return res.status(400).json({ "message": "Board with this slug already exists" });
        }

        //checking the board caregory exists or not
        const boardCategoryDoc = await boardCategoryModel.findOne({ category_id: board_category_id });
        if (!boardCategoryDoc) {
            return res.status(400).json({ "message": "Board category does not exist" });
        }

        //board_id will be auto generated as the last board's id + 1 
        const totalBoards = await boardsItemsModel.countDocuments() + 1;
        const board_id = `BRD_${totalBoards}`;

        const board = await boardsItemsModel.create({
            board_id,
            name,
            slug,
            description,
            board_category: {
                _id: boardCategoryDoc._id,
                name: boardCategoryDoc.name
            }
        });

        //so the moment we will create a board, it will fill the boardCategory items array with the board created
        boardCategoryDoc.boards.push(board._id);
        await boardCategoryDoc.save();

        console.log(`board has been created by the admin ${req.session.user.username}: `, board);

        res.json({
            "message": "successfully created the board",
            "board": board
        });

    } catch (error) {
        console.error('Error creating board:', error);
        return res.status(500).json({ "message": "Internal server error" });
    }
}

export default handlCreateBoard;