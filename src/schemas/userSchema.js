import joi from 'joi'

export const userSchema = joi.object({
    
    email: joi.string().email().required(),
    password: joi.string().required(),
    username: joi.string().min(3).required(),
    picture_url: joi.string().uri().required(),

});

export const loginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required(),
})