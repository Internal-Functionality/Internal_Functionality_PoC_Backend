import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = Router();

router.post('/telemetry/UserReviews', UserController.createUserController);
router.get('/telemetry/UserReviews', UserController.getUsers);
router.put('/telemetry/UserReviews', UserController.updateUser);
router.delete('/telemetry/UserReviews', UserController.deleteUser);

export default router;