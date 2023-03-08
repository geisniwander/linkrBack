import joi from 'joi'

export const postSchema = joi.object({
    link: joi.string().uri().required(),
    description: joi.string()
})

export const likeSchema = joi.object({
    post_id: joi.number().required()
})