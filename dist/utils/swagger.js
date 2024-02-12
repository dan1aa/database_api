"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerOptions = void 0;
const apidoc_documentation_1 = require("@docs/apidoc.documentation");
exports.swaggerOptions = {
    swaggerDefinition: Object.assign(Object.assign({}, apidoc_documentation_1.apiDocumentation), { basePath: '/' }),
    apis: ['./dist/routes/*.js'],
};
