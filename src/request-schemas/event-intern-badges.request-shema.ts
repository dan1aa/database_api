import Joi from 'joi';

export const createEventInternBadgeSheme = Joi.object({
    classEventId: Joi.number().required(),
    internId: Joi.number().required(),
    badgeId: Joi.number().required()
});

export const createEventInternBadgesSheme = Joi.object({
    data: Joi.array().items(createEventInternBadgeSheme),
})
