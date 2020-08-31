import express from 'express';

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
    this.server.use(express.json());
  }

  routes() {
    this.server.use(globalRouter);
  }
}

export default new App().server;
