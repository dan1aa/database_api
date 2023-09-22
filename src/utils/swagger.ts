import { apiDocumentation } from "@docs/apidoc.documentation";

export const swaggerOptions = {
    swaggerDefinition: {
      ...apiDocumentation,
      basePath: '/',
    },
    apis: ['./dist/routes/*.js'], 
  };
