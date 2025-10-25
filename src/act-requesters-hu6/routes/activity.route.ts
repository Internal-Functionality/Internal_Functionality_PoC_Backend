import { Router } from 'express';
import * as ActivityController from '../controllers/activities.controller';

const router = Router();

router.post('/telemetry/ActivityReviews', ActivityController.createActivityController);
router.get('/telemetry/ActivityReviews', ActivityController.getActivities);
router.get('/telemetry/ActivityReviews/stats', ActivityController.getClickStats);
router.get('/telemetry/ActivityReviews/debug/clicks', ActivityController.debugClicks);
router.get('/telemetry/ActivityReviews/:id', ActivityController.getActivity);
router.put('/telemetry/ActivityReviews/:id', ActivityController.updateActivity);
router.delete('/telemetry/ActivityReviews/:id', ActivityController.deleteActivity);

export default router;
