import mongoose, { Schema } from "mongoose";

const boardsItems = new mongoose.Schema({

    board_id: {
        type: Number,
        required: true,
    },

    name: {
        type: String,
        required: true,
        unique: true
    },

    slug: {
        type: String,
        required: true,
        unique: true
    },

    description: {
        type: String,
    },

    board_category: {
        type: Schema.Types.ObjectId,
        ref: 'boardCategory',
    },

    threads: [{
        type: Schema.Types.ObjectId, //initially empty array
        ref: 'threadModels'
    }],

}, {
    timestamps: true,
});

const boardsItemsModel = mongoose.model("boards", boardsItems);

export default boardsItemsModel;