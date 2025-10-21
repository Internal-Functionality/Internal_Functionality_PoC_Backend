import { Router } from 'express';
import {LogActivity, getActivities} from '../controllers/activity';

const router = Router();

router.post('/activity', LogActivity);
router.get('/activity', getActivities);

export default router;