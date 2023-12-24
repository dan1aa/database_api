import Joi from 'joi';

export const createFeedbackOnFacilitatorScheme = Joi.object({
    attendance: Joi.bool().required(),
    techCheck:  Joi.string().required(),
    english: Joi.string().required(),
    isEncouraging: Joi.boolean().required(),
    isOpenAsking: Joi.boolean().required(),
    naturalCommunications: Joi.string().required(),
    isPrepared: Joi.boolean().required(),
    isCheckedUnderstanding: Joi.boolean().required(),
    isFacilitatorBrief: Joi.boolean().required(),
    publicSpeakingSkills: Joi.string().required(),
    isPunctual: Joi.boolean().required(),
    isOnTimeAttendanceFeedback: Joi.boolean().required(),
    isOptimalScreenPresentation: Joi.boolean().required(),
    internId: Joi.number().required(),
    classEventId: Joi.number().required()
});

export const updateFeedbackOnFacilitatorScheme = Joi.object({
    attendance: Joi.bool(),
    techCheck:  Joi.string(),
    english: Joi.string(),
    isEncouraging: Joi.boolean(),
    isOpenAsking: Joi.boolean(),
    naturalCommunications: Joi.string(),
    isPrepared: Joi.boolean(),
    isCheckedUnderstanding: Joi.boolean(),
    isFacilitatorBrief: Joi.boolean(),
    publicSpeakingSkills: Joi.string(),
    isPunctual: Joi.boolean(),
    isOnTimeAttendanceFeedback: Joi.boolean(),
    isOptimalScreenPresentation: Joi.boolean(),
    internId: Joi.number(),
    classEventId: Joi.number()
});