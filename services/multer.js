import multer from "multer";
import { nanoid } from "nanoid";

export const myMulter = ()=>{
    const storage = multer.diskStorage({
        destination: function(req,file,cd){
            cd(null , "uploads")
        },
        filename: function(req,file,cd){
            cd(null,nanoid() + "_" + file.originalname);
        }
    })

    function fileFilter (req, file, cb) {
        
        if(file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/jpg"){
            cb(null, true)
        }else{
            cb("invalid file", false)
        }
      }
    
    const uploads = multer({ dest: "/uploads" , fileFilter , storage})
    return uploads
}