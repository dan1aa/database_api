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

export { createCourseSchema }