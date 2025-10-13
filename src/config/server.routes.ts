import { Router } from 'express';
import HealthRoutes from '../modules/health/health.routes';
import authRouter from "../visitors/routes/auth";
import activityRouter from "../visitors/routes/activity";

const router = Router();

router.use('/api', HealthRoutes);
router.use("/api/visitor", authRouter);
router.use("/api/activity", activityRouter);

router.use((req, res) => {
  console.log('Not found:', req.method, req.originalUrl);
  res.status(404).send({
    message: 'route not found',
  });
});

export default router;
