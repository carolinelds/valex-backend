import Joi from "joi";

const paymentSchema = Joi.object({
    cardId: Joi.number().integer().greater(0).required(),
    password: Joi.string().length(4).regex(/^[0-9]{4}$/).trim().required(),
    businessId: Joi.number().integer().greater(0).required(),
    amount: Joi.number().greater(0).required()
})

export default paymentSchema;