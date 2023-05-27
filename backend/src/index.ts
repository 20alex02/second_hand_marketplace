import express from 'express';
import cors from 'cors';
import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import type { ApiResponse } from './controllers/types';

configEnvVariables();
const app = express();
const port = env['PORT'] ?? 3000;

// CORS middlware
app.use(cors());

// JSON middleware
app.use(express.json());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

app.get('/api/data', (_req, res) => {
  const response: ApiResponse<object> = {
    status: 'success',
    data: {
      greeting: 'Hello from the API!',
    },
    message: 'Data fetched successfully.',
  };

  return res.status(200).send(response);
});

// DO NOT MODIFY THE PRECEDING code ^^

/*
  Continue here. Write your RESTful API routes here. Use `Router` from express
  to divide the routes into smaller parts. Routes should use the
  `employeeRepository` - you need to first finish it. More is in the
  assignment issue.
*/

// DO NOT MODIFY THE FOLLOWING code:

// No route was taken - 404 - Resource (API endpoint) not found.
app.use((_req, res) => {
  const response: ApiResponse<object> = {
    status: 'failure',
    data: {},
    error: 'No matching endpoint was found.',
  };

  return res.status(404).send(response);
});

if (env['NODE_ENV'] !== 'test') {
  app.listen(port, () => {
    console.log(
      `[${new Date().toISOString()}] RESTful API is listening on port ${port}`
    );
  });
}

export default app;
