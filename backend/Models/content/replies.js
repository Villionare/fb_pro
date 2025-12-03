import mongoose, { Schema } from "mongoose";

//boards - OP_posts -  

const repliesSchema = mongoose.Schema({

    reply_Id: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true
    },

    textContent: {
        type: String,
        required: false,
    },

    upVote: {
        type: Number,
        default: 0
    },

    downVote: {
        type: Number,
        default: 0
    },

    //Thread id will be the same throughout - weather a reply to op post or reply to a reply. 
    thread_id: {
        type: Schema.Types.ObjectId,
        ref: 'threadModels',
        required: true,
    },

    //weather to the OP post or to reply to a reply.
    to: {
        type: Schema.Types.ObjectId,
        ref: 'replies'
    },

    //the sub replies to this reply
    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'replies'
    }],

    media: {
        type: String
    },
}, {
    timestamps: true,
});

const repliesModel = mongoose.model('replies', repliesSchema);

export default repliesModel;