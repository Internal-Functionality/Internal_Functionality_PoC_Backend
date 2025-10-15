import { Router } from 'express';
import * as UserController from '../controllers/user.controller';

const router = Router();

router.post('/users', UserController.createUserController);
router.get('/users', UserController.getUsers);
router.get('/users', UserController.getUser);
router.put('/users', UserController.updateUser);
router.delete('/users', UserController.deleteUser);

export default router;
