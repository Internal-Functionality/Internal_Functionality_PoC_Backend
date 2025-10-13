import { Router } from 'express';
import HealthRoutes from '../modules/health/health.routes';
<<<<<<< HEAD
import ActivityRoutes from '../fixer-activity/routes/activity.routes';
=======
import UserRoutes from '../act-requesters-hu6/routes/user.routes';
import JobRoutes from '../act-requesters-hu6/routes/job.route';
import ActivitRoutes from '../act-requesters-hu6/routes/activity.route';
>>>>>>> dev

const router = Router();

router.use('/api', HealthRoutes);
<<<<<<< HEAD
router.use('/api', ActivityRoutes);
=======
router.use('/api', UserRoutes);
router.use('/api', JobRoutes);
router.use('/api', ActivitRoutes);
>>>>>>> dev

router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;
