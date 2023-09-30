// const createInternSchema = {
//     type: 'object',
//     properties: {
//         first_name: {
//             type: 'string',
//             example: 'John',
//         },
//         last_name: {
//             type: 'string',
//             example: 'Snow',
//         },
//         email: {
//             type: 'string',
//             format: 'email',
//             example: 'john.snow@email.com',
//         },
//         cohort: {
//             type: 'string',
//             example: 'SEP 16 WE 23',
//         },
//         explorer_id: {
//             type: 'string',
//             example: 'explorerE8Jr5',
//         },
//         discord_id: {
//             type: 'string',
//             example: '605636683f6e29c81c8b2db0',
//         },
//     },
//     required: ['first_name', 'last_name', 'email', 'cohort', 'explorer_id'],
// }

// export { createInternSchema }

import j2s from 'joi-to-swagger';
import { createInternScheme, updateInternSheme } from '@request-schemas/intern.request-schema';

export const swaggerCreateInternScheme = j2s(createInternScheme).swagger;
export const swaggerUpdateInternScheme = j2s(updateInternSheme).swagger;