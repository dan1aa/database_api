import Joi from 'joi';

export const createCourseResultScheme = Joi.object({
    internCourseId: Joi.number().required(),
    masteryResult:  Joi.string().required(),
    englishLevel: Joi.string().required()
});

export const createCourseResultsScheme = Joi.object({
    data: Joi.array().items(createCourseResultScheme)
})

export const updateCourseResultScheme = Joi.object({
    internCourseId: Joi.number(),
    masteryResult:  Joi.string(),
    englishLevel: Joi.string()
});