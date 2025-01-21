import { userModel } from "../../DB/models/user.model.js";

export const userPicController = async(req,res)=>{
    try{
        const {id} = req.params;
    const user = await userModel.findByIdAndUpdate(id,{image: req.file.filename},{new:true})
    if(user){
        res.json({"message" : "done",user})
    }
    }
    catch(err){
        if(err.path && err.path == "_id"){
            res.json({"message": "invalid id"})
        }else{
            res.json({"message": "error" , err})
        }
    }
}