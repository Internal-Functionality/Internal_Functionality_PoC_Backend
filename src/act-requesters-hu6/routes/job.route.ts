import { Router } from 'express';
import * as JobController from '../controllers/jobs.controller';

const router = Router();

router.post('/jobs', JobController.createJobController);
router.get('/jobs', JobController.getJobs);
router.get('/jobs', JobController.getJob);
router.put('/jobs', JobController.updateJob);
router.delete('/jobs', JobController.deleteJob);

router.post('/telemetry/JobsReviews', JobController.createJobController);
router.get('/telemetry/JobsReviews', JobController.getJobs);
router.get('/telemetry/JobsReviews/:id', JobController.getJob);
router.put('/telemetry/JobsReviews', JobController.updateJob);
router.delete('/telemetry/JobsReviews/:id', JobController.deleteJob);

export default router;
