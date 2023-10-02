import Joi from 'joi';

export const createContactScheme = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().required(),
    age: Joi.number().required(),
    country: Joi.string().required(),
    timezone: Joi.string().required(),
    sourceOfReferral: Joi.string().required(),
    eduQuestSelectedDateTime: Joi.date().required(),
    eduQuestDecision: Joi.string().required()
});

export const updateContactScheme = Joi.object({
    firstName: Joi.string(),
    lastName: Joi.string(),
    email: Joi.string(),
    age: Joi.number(),
    country: Joi.string(),
    timezone: Joi.string(),
    sourceOfReferral: Joi.string(),
    eduQuestSelectedDateTime: Joi.date(),
    eduQuestDecision: Joi.string()
});

export const createContactArraySchema = Joi.array().items(createContactScheme);

[
    {
        "firstName": "firstUpdated",
        "lastName": "lastName",
        "email": "email4",
        "age": 15,
        "country": "country",
        "timezone": "timezone",
        "sourceOfReferral": "sourceOfReferral",
        "eduQuestSelectedDateTime": "2023-06-08T00:00:00Z",
        "eduQuestDecision": "Try again"
    },
    {
        "firstName": "firstUpdated",
        "lastName": "lastName",
        "email": "email5",
        "age": 15,
        "country": "country",
        "timezone": "timezone",
        "sourceOfReferral": "sourceOfReferral",
        "eduQuestSelectedDateTime": "2023-06-08T00:00:00Z",
        "eduQuestDecision": "Try again"
    },
]