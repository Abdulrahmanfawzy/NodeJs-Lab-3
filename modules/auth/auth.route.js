import { confirmEmailController, signInController, signUpController } from "./authController.js";
import {Router} from "express";

const router = Router();

export const signUp = router.post("/signup" , signUpController);
export const signIn = router.post("/signin" , signInController);
export const confirmEmail = router.put("/confirmEmail/:id" , confirmEmailController);


