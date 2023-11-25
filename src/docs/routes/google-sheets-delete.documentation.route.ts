// import j2s from 'joi-to-swagger';
// import { modifyCourseSheetsScheme } from '@request-schemas/course.request-schema';
// import { modifyClassEventSheetsScheme } from '@request-schemas/class-event.request-shema';
// import { modifyInternCourseSheetsScheme } from '@request-schemas/intern-course.request-schema';

// const deleteCourses = {
//     tags: ['SheetsDelete'],
//     operationId: 'deleteCourses',
//     description: 'Bulk delete of pack of courses',
//     requestBody: {
//         content: {
//             'application/json': {
//                 schema: {
//                     type: 'object',
//                     properties: {
//                         delete: {
//                             type: 'array',
//                             items: {
//                                 ...j2s(modifyCourseSheetsScheme).swagger
//                             }
//                         },

//                     }
//                 },
//             },
//         },
//         required: true,
//     },
//     responses: {
//         '200': {
//             description: 'Successful bulking delete of courses',
//             content: {
//                 'application/json': {
//                     schema: {
//                         type: 'object',
//                         properties: {
//                             message: {
//                                 type: "string",
//                                 example: "Data deleted successfully!"
//                             }
//                         }
//                     }
//                 }
//             }
//         },
//         '500': {
//             description: 'Internal Server Error',
//             content: {
//                 'application/json': {
//                     schema: {
//                         type: 'object',
//                         properties: {
//                             message: {
//                                 type: 'string',
//                                 example: 'Internal server error',
//                             },
//                         },
//                     },
//                 },
//             },
//         }
//     },
// };

// const deleteClassEvents = {
//     tags: ['SheetsDelete'],
//     operationId: 'deleteClassEvents',
//     description: 'Bulk delete of pack of classEvents',
//     requestBody: {
//         content: {
//             'application/json': {
//                 schema: {
//                     type: 'object',
//                     properties: {
//                         delete: {
//                             type: 'array',
//                             items: {
//                                 id: { type: 'number' },
//                                 ...j2s(modifyClassEventSheetsScheme).swagger
//                             }
//                         },

//                     }
//                 },
//             },
//         },
//         required: true,
//     },
//     responses: {
//         '200': {
//             description: 'Successful bulking delete of classEvents',
//             content: {
//                 'application/json': {
//                     schema: {
//                         type: 'object',
//                         properties: {
//                             message: {
//                                 type: "string",
//                                 example: "Data deleted successfully!"
//                             }
//                         }
//                     }
//                 }
//             }
//         },
//         '500': {
//             description: 'Internal Server Error',
//             content: {
//                 'application/json': {
//                     schema: {
//                         type: 'object',
//                         properties: {
//                             message: {
//                                 type: 'string',
//                                 example: 'Internal server error',
//                             },
//                         },
//                     },
//                 },
//             },
//         }
//     },
// };

// const deleteInternCourses = {
//     tags: ['SheetsDelete'],
//     operationId: 'deleteInternCourses',
//     description: 'Bulk delete of pack of internCourses',
//     requestBody: {
//         content: {
//             'application/json': {
//                 schema: {
//                     type: 'object',
//                     properties: {
//                         delete: {
//                             type: 'array',
//                             items: {
//                                 ...j2s(modifyInternCourseSheetsScheme).swagger
//                             }
//                         },

//                     }
//                 },
//             },
//         },
//         required: true,
//     },
//     responses: {
//         '200': {
//             description: 'Successful bulking delete of class events',
//             content: {
//                 'application/json': {
//                     schema: {
//                         type: 'object',
//                         properties: {
//                             message: {
//                                 type: "string",
//                                 example: "Data deleted successfully!"
//                             }
//                         }
//                     }
//                 }
//             }
//         },
//         '500': {
//             description: 'Internal Server Error',
//             content: {
//                 'application/json': {
//                     schema: {
//                         type: 'object',
//                         properties: {
//                             message: {
//                                 type: 'string',
//                                 example: 'Internal server error',
//                             },
//                         },
//                     },
//                 },
//             },
//         }
//     },
// };

// const routes = {
//     '/google-sheets/synchronizeData/delete/course': {
//         delete: deleteCourses
//     },
//     '/google-sheets/synchronizeData/delete/classEvent': {
//         delete: deleteClassEvents
//     },
//     '/google-sheets/synchronizeData/delete/internCourse': {
//         delete: deleteInternCourses
//     }
// }

// export default routes;