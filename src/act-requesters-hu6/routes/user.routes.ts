import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = Router();

router.post('/telemetry/UserReviews', UserController.createUserController);
router.get('/telemetry/UserReviews', UserController.getUsers);
router.get('/telemetry/UserReviews/:id', UserController.getUser);
router.put('/telemetry/UserReviews', UserController.updateUser);
router.delete('/telemetry/UserReviews/:id', UserController.deleteUser);

export default router;