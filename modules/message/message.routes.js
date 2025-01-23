import { Router } from "express";
import { addMessageController, deleteMessageController, messageByIdController } from "./messageController.js";
import { validationFun } from "../../middleware/validation.js";
import { messageValidation } from "../auth/authValidation/authValidation.js";

const messageRoutes = Router();

messageRoutes.get("/message/:id" , messageByIdController)
messageRoutes.post("/addMessage/:id" , validationFun(messageValidation) ,addMessageController)
messageRoutes.delete("/deleteMessage/:id" ,deleteMessageController)





export default messageRoutes;