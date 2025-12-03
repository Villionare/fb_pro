import mongoose from "mongoose";
const { Schema } = mongoose;

const b_categoriesSchema = new Schema({
    category_id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    boards: [{
        type: Schema.Types.ObjectId,
        ref: 'boards'
    }],
    maxNumber: {
        type: Number
    }
}, {
    timestamps: true
});

const boardCategoryModel = mongoose.model('BoardCategory', b_categoriesSchema);

export default boardCategoryModel;