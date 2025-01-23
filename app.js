import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { connectDB } from "./DB/connection.js";
import { confirmEmail, signIn, signUp } from "./modules/auth/auth.route.js";
import { userPic } from "./modules/user/user.route.js";
import messageRoutes from "./modules/message/message.routes.js";

const server = express();
server.use(express.json());


// auth routes
server.use("/api/v1",signUp)
server.use("/api/v1",signIn)
server.use("/api/v1",confirmEmail)
server.use("/api/v1",userPic)
server.use("/api/v1",messageRoutes)

// server.all("*",{})


connectDB();
server.listen(4200 , ()=>{
    console.log("server connected");
})