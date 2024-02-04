import Joi from 'joi';

const updateEventFeedbackObject = {
    classEventId: Joi.number(),
    feedback: Joi.string()
}

export const createEventFeedbackSheme = Joi.object({
    classEventId: Joi.number().required(),
    feedback: Joi.string().required()
});

export const createEventFeedbacksSheme = Joi.object({
    data: Joi.array().items(createEventFeedbackSheme),
})

export const updateEventFeedbackSheme = Joi.object(updateEventFeedbackObject);