import Joi from 'joi';

export const createInternScheme = Joi.object({
    explorerId: Joi.string().required(),
    explorerMail: Joi.string().required(),
    explorerPassword: Joi.string().required(),
    discordNickname: Joi.string().allow(null).required(),
    discordId: Joi.string().allow(null).required(),
    cohort: Joi.string().allow(null).required(),
    contactId: Joi.number().required(),
});

export const updateInternSheme = Joi.object({
    explorerId: Joi.string(),
    explorerMail: Joi.string(),
    explorerPassword: Joi.string(),
    discordNickname: Joi.string().allow(null),
    discordId: Joi.string().allow(null),
    cohort: Joi.string().allow(null),
    contactId: Joi.number(),
});

const updateDiscordDataSheme = Joi.object({
    discordNickname: Joi.string(),
    discordId: Joi.string(),
});

export const updateDiscordDataArraySheme = Joi.array().items(updateDiscordDataSheme); 