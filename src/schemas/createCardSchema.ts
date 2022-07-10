import Joi from "joi";

const createCardSchema = Joi.object({
    employeeId: Joi.number().integer().greater(0).required(),
    type: Joi.string().lowercase().trim().required()
})

export default createCardSchema;