import mongoose from "mongoose";

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    msgBody: {
        type: String,
        required: true
    },
    receiverId: mongoose.Schema.Types.ObjectId
})

export const messageModel = mongoose.model("messages", schema);