import j2s from 'joi-to-swagger';
import { 
    createInternCourseSchema,
    modifyInternCourseScheme
} from '@request-schemas/intern-course.request-schema';


const createInternCourse = {
    tags: ['Intern Course'],
    operationId: 'createIntern',
    requestBody: {
        content: {
            'application/json': {
                schema: j2s(createInternCourseSchema).swagger,
            },
        },
        required: true,
    },
    responses: {
        '201': {
            description: 'Intern Course record created successfully!',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            id: { type: 'number', example: 42 },
                            courseId: {type: 'number', example: 45},
                            internId: {type: 'number', example: 18}
                        }
                    }
                },
            },
        },
        '404': {
            description: 'You try to create record with not existing intern id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Intern with id 34 doesn`t exist'
                            }
                        }
                    }
                },
            },
        },
        '405': {
            description: 'You try to create record with not existing course id',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            msg: {
                                type: 'string',
                                example: 'Course with id 34 doesn`t exist'
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
    '/api/internCourses': {
        post: createInternCourse
    },
};

export default routes
