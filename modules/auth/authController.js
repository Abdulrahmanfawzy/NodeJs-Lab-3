import { userModel } from "../../DB/models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Cryptr from "cryptr";
import { sendMail } from "./confirmEmail.js";

export const signUpController = async (req, res) => {
  try {
    const { username, email, password, cPassword, phone } = req.body;
    if (password !== cPassword) {
      return res.json({ message: "password not matched cPassword" });
    }
    const emailCheckFound = await userModel.findOne({ email });
    if (emailCheckFound) {
      return res.json({ message: "You have to sign in" });
    }
    const hashPass = bcryptjs.hashSync(password, parseInt(process.env.SALT));
    const cryptr = new Cryptr(process.env.phoneEncrpt);
    const encryptedPhone = cryptr.encrypt(phone);
    const insertUser = await userModel.create({
      username,
      email,
      password: hashPass,
      phone: encryptedPhone,
    });
    const userObj = insertUser.toObject();
    delete userObj.password;

    let emailSent = sendMail(
      email,
      "Confirm email",
      `http://localhost:4200/api/v1/confirmEmail/${userObj._id}`
    );

    res.json({ message: "done", userObj });
  } catch (err) {
    res.json({ message: "error", err });
  }
};

export const signInController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ message: "you have to register first" });
    }
    const checkPass = bcryptjs.compareSync(password, user.password);
    if (!checkPass) {
      return res.json({ message: "password is wrong" });
    }
    const token = jwt.sign({ email, _id: user._id }, process.env.tokenKey);
    res.json({ message: "done", token });
  } catch (err) {
    res.json({ message: "error", err });
  }
};

export const confirmEmailController = async (req, res) => {
  try {
    const { id } = req.params;
    const { isConfirmed } = req.body;
    const user = await userModel.findById(id);
    if (isConfirmed && user) {
      const userFound = await userModel.findByIdAndUpdate(id, {
        isConfirmed: true,
      });
      res.json({ message: "welcome you are a valid user" });
    } else {
      res.json({ message: "you are not confirmed yet" });
    }
  } catch (err) {
    if (err.path && err.path == "_id") {
      res.json({ message: "id is invalid" });
    } else {
      res.json({ message: "error", err });
    }
  }
};
