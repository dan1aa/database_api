import j2s from 'joi-to-swagger';
import { 
    createInternCourseRoleSchema,
    modifyInternCourseRoleScheme
} from '@request-schemas/intern-course-role.request-schema';


const createInternCourseRole = {
    tags: ['Intern Course Role'],
    operationId: 'createIntern',
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(createInternCourseRoleSchema).swagger,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Intern Course Role record created successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            internCourseRecordId: {type: 'number', example: 45},
                            classRoleId: {type: 'number', example: 18}
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try to create record with not existing intern course record id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Intern course record with id 34 doesn`t exist'
                            }
                        }
                    }
                },
            },
        },
        '405': {
            description: 'You try to create record with not existing class role id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Class role with id 34 doesn`t exist'
                            }
                        }
                    }
                },
            },
        },
        '500': {
            description: 'Internal Server Error',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: 'string',
                                example: 'Internal server error',
                            },
                        },
                    },
                },
            },
        }
    },
};


const routes = {
    '/api/internCourseClassRoles': {
        post: createInternCourseRole
    },
};

export default routes