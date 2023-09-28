import Joi from 'joi';

export const createCourseScheme = Joi.object({
    course_name: Joi.string().required(),
    start_date: Joi.string().required(),
    end_date: Joi.string().required()
});

export const updateCourseScheme = Joi.object({
    course_name: Joi.string(),
    start_date: Joi.string(),
    end_date: Joi.string()
});