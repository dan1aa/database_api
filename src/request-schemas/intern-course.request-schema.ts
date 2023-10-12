import Joi from 'joi';

export const createInternCourseSchema = Joi.object({
    courseId: Joi.number().required(),
    internId: Joi.number().required(),
    classRoleId: Joi.number().required(),
});

export const modifyInternCourseSheetsScheme = Joi.object({
    id: Joi.number().required(),
    courseId: Joi.number().allow(null).required(),
    internId: Joi.number().allow(null).required(),
    classRoleId: Joi.number().allow(null).required(),
});