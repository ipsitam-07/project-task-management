import swaggerJsdoc from 'swagger-jsdoc';
import * as swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

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
        url: 'http://localhost',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '65a1f6e031007b00e0057930',
            },
            name: {
              type: 'string',
              example: 'Ipsita Mohanty',
            },
            email: {
              type: 'string',
              example: 'ipsita@test.com',
            },
          },
        },

        RegisterUser: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: {
              type: 'string',
              example: 'Ipsita',
            },
            email: {
              type: 'string',
              example: 'ipsita@test.com',
            },
            password: {
              type: 'string',
              example: 'password123',
            },
          },
        },

        LoginUser: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              example: 'ipsita@test.com',
            },
            password: {
              type: 'string',
              example: 'password123',
            },
          },
        },

        Project: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              example: '697248b70f319dcb8a6105ba',
            },
            name: {
              type: 'string',
              example: 'Task Management',
            },
            description: {
              type: 'string',
              example: 'CRUD API assignment',
            },
            owner: {
              type: 'string',
              example: '6972489c0f319dcb8a6105b7',
            },
            createdAt: {
              type: 'string',
              example: '2026-01-22T15:56:39.997Z',
            },
            updatedAt: {
              type: 'string',
              example: '2026-01-22T15:56:39.997Z',
            },
          },
        },

        CreateProject: {
          type: 'object',
          required: ['name'],
          properties: {
            name: {
              type: 'string',
              example: 'Task Management',
            },
            description: {
              type: 'string',
              example: 'CRUD API assignment',
            },
          },
        },
      },
    },
  },
  apis: ['dist/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: Express) => {
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
