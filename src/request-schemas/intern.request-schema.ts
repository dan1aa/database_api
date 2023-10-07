import Joi from 'joi';

export const createInternScheme = Joi.object({
    explorerId: Joi.string().allow(null).required(),
    explorerMail: Joi.string().allow(null).required(),
    explorerPassword: Joi.string().allow(null).required(),
    discordNickname: Joi.string().allow(null).required(),
    discordId: Joi.string().allow(null).required(),
    cohort: Joi.string().allow(null).required(),
    contactId: Joi.number().allow(null).required(),
});

export const updateInternSheme = Joi.object({
    explorerId: Joi.string().allow(null),
    explorerMail: Joi.string().allow(null),
    explorerPassword: Joi.string().allow(null),
    discordNickname: Joi.string().allow(null),
    discordId: Joi.string().allow(null),
    cohort: Joi.string().allow(null),
    contactId: Joi.number().allow(null),
});

const updateDiscordDataSheme = Joi.object({
    discordNickname: Joi.string(),
    discordId: Joi.string(),
});

export const updateDiscordDataArraySheme = Joi.array().items(updateDiscordDataSheme); 