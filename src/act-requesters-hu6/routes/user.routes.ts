import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = Router();

router.post('/telemetry', UserController.createUserController);

export default router;