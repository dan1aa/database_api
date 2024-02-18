import Joi from 'joi';

export const createFeedbackOnFacilitatorScheme = Joi.object({
    attendance: Joi.bool().required(),
    techCheck:  Joi.string().required(),
    english: Joi.string().required(),
    isEncouraging: Joi.boolean().required(),
    isOpenAsked: Joi.boolean().required(),
    naturalCommunications: Joi.string().required(),
    isPrepared: Joi.boolean().required(),
    isCheckedUnderstanding: Joi.boolean().required(),
    isFacilitatorBrief: Joi.boolean().required(),
    publicSpeakingSkills: Joi.string().required(),
    isPunctual: Joi.boolean().required(),
    isOnTimeAttendanceFeedback: Joi.boolean().required(),
    isOptimalScreenPresentation: Joi.boolean().required(),
    internId: Joi.string().required(),
    meetNumber: Joi.number().required(),
    courseId: Joi.string().required(),
    senderId: Joi.string().required()
});

export const createFeedbacksOnFacilitatorScheme = Joi.object({
    data: Joi.array().items(createFeedbackOnFacilitatorScheme)
})


export const updateFeedbackOnFacilitatorScheme = Joi.object({
    attendance: Joi.bool(),
    techCheck:  Joi.string(),
    english: Joi.string(),
    isEncouraging: Joi.boolean(),
    isOpenAsked: Joi.boolean(),
    naturalCommunications: Joi.string(),
    isPrepared: Joi.boolean(),
    isCheckedUnderstanding: Joi.boolean(),
    isFacilitatorBrief: Joi.boolean(),
    publicSpeakingSkills: Joi.string(),
    isPunctual: Joi.boolean(),
    isOnTimeAttendanceFeedback: Joi.boolean(),
    isOptimalScreenPresentation: Joi.boolean(),
    internId: Joi.number(),
    classEventId: Joi.number(),
    senderId: Joi.number()
});