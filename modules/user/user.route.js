import { Router } from "express";
import { myMulter } from "../../services/multer.js";
import { userPicController } from "./userController.js";

const userRouter = Router();


export const userPic = userRouter.put("/userPic/:id" , myMulter().single("image") , userPicController )

