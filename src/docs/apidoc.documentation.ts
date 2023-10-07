import InternsRouterDocumentation from './routes/interns.documentation.route';
import ContactsRouterDocumentation from './routes/contacts.documentation.route';
import CoursesRouterDocumentation from './routes/courses.documentation.route';
import GoogleSheetsRouterDocumentation from './routes/googleSheets.documentation.route';

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
        { name: 'Sheets'}, 
    ],
    paths: {
        ...InternsRouterDocumentation,
        ...CoursesRouterDocumentation,
        ...ContactsRouterDocumentation,
        ...GoogleSheetsRouterDocumentation
    }

};

export { apiDocumentation };