import InternsRouterDocumentation from './routes/interns.documentation.route';
import ContactsRouterDocumentation from './routes/contacts.documentation.route';
import CoursesRouterDocumentation from './routes/courses.documentation.route';
import CourseResultsDocumentation from './routes/course-results.documentation.route';
import GoogleSheetsCreateRouterDocumentation from './routes/google-sheets-create.documentation.route';
import ClassEventsDocumentation from './routes/class-events.documentation.route';
import GoogleSheetsUpdateRouterDocumentation from './routes/google-sheets-update.documentation.route';
import GoogleSheetsDeleteRouterDocumentation from './routes/google-sheets-delete.documentation.route';

const apiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'Nobel REST API - Documentation',
    },
    servers: [],
    tags: [
        { name: 'Contacts'},
        { name: 'Interns',},
        { name: 'Courses'}, 
        { name: 'Course Results'}, 
        { name: 'Class Events' },
        { name: 'SheetsCreate'},
        { name: 'SheetsUpdate' } 
    ],
    paths: {
        ...InternsRouterDocumentation,
        ...CoursesRouterDocumentation,
        ...ContactsRouterDocumentation,
        ...CourseResultsDocumentation,
        ...ClassEventsDocumentation,
        ...GoogleSheetsCreateRouterDocumentation,
        ...GoogleSheetsUpdateRouterDocumentation,
        ...GoogleSheetsDeleteRouterDocumentation
    }
};

export { apiDocumentation };