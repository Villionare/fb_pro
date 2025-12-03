import boardCategoryModel from "../../Models/content/boardCategories.js";

//when we will be creating a board category there are no already defined boards for the category so we will add it afterwads
//whenever we will be create a board category it will have 0 boards associated with it.

//first we will check that we have got all the required fields from the request body

const handleCreateBoardCategory = async (req, res) => {
    try {
        const { name, description, maxNumber } = req.body;

        if (!name || !description || !maxNumber) {
            return res.status(400).json({
                message: "Missing required fields",
                success: false
            });
        }

        //this will count the number of existing board categories to assign a new id
        const noOfBoardsCategories = await boardCategoryModel.countDocuments();
        const boardCategoryId = `BC_${noOfBoardsCategories + 1}`;

        const newCategory = await boardCategoryModel.create({
            category_id: boardCategoryId,
            name,
            description,
            maxNumber,
        });

        console.log(`board has been created by the admin ${req.session.user.username}: `, newCategory);

        res.status(201).json({
            message: "Board category created successfully",
            success: true,
            data: newCategory
        });

    } catch (error) {
        console.error('Error creating board category:', error);
        res.status(500).json({
            message: "Error creating board category",
            success: false
        });
    }
}

export default handleCreateBoardCategory;