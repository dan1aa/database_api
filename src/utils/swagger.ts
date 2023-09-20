import path from "path";

export const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Nobel Database API",
            version: "0.1.0",
            description:
                "Endpoints for database data management",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            servers: ["http://localhost:5000", "test"]
        },
    },
    apis: [path.join(__dirname, '../routes/intern.route.ts')],
};