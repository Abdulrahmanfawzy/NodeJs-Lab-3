import { validationFun } from "../../middleware/validation.js";
import { confirmEmailController, signInController, signUpController } from "./authController.js";
import {Router} from "express";
import { signInValidationSchema, signUpValidationSchema } from "./authValidation/authValidation.js";

const router = Router();

export const signUp = router.post("/signup" , validationFun(signUpValidationSchema) , signUpController);
export const signIn = router.post("/signin", validationFun(signInValidationSchema), signInController);
export const confirmEmail = router.put("/confirmEmail/:token" , confirmEmailController);


