import Joi from "joi";

const getCardTransactionsSchema = Joi.object({
    number: Joi.string().trim().required(),
    cardholderName: Joi.string().trim().required(),
    expirationDate: Joi.string().length(5).trim().required(),
})

export default getCardTransactionsSchema;