import { Router } from 'express';
import * as ActivityController from '../controllers/activities.controller';

const router = Router();

router.post('/telemetry/ActivityReviews', ActivityController.createActivityController);
router.get('/telemetry/ActivityReviews', ActivityController.getActivities);
router.put('/telemetry/ActivityReviews', ActivityController.updateActivity);
router.delete('/telemetry/ActivityReviews', ActivityController.deleteActivity);

export default router;