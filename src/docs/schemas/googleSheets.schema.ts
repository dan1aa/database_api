const modifyInternCoursesBody = {
    type: 'object',
    properties: {
        intern_id: {
            type: 'number',
            example: 3
        },
        course_id: {
            type: 'number',
            example: 1
        },
        role_id: {
            type: 'number',
            example: 2
        }
    }
}

const modifyInternCoursesScheme = {
    type: 'object',
    properties: {
        insert: {
            type: 'array',
            items: modifyInternCoursesBody
        },
        delete: {
            type: 'array',
            items: modifyInternCoursesBody
        }
    }
}

//COURSES

const modifyCoursesBody = {
    type: 'object',
    properties: {
        course_name: {
            type: 'string',
            example: 'iIWD326aa-1-b'
        },
        start_date: {
            type: 'string',
            example: '2023-09-10'
        },
        end_date: {
            type: 'string',
            example: '2023-10-10'
        }
    }
}

const modifyCoursesScheme = {
    type: 'object',
    properties: {
        insert: {
            type: 'array',
            items: modifyCoursesBody
        },
        delete: {
            type: 'array',
            items: modifyCoursesBody
        }
    }
}


//INTERNS

const modifyInternsBody = {
    type: 'object',
    properties: {
        explorer_id: {
            type: 'string',
            example: 'explorerE8Jr5',
        },
        discord_id: {
            type: 'string',
            example: '605636683f6e29c81c8b2db0',
        },
        first_name: {
            type: 'string',
            example: 'John',
        },
        last_name: {
            type: 'string',
            example: 'Snow',
        },
        email: {
            type: 'string',
            format: 'email',
            example: 'john.snow@email.com',
        },
        cohort: {
            type: 'string',
            example: 'SEP 16 WE 23',
        },
    }
}

const modifyInternsScheme = {
    type: 'object',
    properties: {
        insert: {
            type: 'array',
            items: modifyInternsBody
        },
        delete: {
            type: 'array',
            items: modifyInternsBody
        }
    }
}

export { modifyCoursesBody, modifyCoursesScheme, modifyInternCoursesBody, modifyInternCoursesScheme, modifyInternsBody, modifyInternsScheme }