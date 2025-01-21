import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    isConfirmed: {
        type: Boolean,
        default: false,
    },
    gender: {
        type: String,
        enums: ["Male" , "Female"],
        default: "Male"
    },
    phone: {
        type: String,
        required: true
    },
    image: {
        type:String,
        default: null
    }
} , {timestamps: true})


export const userModel = mongoose.model("User" , userSchema);






