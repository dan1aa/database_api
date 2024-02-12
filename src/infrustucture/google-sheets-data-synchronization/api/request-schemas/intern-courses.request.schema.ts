import Joi from 'joi';

const createInternScheme = Joi.object({
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

const createCourseScheme = Joi.object({
    courseCipher: Joi.string().required(),
    courseName: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    linkToClassMaterials: Joi.string().allow(null).required()
});

const mergingInternsDataSchema = Joi.array().items(createInternScheme);

const merghinCourseDataSchema = Joi.array().items(createCourseScheme);

const mergingInternCourseDataSchema = Joi.object({
    courseCipher: Joi.string().required(),
    participants: Joi.object().pattern(
        Joi.string(),
        Joi.array().items(Joi.string()).required()
    ).required()
});

export default {
    merghinCourseDataSchema,
    mergingInternsDataSchema,
    mergingInternCourseDataSchema
};