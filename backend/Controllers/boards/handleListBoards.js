import boardsItemsModel from "../../Models/content/boards.js";

const handleListBoards = async (req, res) => {

    //this will list all the boards available in the database

    try {
        const allBoards = await boardsItemsModel.find();

        console.log(`all the boards are listed by the admin ${req.session.user.username}: `, allBoards);
        res.json({
            "message": "successfully fetched all the boards in the db",
            boards: allBoards,
        })

    } catch (e) {
        res.staus(404).json({ "message": "Internal Server Error" })
        console.log("Can't list all the documents");
    }
}


export default handleListBoards;