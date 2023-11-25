import Joi from 'joi';

const updateCourseObject = {
    courseCipher: Joi.string(),
    courseName: Joi.string(),
    startDate: Joi.string(),
    endDate: Joi.string(),
    linkToClassMaterials: Joi.string().allow(null)
}

export const createCourseScheme = Joi.object({
    courseCipher: Joi.string().required(),
    courseName: Joi.string().required(),
    startDate: Joi.string().required(),
    endDate: Joi.string().required(),
    linkToClassMaterials: Joi.string().allow(null).required()
});

export const createCoursesScheme = Joi.object({
    data: Joi.array().items(createCourseScheme),
})

export const updateCourseScheme = Joi.object(updateCourseObject);

export const modifyCourseSheetsScheme = Joi.object({
    id: Joi.number().required(),
    ...updateCourseObject
});

export const enrollmentInternsScheme = Joi.object({
    data: Joi.array().items(
        Joi.object({
            internId: Joi.number().required(),
            classRoleId: Joi.number().required(),
        })
    ),
});