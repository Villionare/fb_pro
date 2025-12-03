//this controller will send the info of all the board categories, boards, threads, replies

import boardCategoryModel from "../../Models/content/boardCategories.js";
import boardsItemsModel from "../../Models/content/boards.js";

const send_DBData = async (req, res) => {
    //for now i will just be sending the boards categories 
    const boardCategories = await boardCategoryModel.find();
    const boards = await boardsItemsModel.find();

    res.status(200).json({
        boardCategories,
        boards
    })
}

export default send_DBData;