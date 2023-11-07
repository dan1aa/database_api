import Joi from 'joi';

export const createCohorScheduleScheme = Joi.object({
    eventDate : Joi.date().allow(null).required(),
    eventName: Joi.string().required(),
    cohort: Joi.string().required(),
});

export const updateCohorScheduleScheme = Joi.object({
    eventDate : Joi.date().allow(null),
    eventName: Joi.string(),
    cohort: Joi.string(),
});



 