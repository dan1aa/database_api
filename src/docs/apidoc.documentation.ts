import InternsRouterDocumentation from './routes/interns.documentation.route';
import CoursesRouterDocumentation from './routes/courses.documentation.route';
import CourseResultsDocumentation from './routes/course-results.documentation.route';
import ClassEventsDocumentation from './routes/class-events.documentation.route';
import FeedbackOnInternDocumentation from './routes/feedback-on-intern.documentation.route';
import FeedbackOnFacilitatorDocumentation from './routes/feedback-on-facilitator.documentation.route';

const apiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'Nobel REST API - Documentation',
    },
    servers: [],
    tags: [
        { name: 'Interns',},
        { name: 'Courses'}, 
        { name: 'Course Results'}, 
        { name: 'Class Events' },
        { name: 'Feedback on Intern'},
        { name: 'Feedback on Facilitator'},
    ],
    paths: {
        ...InternsRouterDocumentation,
        ...CoursesRouterDocumentation,
        ...CourseResultsDocumentation,
        ...ClassEventsDocumentation,
        ...FeedbackOnInternDocumentation,
        ...FeedbackOnFacilitatorDocumentation
    }
};

export { apiDocumentation };