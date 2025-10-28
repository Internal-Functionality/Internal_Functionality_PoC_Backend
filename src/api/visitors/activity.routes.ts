import { Router } from 'express';
import { LogActivity, getActivities } from './visitor-activity.controller';

const router = Router();

router.post('/activity', LogActivity);
router.get('/activity', getActivities);

export default router;
