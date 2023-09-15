import Joi from 'joi';

const googleSheetsDataSchema = Joi.object({
    insert: Joi.array().items(Joi.any()).required(),
    delete: Joi.array().items(Joi.any()).required(),
});

export default googleSheetsDataSchema;