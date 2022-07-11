import Joi from "joi";

const activateCardSchema = Joi.object({
    id: Joi.number().integer().greater(0).required(),
    securityCode: Joi.string().trim().required(),
    password: Joi.string().length(4).regex(/^[0-9]{4}$/).trim().required()
})

export default activateCardSchema;