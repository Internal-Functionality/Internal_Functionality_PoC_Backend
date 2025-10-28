import { Router } from 'express';
import { createOrResumeVisitor, getVisitorById } from './visitor.controller';

const router = Router();

router.post('/visitor/', createOrResumeVisitor);
router.get('/visitor/:id', getVisitorById);

export default router;
