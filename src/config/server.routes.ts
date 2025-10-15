import { Router } from 'express';
import HealthRoutes from '../modules/health/health.routes';
import authRouter from "../visitors/routes/auth";
import activityRouter from "../visitors/routes/activity";
import search from '../act-request-hu4/routes/search.routes';
import UserRoutes from '../act-requesters-hu6/routes/user.routes';
import JobRoutes from '../act-requesters-hu6/routes/job.route';
import ActivitRoutes from '../act-requesters-hu6/routes/activity.route';
import ActivityRoutes from '../fixer-activity/routes/activity.routes';

const router = Router();

router.use('/', search);
router.use('/', UserRoutes4);
router.use('/', JobRoutes4);
router.use('/api', HealthRoutes);
router.use("/api", authRouter);
router.use("/api", activityRouter);
router.use('/api', UserRoutes);
router.use('/api', JobRoutes);
router.use('/api', ActivitRoutes);
router.use('/api', ActivityRoutes);

//..
router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;
