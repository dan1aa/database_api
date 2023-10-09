import Joi from 'joi';

export const createInternCourseSchema = Joi.object({
    courseId: Joi.number().required(),
    internId: Joi.number().required(),
    classRoleId: Joi.number().required(),
});