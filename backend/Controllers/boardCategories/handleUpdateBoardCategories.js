import boardCategoryModel from "../../Models/content/boardCategories.js";

const handleUpdateBoardCategories = async (req, res) => {
    try {
        const { _id, name, description, maxNumber } = req.body;

        const updatedCategory = await boardCategoryModel.findByIdAndUpdate(
            _id,
            {
                $set: {
                    name,
                    description,
                    maxNumber
                }
            },
            {
                new: true,
                runValidators: true
            },
        );

        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }

        res.status(200).json({ message: 'Category updated successfully', updatedCategory });

    } catch (error) {
        res.status(500).json({
            "message": 'Server error',
            error
        });
    }
}

export default handleUpdateBoardCategories