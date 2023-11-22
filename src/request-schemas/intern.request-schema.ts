import Joi from 'joi';
  
const createInternSchemeItem = Joi.object({
    name : Joi.string().max(100),
    surname: Joi.string().max(100),
    email: Joi.string().max(50).email(),
  
    explorerId: Joi.string().max(50),
    explorerMail: Joi.string().max(50),
    explorerPassword: Joi.string().max(50),
  
    discordId: Joi.string().max(100).allow(null),
    discordNickname: Joi.string().max(50).allow(null),
  
    cohort: Joi.string().max(50).allow(null),
    teachableId: Joi.string().max(15).allow(null),
  
    age: Joi.number().integer(),
    city: Joi.string().max(50),
    country: Joi.string().max(50),
    timezone: Joi.string().max(50),
});

export const createInternsScheme = Joi.object({
    data: Joi.array().items(createInternSchemeItem),
});

export const updateInternScheme = Joi.object({
    name : Joi.string().max(100).allow(null),
    surname: Joi.string().max(100).allow(null),
    email: Joi.string().max(50).email().allow(null),
  
    explorerId: Joi.string().max(50).allow(null),
    explorerMail: Joi.string().max(50).allow(null),
    explorerPassword: Joi.string().max(50).allow(null),
  
    discordId: Joi.string().max(100).allow(null),
    discordNickname: Joi.string().max(50).allow(null),
  
    cohort: Joi.string().max(50).allow(null),
    teachableId: Joi.string().max(15).allow(null),
  
    age: Joi.number().integer().allow(null),
    city: Joi.string().max(50).allow(null),
    country: Joi.string().max(50).allow(null),
    timezone: Joi.string().max(50).allow(null),
});