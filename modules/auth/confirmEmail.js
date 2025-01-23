import nodemailer from "nodemailer";
import { uiEmailFun } from "./uiEmailMsg.js";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "abdulrahman2d77@gmail.com",
      pass: "xurmdgnxxcphavjd",
    },
  });

export async function sendMail(to , subject , msg) {
    // send mail with defined transport object
    await transporter.sendMail({
      to: to,
      subject: subject, 
      html: uiEmailFun(msg),
    });
    
    console.log("email sent");
    return true
  } 


