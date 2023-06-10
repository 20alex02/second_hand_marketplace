import express from 'express';
import cors from 'cors';
import { config as configEnvVariables } from 'dotenv';
import { env } from 'process';
import type { ApiResponse } from './controllers/types';
import authenticateToken from './middleware/authMiddleware';
import controllers from './controllers/index';
import upload from './middleware/imagesMiddleware';
import path from 'path';

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

// send images to frontend
app.use('/api/images', express.static(path.join(__dirname, 'images')));

// USER
app.post('/api/user', controllers.user.create);

app.post('/api/secret', (req, res) => {
  return controllers.secret.create(req, res, secretKey);
});

app.patch('/api/user', authenticateToken, (req, res) => {
  return controllers.user.update(req, res, secretKey);
});

app.get('/api/user/:id', authenticateToken, controllers.user.getOne);

// ADVERTISEMENT
app.get('/api/advertisement/types', controllers.advertisement.getTypes);

app.get('/api/advertisement/:id', controllers.advertisement.getOne);

app.get('/api/advertisement', controllers.advertisement.getAll);

app.post('/api/advertisement', authenticateToken, upload, (req, res) => {
  return controllers.advertisement.create(req, res, secretKey);
});

app.delete('/api/advertisement/:id', authenticateToken, (req, res) => {
  return controllers.advertisement.delete(req, res, secretKey);
});

// CATEGORY
app.post('/api/category', controllers.category.create);

app.get('api/category/:id', (req, res) => {
  return controllers.category.getOne(req, res, secretKey);
});

app.get('/api/category', controllers.category.getAll);

app.patch('/api/category/:id', (req, res) => {
  return controllers.category.update(req, res, secretKey);
});

// PARTICIPANT
app.get('/api/participant/:advertisementId', authenticateToken, (req, res) => {
  return controllers.participant.getAll(req, res, secretKey);
});

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
