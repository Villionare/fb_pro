import mongoose from "mongoose";

const anonymousSchema = new mongoose.Schema(
    {
        ip: {
            type: String,
            required: true,
        },
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
    },
    {
        timestamps: true,
    }
);

const anonymousModel = mongoose.model("Anonymous", anonymousSchema);

export default anonymousModel;
