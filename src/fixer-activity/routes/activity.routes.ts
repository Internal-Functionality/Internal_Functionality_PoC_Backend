import { Router } from 'express';
import * as ActivityController from '../controllers/activity.controller';

const router = Router();

router.get('/fixer-activity', ActivityController.getFixerActivity);
router.patch('/fixer-activity/:id/accept', ActivityController.acceptBooking);
router.patch('/fixer-activity/:id/cancel', ActivityController.cancelBooking);

export default router;