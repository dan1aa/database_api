import j2s from 'joi-to-swagger';
import { createInternScheme } from '@request-schemas/intern.request-schema';
import { createCourseScheme } from '@request-schemas/course.request-schema';
import { createClassEventScheme } from '@request-schemas/class-event.request-shema';
import { internCourseSchema } from '@request-schemas/intern-course.request-schema';

const googleSheetsCreateInterns = {
    tags: ['Sheets'],
    operationId: 'googleSheetsIntern',
    description: 'Bulk insert of pack of interns to sql from sheets and delete interns from delete part of request body',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        insert: {
                            type: 'array',
                            items: {
                                ...j2s(createInternScheme).swagger
                            }
                        },
                        delete: {
                            type: 'array',
                            items: {
                                ...j2s(createInternScheme).swagger
                            }
                        }
                    }
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successful bulking creation of interns and deleting of interns',
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

const googleSheetsCreateCourse = {
    tags: ['Sheets'],
    operationId: 'googleSheetsCourse',
    description: 'Bulk insert of pack of courses to sql from sheets and delete courses from delete part of request body',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        insert: {
                            type: 'array',
                            items: {
                                ...j2s(createCourseScheme).swagger
                            }
                        },
                        delete: {
                            type: 'array',
                            items: {
                                ...j2s(createCourseScheme).swagger
                            }
                        }
                    }
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successful bulking creation of course and deleting of course',
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

const googleSheetsCreateClassEvent = {
    tags: ['Sheets'],
    operationId: 'googleSheetsClassEvent',
    description: 'Bulk insert of pack of class events to sql from sheets and delete class events from delete part of request body',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        insert: {
                            type: 'array',
                            items: {
                                ...j2s(createClassEventScheme).swagger
                            }
                        },
                        delete: {
                            type: 'array',
                            items: {
                                ...j2s(createClassEventScheme).swagger
                            }
                        }
                    }
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successful bulking creation of class event and deleting of class event',
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

const googleSheetsCreateInternCourse = {
    tags: ['Sheets'],
    operationId: 'googleSheetsInternCourse',
    description: 'Bulk insert of pack of intern_course to sql from sheets and delete intern_course from delete part of request body',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        insert: {
                            type: 'array',
                            items: {
                                ...j2s(internCourseSchema).swagger
                            }
                        },
                        delete: {
                            type: 'array',
                            items: {
                                ...j2s(internCourseSchema).swagger
                            }
                        }
                    }
                },
            },
        },
        required: true,
    },
    responses: {
        '200': {
            description: 'Successful bulking creation of intern_course and deleting of intern_course',
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
    '/google-sheets/synchronizeData/intern': {
        put: googleSheetsCreateInterns,
    },
    '/google-sheets/synchronizeData/course': {
        put: googleSheetsCreateCourse
    },
    '/google-sheets/synchronizeData/classEvent': {
        put: googleSheetsCreateClassEvent
    },
    '/google-sheets/synchronizeData/internCourse': {
        put: googleSheetsCreateInternCourse
    }
}

export default routes;