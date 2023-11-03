import Joi from 'joi';

export const createCohorScheduleScheme = Joi.object({
    eventDate : Joi.date().required(),
    eventName: Joi.string().required(),
    cohort: Joi.string().required(),
});

export const updateCohorScheduleScheme = Joi.object({
    eventDate : Joi.date(),
    eventName: Joi.string(),
    cohort: Joi.string(),
});



 