import swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'Project and Task Managemnet System',
      version: '0.1.0',
      description:
        'This is a simple CRUD API application made with Node, Typescript, Express and documented with Swagger',
      license: {
        name: 'MIT',
        url: 'https://spdx.org/licenses/MIT.html',
      },
      contact: {
        name: 'ProjectManagement',
        url: 'https://projectmanagement.com',
        email: 'info@email.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./routes/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export function swaggerDocs(app: any, port: string | number) {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
