import mongoose from "mongoose";

//it is responcible for creating the documents in the collections crated by the model
//and basically specifies the format of it too.
const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});

//this is just used to create a collection
const adminModel = mongoose.model('adminModels', adminSchema);

export default adminModel;