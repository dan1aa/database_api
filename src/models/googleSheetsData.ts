import Joi from 'joi';

const googleSheetsDataSchema = Joi.object({
    add: Joi.array().items(Joi.any()).required(),
    update: Joi.array().items(Joi.any()).required(),
    delete: Joi.array().items(Joi.any()).required(),
});

export default googleSheetsDataSchema;