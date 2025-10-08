import { Router } from 'express';
import * as JobController from '../controllers/jobs.controller';

const router = Router();

router.post('/telemetry/JobsReviews', JobController.createJobController);
router.get('/telemetry/JobsReviews', JobController.getJobs);
router.put('/telemetry/JobsReviews', JobController.updateJob);
router.delete('/telemetry/JobsReviews', JobController.deleteJob);

export default router;