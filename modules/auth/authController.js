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
    console.log(userObj);
    const tokenId = jwt.sign({id:userObj._id , email} , process.env.tokenKey)
    
    sendMail(
      email,
      "Confirm email",
      `${req.protocol}://localhost:4200/api/v1/confirmEmail/${tokenId}`
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

    if(user.isConfirmed == true){
      const checkPass = bcryptjs.compareSync(password, user.password);
      if (!checkPass) {
        return res.json({ message: "password is wrong" });
      }
      const token = jwt.sign({ email, _id: user._id }, process.env.tokenKey);
      res.json({ message: "done", token });
    }else{
      res.json({"message" : "you have to confirm your email first"});
    }
  } catch (err) {
    res.json({ message: "error", err });
  }
};

export const confirmEmailController = async (req, res) => {
  try {
    const { token } = req.params;
    const decode = jwt.verify(token , process.env.tokenKey)

    if(!decode){
      return res.json({"message" : "token is invalid"});
    }
    const updateIsConfirmed = await userModel.findByIdAndUpdate(decode.id , {
      isConfirmed: true
    },{new: true});
    res.json({"message" : "email is confirmed"})
  } catch (err) {
    if(err.message == "invalid signature"){
      res.json({ message: "token is invalid"});
    }else{
      res.json({ message: "error" , err});
    }
  }
};
