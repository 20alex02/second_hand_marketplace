import express from 'express';
import cors from 'cors';
import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import type { ApiResponse } from './controllers/types';
import authenticateToken from './middleware/authMiddleware';
import controllers from './controllers/index';

configEnvVariables();
const app = express();
app.disable('etag');
const port = env['PORT'] ?? 3000;
const secretKey = env['SECRET_KEY'];

// CORS middlware
app.use(cors());

// JSON middleware
app.use(express.json());

// parse URL encoded strings
app.use(express.urlencoded({ extended: true }));

// USER
app.post('/api/user', controllers.user.create);

app.post('/api/secret', (_req, res) => {
  return controllers.secret.create(_req, res, secretKey as string);
});

// ADVERTISEMENT
app.get('/api/advertisement/types', controllers.advertisement.listTypes);

app.post('/api/advertisement', authenticateToken, (_req, res) => {
  return controllers.advertisement.create(_req, res, secretKey as string);
});

app.post('/api/advertisements', controllers.advertisement.search);

// CATEGORY
app.post('/api/category', controllers.category.create);

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
