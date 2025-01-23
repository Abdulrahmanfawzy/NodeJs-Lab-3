import { messageModel } from "../../DB/models/message.model.js";
import { userModel } from "../../DB/models/user.model.js";

export const addMessageController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, msgBody } = req.body;
    const user = await userModel.findById(id);
    if (!user) {
      return res.json({ message: "user is invalid" });
    }
    const insertMessage = await messageModel({
      title,
      msgBody,
      receiverId: id,
    });
    const messageSaved = await insertMessage.save();
    res.json({ message: "done", messageSaved });
  } catch (err) {
    if (err.path && err.path == "_id") {
      res.json({ message: "invalid id" });
    } else {
      res.json({ message: "error", err });
    }
  }
};

export const messageByIdController = async (req,res)=>{
    try{
        const {id} = req.params;
        const user = await userModel.findById(id);
        if(!user){
            res.json({"message" : "id not found"});
        }
        const message = await messageModel.find({receiverId: id});
        res.json({"message" : "done" , message})
    }
    catch(err){
        if(err.path && err.path == "_id"){
            res.json({"message":"id is invalid"});
        }else{
            res.json({"message":"error" , err});
        }
    }
}


export const deleteMessageController = async (req,res)=>{
    try{
        const {id} = req.params;
        const deleteMsg = await messageModel.findByIdAndDelete(id,{new: true});
        if(deleteMsg){
            res.json({"message" : "message deleted successfully"});
        }else{
            res.json({"message" : "id invalid"});
        }
        
    }
    catch(err){
        if(err.path && err.path == "_id"){
            res.json({message: "invalid id"})
        }else{
            res.json({message: "error" , err})
        }
    }

} 