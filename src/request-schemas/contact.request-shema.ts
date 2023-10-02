import Joi from 'joi';

export const createContactScheme = Joi.object({
    firstName: Joi.string().allow(null).required(),
    lastName: Joi.string().allow(null).required(),
    email: Joi.string().allow(null).required(),
    age: Joi.number().allow(null).required(),
    country: Joi.string().allow(null).required(),
    timezone: Joi.string().allow(null).required(),
    sourceOfReferral: Joi.string().allow(null).required(),
    eduQuestSelectedDateTime: Joi.date().allow(null).required(),
    eduQuestDecision: Joi.string().allow(null).required()
});

export const updateContactScheme = Joi.object({
    firstName: Joi.string().allow(null),
    lastName: Joi.string().allow(null),
    email: Joi.string().allow(null),
    age: Joi.number().allow(null),
    country: Joi.string().allow(null),
    timezone: Joi.string().allow(null),
    sourceOfReferral: Joi.string().allow(null),
    eduQuestSelectedDateTime: Joi.date().allow(null),
    eduQuestDecision: Joi.string().allow(null)
});

export const createContactArraySchema = Joi.array().items(createContactScheme);