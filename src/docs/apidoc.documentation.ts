import InternsRouterDocumentation from './routes/interns.documentation.route';
import ContactsRouterDocumentation from './routes/contacts.documentation.route';
import CoursesRouterDocumentation from './routes/courses.documentation.route';
import CourseResultsDocumentation from './routes/course-results.documentation.route';
import GoogleSheetsRouterDocumentation from './routes/google-sheets-create.documentation';
import ClassEventsDocumentation from './routes/class-events.documentation.route';

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
        { name: 'Sheets'}, 
    ],
    paths: {
        ...InternsRouterDocumentation,
        ...CoursesRouterDocumentation,
        ...ContactsRouterDocumentation,
        ...GoogleSheetsRouterDocumentation,
        ...CourseResultsDocumentation,
        ...ClassEventsDocumentation
    }
};

export { apiDocumentation };