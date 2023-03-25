import joi from 'joi'

export const postSchema = joi.object({
    link: joi.string().uri().required(),
    description: joi.string().allow(null, '')
})

export const putSchema = joi.object({
    post_id: joi.number().required(),
    description: joi.string().allow(null, '')
})

export const likeSchema = joi.object({
    post_id: joi.number().required()
})

export const postComment = joi.object({
    post_id: joi.number().required(),
    text: joi.string().required()
})