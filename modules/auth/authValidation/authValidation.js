
import joi from "joi";

export const signUpValidationSchema = {
    body: joi.object().required().keys({
        username: joi.string().min(3).max(10).required(),
        email: joi.string().email({minDomainSegments: 2 , tlds: ["com","net"]}).required(),
        password: joi.string().pattern(new RegExp('^[A-Z][a-z0-9]{4,8}$')),
        cPassword: joi.string().valid(joi.ref("password")).required(),
        phone: joi.string().required()
    })
}
 
export const signInValidationSchema = {
    body: joi.object().required().keys({
        email: joi.string().email({maxDomainSegments: 2 , tlds: ["com" , "net"]}).required(),
        password: joi.string().pattern(new RegExp('^[A-Z][a-z0-9]{4,8}$')).required()
    })
}


export const messageValidation = {
    body: joi.object().required().keys({
        title: joi.string().required(),
        msgBody: joi.string().required()
    })
}
