import { createInternSchema } from "./intern.schema"

const createCourseSchema = {
    type: 'object',
    properties: {
        course_name: {
            type: 'string',
            example: 'iIWD326aa-1-b'
        },
        start_date: {
            type: 'string',
            example: '2023-09-12'
        },
        end_date: {
            type: 'string',
            example: '2023-10-12'
        }
    },
    required: ["course_name", "start_date", "end_date"]
}

const getCourseDetailsListShema = {
    type: 'object',
    properties: {
        IWD335: {
            type: 'object',
            properties: {
                startDate: {
                    type: 'string',
                    example: "6/6/2023"
                },
                endDate: {
                    type: 'string',
                    example: "6/6/2023"
                },
                schedule: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            meet_num: {
                                type: 'string',
                                example: 1
                            },
                            event_date: {
                                type: 'string',
                                example: "2023-06-06T00:00:00.000Z"
                            }
                        }
                    }
                },
                participantsInfo: {
                    type: 'object',
                    properties: {
                        oversights: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'number',
                                        example: '1'
                                    },
                                    ...createInternSchema.properties
                                }
                            }
                        },
                        facilitators: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'number',
                                        example: '1'
                                    },
                                    ...createInternSchema.properties
                                }
                            }
                        },
                        interns: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    id: {
                                        type: 'number',
                                        example: '1'
                                    },
                                    ...createInternSchema.properties
                                }
                            }
                        }
                    }
                }
            },
        },
    }
}

export { createCourseSchema, getCourseDetailsListShema }