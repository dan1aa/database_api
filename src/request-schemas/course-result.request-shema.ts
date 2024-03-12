import Joi from 'joi';

export const createCourseResultScheme = Joi.object({
    internId: Joi.string().required(), // explorer id
    courseId: Joi.string().required(), //course cipher
    masteryResult:  Joi.string().required(),
    englishLevel: Joi.string().allow(null)
});

export const createCourseResultsScheme = Joi.object({
    data: Joi.array().items(createCourseResultScheme)
})

export const updateCourseResultScheme = Joi.object({
    internId: Joi.number(), // explorer id
    courseId: Joi.number(), // course cipher
    masteryResult:  Joi.string(),
    englishLevel: Joi.string()
});