import { Router } from 'express';
import UserController from '../app/controllers/UserController';
import TherapistController from '../app/controllers/TherapistController';
import SessionController from '../app/controllers/SessionController';
import AuthMiddleware from '../app/middleware/auth';
import ScheduleController from '../app/controllers/ScheduleController';
import AvatarController from '../app/controllers/AvatarController';

const routes = new Router();

routes.post('/register-user', UserController.store);
routes.post('/sign', SessionController.store);

routes.put('/users', AuthMiddleware, UserController.update);
routes.delete('/users', AuthMiddleware, UserController.delete);
routes.post('/register-therapist', AuthMiddleware, TherapistController.store);
routes.post('/schedule-therapist', AuthMiddleware, ScheduleController.store);
routes.get('/list-therapist', AuthMiddleware, TherapistController.index);
routes.post('/avatar', AuthMiddleware, AvatarController.store);

export default routes;
