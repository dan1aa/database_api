import { createClassEvent } from "@services/class-event.service"
import { createCourse } from "@services/course.service"
import { createIntern, createInternCourse } from "@services/intern.service"
import { db } from "@utils/db.server"

type createFunctionsType = { // typescript i love you
    [key: string]: any
}

export const dbObjects: createFunctionsType = {
    'intern': {
        db: db.intern,
        create: createIntern
    },
    'course': {
        db: db.course,
        create: createCourse
    },
    'internCourse': {
        db: db.internCourse,
        create: createInternCourse
    },
    'classEvent': {
        db: db.classEvent,
        create: createClassEvent
    }
}