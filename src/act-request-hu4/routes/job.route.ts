import { Router } from 'express';
import * as JobController from '../controllers/jobs.controller';

const router = Router();

router.post('/jobs', JobController.createJobController);
router.get('/jobs', JobController.getJobs);
router.get('/jobs', JobController.getJob);
router.put('/jobs', JobController.updateJob);
router.delete('/jobs', JobController.deleteJob);

export default router;
