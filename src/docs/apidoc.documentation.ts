import InternsRouterDocumentation from './routes/interns.documentation.route';
import ContactsRouterDocumentation from './routes/contacts.documentation.route';
import CoursesRouterDocumentation from './routes/courses.documentation.route';
import CourseResultsDocumentation from './routes/course-results.documentation.route';
import ClassEventsDocumentation from './routes/class-events.documentation.route';
import InternCoursesDocumentation from './routes/intern-courses.documentation.route';
import InternCourseRolesDocumentation from './routes/intern-course-role.documentation.route';
import FacilitatorResultsDocumentation from './routes/facilitator-results.documentation.route';
import OversightResultsDocumentation from './routes/oversight-results.documentation';

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
        { name: 'Intern Course'},
        { name: 'Intern Course Role'},
        { name: 'Facilitator Results'},
        { name: 'Oversight Results'},
    ],
    paths: {
        ...InternsRouterDocumentation,
        ...CoursesRouterDocumentation,
        ...ContactsRouterDocumentation,
        ...CourseResultsDocumentation,
        ...ClassEventsDocumentation,
        ...InternCoursesDocumentation,
        ...InternCourseRolesDocumentation,
        ...FacilitatorResultsDocumentation,
        ...OversightResultsDocumentation
    }
};

export { apiDocumentation };