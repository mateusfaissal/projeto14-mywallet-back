import Joi from "joi";

export const transactionsSchema = Joi.object({

    type: Joi.string().required(),
    value: Joi.number().positive().required(),
    description: Joi.string().required()

})