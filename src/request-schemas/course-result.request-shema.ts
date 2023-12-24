import Joi from 'joi';

export const createCourseResultScheme = Joi.object({
    internId: Joi.number().required(),
    courseId: Joi.number().required(),
    masteryResult:  Joi.string().required(),
    englishLevel: Joi.string().required()
});

export const createCourseResultsScheme = Joi.object({
    data: Joi.array().items(createCourseResultScheme)
})

export const updateCourseResultScheme = Joi.object({
    internId: Joi.number(),
    courseId: Joi.number(),
    masteryResult:  Joi.string(),
    englishLevel: Joi.string()
});