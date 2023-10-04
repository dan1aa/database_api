import Joi from 'joi';

export const internCourseSchema = Joi.object({
    courseId: Joi.number().required(),
    internId: Joi.number().required(),
    classRoleId: Joi.number().required(),
});