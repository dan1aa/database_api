"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiDocumentation = void 0;
const interns_documentation_route_1 = __importDefault(require("./routes/interns.documentation.route"));
const courses_documentation_route_1 = __importDefault(require("./routes/courses.documentation.route"));
const course_results_documentation_route_1 = __importDefault(require("./routes/course-results.documentation.route"));
const class_events_documentation_route_1 = __importDefault(require("./routes/class-events.documentation.route"));
const feedback_on_intern_documentation_route_1 = __importDefault(require("./routes/feedback-on-intern.documentation.route"));
const feedback_on_facilitator_documentation_route_1 = __importDefault(require("./routes/feedback-on-facilitator.documentation.route"));
const event_feedbacks_documentation_route_1 = __importDefault(require("./routes/event-feedbacks.documentation.route"));
const apiDocumentation = {
    openapi: '3.0.1',
    info: {
        version: '1.3.0',
        title: 'Nobel REST API - Documentation',
    },
    servers: [],
    tags: [
        { name: 'Interns', },
        { name: 'Courses' },
        { name: 'Course Results' },
        { name: 'Class Events' },
        { name: 'Feedback on Intern' },
        { name: 'Feedback on Facilitator' },
        { name: 'Event Feedbacks' }
    ],
    paths: Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({}, interns_documentation_route_1.default), courses_documentation_route_1.default), course_results_documentation_route_1.default), class_events_documentation_route_1.default), feedback_on_intern_documentation_route_1.default), feedback_on_facilitator_documentation_route_1.default), event_feedbacks_documentation_route_1.default)
};
exports.apiDocumentation = apiDocumentation;
