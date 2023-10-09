import Joi from 'joi';

export const createCourseScheme = Joi.object({
    courseCipher: Joi.string().required(),
    courseName: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    linkToClassMaterials: Joi.string().allow(null).required()
});

export const updateCourseScheme = Joi.object({
    courseCipher: Joi.string(),
    courseName: Joi.string(),
    startDate: Joi.string(),
    endDate: Joi.string(),
    linkToClassMaterials: Joi.string().allow(null)
});