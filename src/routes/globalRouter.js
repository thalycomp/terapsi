import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import TherapistController from '../app/controllers/TherapistController';
import SessionController from '../app/controllers/SessionController';
import AuthMiddleware from '../app/middleware/auth';
import ScheduleController from '../app/controllers/ScheduleController';

const routes = new Router();

routes.post('/register-user', UserController.store);
routes.post('/sign', SessionController.store);

routes.put('/users', AuthMiddleware, UserController.update);
routes.post('/register-therapist', AuthMiddleware, TherapistController.store);
routes.post('/schedule-therapist', AuthMiddleware, ScheduleController.store);

export default routes;
