import mongoose from "mongoose";
const { Schema } = mongoose;

const threadSchema = new Schema({

    thread_id: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    }, //thread name is the same as the op title

    op_post: {
        type: Schema.Types.ObjectId,
        ref: 'op_posts',
        required: true
    },

    replies: [{
        type: Schema.Types.ObjectId,
        ref: 'replies'
    }]
});

const threadsModel = mongoose.model('threadModels', threadSchema);

export default threadsModel;