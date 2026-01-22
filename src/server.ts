import mongoose from 'mongoose';
import app from './app';
import config from './config/app.config';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const PORT = config.port;
const MONGO_URI = config.mongoURI;

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Project and Task Managemnet System",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Node, Typescript, Express and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "ProjectManagement",
        url: "https://projectmanagement.com",
        email: "info@email.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.ts"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api/docs",
  swaggerUi.serve,
  swaggerUi.setup(specs)
);

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully');

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server');
    process.exit(1);
  }
};

startServer();
