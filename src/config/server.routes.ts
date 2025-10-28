import { Router } from 'express';
import HealthRoutes from '../api/health/health.routes';
import authRouter from '../api/visitors/auth.routes';
import activityRouter from '../api/visitors/activity.routes';
import search from '../api/search/search.routes';
import UserRoutes from '../api/users/users.routes';
import JobRoutes from '../api/jobs/jobs.routes';
import ActivitRoutes from '../api/activities/activities.routes';
import ActivityRoutes from '../api/bookings/bookings.routes';

const router = Router();

router.use('/', search);
router.use('/api', HealthRoutes);
router.use('/api', authRouter);
router.use('/api', activityRouter);
router.use('/api', UserRoutes);
router.use('/api', JobRoutes);
router.use('/', UserRoutes);
router.use('/', JobRoutes);
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
