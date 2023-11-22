import j2s from 'joi-to-swagger';

import { modifyCourseSheetsScheme } from '@request-schemas/course.request-schema';
import { modifyClassEventSheetsScheme } from '@request-schemas/class-event.request-shema';
import { modifyInternCourseSheetsScheme } from '@request-schemas/intern-course.request-schema';

const updateCourses = {
    tags: ['SheetsUpdate'],
    operationId: 'updateCourses',
    description: 'Bulk update of pack of courses to sql from sheets',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        update: {
                            type: 'array',
                            items: {
                                ...j2s(modifyCourseSheetsScheme).swagger
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
            description: 'Successful bulking update of courses',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: "string",
                                example: "Data updated successfully!"
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

const updateClassEvents = {
    tags: ['SheetsUpdate'],
    operationId: 'updateClassEvents',
    description: 'Bulk update of pack of class events to sql from sheets',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        update: {
                            type: 'array',
                            items: {
                                id: { type: 'number' },
                                ...j2s(modifyClassEventSheetsScheme).swagger
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
            description: 'Successful bulking update of class events',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: "string",
                                example: "Data updated successfully!"
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

const updateInternCourses = {
    tags: ['SheetsUpdate'],
    operationId: 'updateInternCourses',
    description: 'Bulk update of pack of class internCourses to sql from sheets',
    requestBody: {
        content: {
            'application/json': {
                schema: {
                    type: 'object',
                    properties: {
                        update: {
                            type: 'array',
                            items: {
                                ...j2s(modifyInternCourseSheetsScheme).swagger
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
            description: 'Successful bulking update of class events',
            content: {
                'application/json': {
                    schema: {
                        type: 'object',
                        properties: {
                            message: {
                                type: "string",
                                example: "Data updated successfully!"
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
    '/google-sheets/synchronizeData/update/course': {
        put: updateCourses
    },
    '/google-sheets/synchronizeData/update/classEvent': {
        put: updateClassEvents
    },
    '/google-sheets/synchronizeData/update/internCourse': {
        put: updateInternCourses
    }
}

export default routes;