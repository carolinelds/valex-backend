import Joi from "joi";

const rechargeCardSchema = Joi.object({
    cardId: Joi.number().integer().greater(0).required(),
    amount: Joi.number().greater(0).required(),
})

export default rechargeCardSchema;