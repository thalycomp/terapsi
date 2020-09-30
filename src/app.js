import 'dotenv/config';

import express from 'express';
import path from 'path';
import cors from 'cors';

import globalRouter from './routes/globalRouter';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      '/avatar',
      express.static(path.resolve(__dirname, '..', 'uploads'))
    );
  }

  routes() {
    this.server.use(globalRouter);
  }
}

export default new App().server;
