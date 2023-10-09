import j2s from 'joi-to-swagger';
import { createInternScheme } from '@request-schemas/intern.request-schema';
import { createCourseScheme } from '@request-schemas/course.request-schema';
import { createClassEventScheme } from '@request-schemas/class-event.request-shema';
import { createInternCourseSchema } from '@request-schemas/intern-course.request-schema';

const createInterns = {
    tags: ['Sheets'],
    operationId: 'createInterns',
    description: 'Bulk insert of pack of interns to sql from sheets',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        create: {
                            type: 'array',
                            items: {
                                ...j2s(createInternScheme).swagger
                            }
                        },

                    }
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successful bulking creation of interns',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: "string",
                                example: "Data syncronized successfully!"
                            }
                        }
                    }
                }
            }
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

const createCourses = {
    tags: ['Sheets'],
    operationId: 'createCourses',
    description: 'Bulk insert of pack of courses to sql from sheets',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        create: {
                            type: 'array',
                            items: {
                                ...j2s(createCourseScheme).swagger
                            }
                        },

                    }
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successful bulking creation of courses',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: "string",
                                example: "Data syncronized successfully!"
                            }
                        }
                    }
                }
            }
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

const createClassEvents = {
    tags: ['Sheets'],
    operationId: 'createClassEvents',
    description: 'Bulk insert of pack of class events to sql from sheets',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        create: {
                            type: 'array',
                            items: {
                                ...j2s(createClassEventScheme).swagger
                            }
                        },

                    }
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successful bulking creation of class events',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: "string",
                                example: "Data syncronized successfully!"
                            }
                        }
                    }
                }
            }
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

const createInternCourses = {
    tags: ['Sheets'],
    operationId: 'createInternCourses',
    description: 'Bulk insert of pack of class internCourses to sql from sheets',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        create: {
                            type: 'array',
                            items: {
                                ...j2s(createInternCourseSchema).swagger
                            }
                        },

                    }
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successful bulking creation of class events',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: "string",
                                example: "Data syncronized successfully!"
                            }
                        }
                    }
                }
            }
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
    '/google-sheets/synchronizeData/create/intern': {
        put: createInterns,
    },
    '/google-sheets/synchronizeData/create/course': {
        put: createCourses
    },
    '/google-sheets/synchronizeData/create/classEvent': {
        put: createClassEvents
    },
    '/google-sheets/synchronizeData/create/internCourse': {
        put: createInternCourses
    }
}

export default routes;