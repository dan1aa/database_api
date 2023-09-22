import Joi from 'joi';

export const createInternScheme = Joi.object({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required(),
    cohort: Joi.string().required(),
    explorer_id: Joi.string().required(),
    discord_id: Joi.string().required(),
});

export const updateInternSheme = Joi.object({
    first_name: Joi.string(),
    last_name: Joi.string(),
    email: Joi.string(),
    cohort: Joi.string(),
    explorer_id: Joi.string(),
    discord_id: Joi.string(),
});

