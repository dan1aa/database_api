import Joi from 'joi';

export const createInternCourseRoleSchema = Joi.object({
    internCourseRecordId: Joi.number().required(),
    classRoleId: Joi.number().required(),
});

export const modifyInternCourseRoleScheme = Joi.object({
    id: Joi.number().required(),
    internCourseRecordId: Joi.number().allow(null).required(),
    classRoleId: Joi.number().allow(null).required(),
});