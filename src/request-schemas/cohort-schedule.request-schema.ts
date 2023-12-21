import Joi from 'joi';

export const createCohorScheduleScheme = Joi.object({
    eventDate : Joi.string().allow(null),
    eventName: Joi.string().required(),
    cohort: Joi.string().required(),
});

export const createCohortSchedulesScheme = Joi.object({
    data: Joi.array().items(createCohorScheduleScheme)
})

export const updateCohorScheduleScheme = Joi.object({
    eventDate : Joi.string().allow(null),
    eventName: Joi.string(),
    cohort: Joi.string(),
});



 