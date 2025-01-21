import mongoose from "mongoose";

export const connectDB = ()=>{
    mongoose.connect(`mongodb://localhost:27017/nodeLab3`)
    .then(()=>{
        console.log("DB success");
    })
    .catch(err=>{
        console.log("error" , err);
    })
}

