import Joi from "joi";

const blockUnblockCardSchema = Joi.object({
    id: Joi.number().integer().greater(0).required(),
    password: Joi.string().length(4).regex(/^[0-9]{4}$/).trim().required()
})

export default blockUnblockCardSchema;