import Joi from 'joi';

export const createFeedbackOnInternScheme = Joi.object({
    attendance: Joi.boolean().required(),
    techCheck:  Joi.string().required(),
    participationActivity: Joi.string().required(),
    comment: Joi.string(),
    internId: Joi.string().required(),
    courseId: Joi.string().required(),
    meetNumber: Joi.number().required(),
    senderId: Joi.string().required()
});

export const createFeedbacksOnInternScheme = Joi.object({
    data: Joi.array().items(createFeedbackOnInternScheme)
})


export const updateFeedbackOnInternScheme = Joi.object({
    attendance: Joi.boolean(),
    techCheck:  Joi.string(),
    participationActivity: Joi.string(),
    comment: Joi.string(),
    internId: Joi.number(),
    classEventId: Joi.number(),
    senderId: Joi.number()
});