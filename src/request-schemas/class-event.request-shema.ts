import Joi from 'joi';

export const updateClassEventScheme = Joi.object({
    meetNumber : Joi.number(),
    eventDate : Joi.date(),
    googleMeetLink: Joi.string(),
    courseId: Joi.number(),
    classEventTypeId: Joi.number(),
})

export const createClassEventScheme = Joi.object({
    meetNumber : Joi.number().required(),
    eventDate : Joi.string().required(),
    googleMeetLink: Joi.string().required(),
    courseId: Joi.number().required(),
    classEventTypeId: Joi.number().required(),
});

export const createClassEventsScheme = Joi.object({
    data: Joi.array().items(createClassEventScheme)
})
