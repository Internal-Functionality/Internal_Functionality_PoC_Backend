import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = Router();
router.post('/users', UserController.createUserController);
router.get('/users', UserController.getUsers);
router.get('/users', UserController.getUser);
router.put('/users', UserController.updateUser);
router.delete('/users', UserController.deleteUser);

router.post('/telemetry/UserReviews', UserController.createUserController);
router.get('/telemetry/UserReviews', UserController.getUsers);
router.get('/telemetry/UserReviews/:id', UserController.getUser);
router.put('/telemetry/UserReviews', UserController.updateUser);
router.delete('/telemetry/UserReviews/:id', UserController.deleteUser);

export default router;
